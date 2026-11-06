#!/usr/bin/env python3
"""Run of Show soundboard: renders every sound, masters it, writes run/sounds/*.mp3 + manifest.js.

  python3 make_sounds.py                     master everything
  python3 make_sounds.py --only house,wind   just these
  python3 make_sounds.py --eleven --only house      fetch this one from ElevenLabs (test one first)

Sound comes from src/eleven/<name>.mp3 when that file exists, and from the procedural render below when
it doesn't. Those files were generated in ElevenLabs from the prompts in SOUNDS. --eleven fetches one over
the API, reading ELEVENLABS_API_KEY from the environment, and never refetches a file already there: delete
it to regenerate, or to fall back on the render. Needs numpy and ffmpeg. Not part of the page: nothing here
loads at the table.
"""
import argparse, json, os, re, subprocess, sys, tempfile, urllib.request, urllib.error, zlib
import numpy as np

SR = 44100
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.dirname(HERE)
ELEVEN = os.path.join(HERE, "eleven")
PAD = 0.25            # seconds of wrapped audio either side of a loop, so MP3 encoder delay can't touch the seam

# ------------------------------------------------------------------ dsp helpers
def N(s): return int(round(s * SR))
def tgrid(n): return np.arange(n) / SR
def freqs(n): return np.maximum(np.fft.rfftfreq(n, 1 / SR), 1e-3)
def lp(f, fc, k=2): return 1 / np.sqrt(1 + (f / fc) ** (2 * k))
def hp(f, fc, k=2): return 1 / np.sqrt(1 + (fc / f) ** (2 * k))
def bp(f, lo, hi, k=2): return lp(f, hi, k) * hp(f, lo, k)
def res(f, fc, q): return 1 / np.sqrt(1 + (q * (f / fc - fc / f)) ** 2)
def peak(x, p=1.0):
    m = np.max(np.abs(x)); return x * (p / m) if m > 0 else x
def rms(x): return float(np.sqrt(np.mean(x ** 2)) + 1e-12)
def setrms(x, r): return x * (r / rms(x))

def shaped(n, gain, r):
    """Gaussian noise through a spectral curve. Periodic over n by construction."""
    X = np.fft.rfft(r.standard_normal(n)); X *= gain(freqs(n)); return np.fft.irfft(X, n)
def filt(x, gain):
    """Circular FFT filter: keeps a loop seamless."""
    X = np.fft.rfft(x); X *= gain(freqs(len(x))); return np.fft.irfft(X, len(x))
def filt1(x, gain, tail=0.0):
    """Linear FFT filter for one-shots."""
    n = len(x) + N(0.05 + tail); X = np.fft.rfft(np.pad(x, (0, n - len(x)))); X *= gain(freqs(n)); return np.fft.irfft(X, n)
def lfo(n, hz, r, sharp=1.0):
    """Slow random 0..1 control signal, periodic over n."""
    y = shaped(n, lambda f: lp(f, hz, 3), r); y = (y - y.min()) / (y.max() - y.min() + 1e-9); return y ** sharp
def sine(n, f, ph=0.0):
    """Sine with a whole number of cycles over n, so it loops."""
    k = max(1, round(f * n / SR)); return np.sin(2 * np.pi * k * np.arange(n) / n + ph)
def place(buf, ev, pos, gain=1.0):
    """Mix ev into a circular buffer, wrapping past the end."""
    n = len(buf); pos = int(pos) % n; m = min(len(ev), n)
    end = pos + m
    if end <= n: buf[pos:end] += ev[:m] * gain
    else:
        buf[pos:] += ev[:n - pos] * gain; buf[:end - n] += ev[n - pos:m] * gain
def add(buf, ev, pos, gain=1.0):
    """Mix ev into a one-shot buffer, no wrap."""
    pos = int(pos)
    if pos >= len(buf): return
    m = min(len(ev), len(buf) - pos); buf[pos:pos + m] += ev[:m] * gain
def fades(x, a=0.002, b=0.01):
    a, b = N(a), N(b); x = x.copy()
    if a: x[:a] *= np.linspace(0, 1, a)
    if b: x[-b:] *= np.linspace(1, 0, b)
    return x
def ir(t60, r, bright=5000, dark=120, pre=0.012):
    n = N(t60 * 1.2); t = tgrid(n)
    y = r.standard_normal(n) * np.exp(-6.9 * t / t60)
    y[:N(pre)] = 0
    y = filt(y, lambda f: lp(f, bright, 1) * hp(f, dark, 1))
    return y / (np.sqrt(np.sum(y ** 2)) + 1e-9)
def verb(x, t60, mix, r, bright=5000, dark=120, pre=0.012):
    """Circular convolution reverb: the tail wraps round, so loops stay seamless."""
    h = ir(min(t60, len(x) / SR * 0.8), r, bright, dark, pre)
    wet = np.fft.irfft(np.fft.rfft(x) * np.fft.rfft(h, len(x)), len(x))
    return x * (1 - mix) + wet * mix * (rms(x) / (rms(wet) + 1e-12))
def verb1(x, t60, mix, r, bright=5000, dark=120, pre=0.012):
    """Reverb for one-shots: extends the sound by the tail."""
    y = np.pad(x, (0, N(t60 * 1.2)))
    return verb(y, t60, mix, r, bright, dark, pre)
def modal(fs, ds, amps, dur):
    n = N(dur); t = tgrid(n); y = np.zeros(n)
    for f, d, a in zip(fs, ds, amps): y += a * np.exp(-t / d) * np.sin(2 * np.pi * f * t)
    return y
def conv(x, h):
    n = len(x) + len(h); return np.fft.irfft(np.fft.rfft(x, n) * np.fft.rfft(h, n), n)
def svf(x, fc, q=2.0):
    """Time-varying state-variable filter (fc can be an array). Returns (low, band)."""
    fc = np.broadcast_to(fc, x.shape); low = np.zeros_like(x); band = np.zeros_like(x); l = b = 0.0; damp = 1 / q
    g = 2 * np.sin(np.pi * np.minimum(fc, SR / 6) / SR)
    for i in range(len(x)):
        l += g[i] * b; h = x[i] - l - damp * b; b += g[i] * h; low[i] = l; band[i] = b
    return low, band
def sat(x, drive=2.0): return np.tanh(x * drive) / np.tanh(drive)
def saw(ph): return 2 * (ph % 1.0) - 1
def env(n, a, d):
    """Attack in seconds, then exponential decay with time constant d."""
    t = tgrid(n); return np.minimum(t / max(a, 1e-4), 1) * np.exp(-np.maximum(t - a, 0) / d)

# ------------------------------------------------------------------ building blocks
WOOD = ([190, 410, 760, 1240, 2100], [.05, .035, .022, .012, .006], [1, .7, .5, .3, .15])
def creak(r, dur=0.8, rate=(26, 48), bright=1.0):
    """Stick-slip: an irregular impulse train exciting wood modes. That rasp is what reads as a creak."""
    n = N(dur); x = np.zeros(n); t = 0.0
    a, b = rate; shape = np.sin(np.pi * np.linspace(0, 1, n)) ** 0.7
    while t < dur - 0.002:
        i = int(t * SR); x[i] += (0.6 + 0.4 * r.random()) * shape[i]
        pr = a + (b - a) * (t / dur)
        t += (1 / pr) * (0.75 + 0.5 * r.random())
    h = modal([f * (0.95 + 0.1 * r.random()) * bright for f in WOOD[0]], WOOD[1], WOOD[2], 0.09)
    return fades(conv(x, h)[:n + N(0.09)], 0.002, 0.02)
def footstep(r, weight=1.0, muffle=None):
    n = N(0.32); t = tgrid(n)
    thump = np.exp(-t / 0.035) * np.sin(2 * np.pi * (82 + 30 * r.random()) * t) + .55 * np.exp(-t / 0.02) * np.sin(2 * np.pi * 210 * t)
    tick = fades(r.standard_normal(N(0.012)), 0.0005, 0.008)
    y = thump * weight; add(y, filt1(tick, lambda f: bp(f, 500, 3200))[:N(0.02)], 0, 0.28)
    add(y, thump * 0.4, N(0.07 + 0.03 * r.random()))             # heel, then toe
    if muffle: y = filt1(y, lambda f: lp(f, muffle, 2))[:n]
    return y
def metal(r, base=520, spread=8, dur=0.6, decay=0.14):
    fs = base * np.sort(1 + r.random(spread) * 5.5); ds = decay / (1 + fs / 2500); am = 1 / (1 + np.arange(spread) * 0.35) * (0.5 + r.random(spread))
    return modal(fs, ds, am, dur)
def knock_pipe(r, g=1.0):
    y = metal(r, 340 + 180 * r.random(), 7, 0.5, 0.09)
    add(y, fades(filt1(r.standard_normal(N(0.01)), lambda f: bp(f, 800, 5000)), 0.0005, 0.006), 0, 0.5)
    return y * g
def drip(r):
    n = N(0.11); t = tgrid(n); f0 = 900 + 900 * r.random(); f = f0 * (1 + 1.6 * t / 0.11)
    return np.exp(-t / 0.024) * np.sin(2 * np.pi * np.cumsum(f) / SR)
def tick(r, base=2600, g=1.0):
    return modal([base, base * 1.7, base * 2.6], [.004, .003, .002], [1, .6, .3], 0.02) * g
def rustle(r, dur=0.5, lo=1200, hi=7000):
    n = N(dur); y = shaped(n, lambda f: bp(f, lo, hi), r)
    grains = lfo(n, 60, r, 3.0) * np.sin(np.pi * np.linspace(0, 1, n)) ** 0.8
    return y * grains
def page_turn(r):
    n = N(0.7); y = shaped(n, lambda f: bp(f, 700, 6000, 1), r) * (lfo(n, 30, r, 2.0) + .15) * np.sin(np.pi * np.linspace(0, 1, n)) ** 1.5
    add(y, filt1(fades(r.standard_normal(N(0.04)), .002, .03), lambda f: bp(f, 300, 2000))[:N(.05)], N(0.62), .8)
    return y
def flame(n, r):
    y = shaped(n, lambda f: bp(f, 60, 520, 1) / np.sqrt(f / 60), r)
    return y * (0.35 + 0.65 * lfo(n, 3.5, r, 1.4))
def crackles(buf, r, per_sec, lo=900, hi=5000, g=1.0, size=(0.001, 0.012)):
    for _ in range(int(per_sec * len(buf) / SR)):
        d = size[0] + (size[1] - size[0]) * r.random() ** 2
        e = fades(r.standard_normal(max(16, N(d))), 0.0002, d * 0.7)
        e = filt1(e, lambda f: bp(f, lo * (0.7 + .8 * r.random()), hi, 1))
        place(buf, e, r.integers(len(buf)), g * r.random() ** 2.5)

VOWELS = {"a": (760, 1230, 2600), "e": (530, 1840, 2480), "i": (300, 2200, 3000), "o": (530, 900, 2400),
          "u": (330, 850, 2250), "er": (480, 1350, 1700), "ah": (640, 1190, 2390)}
def syllable(r, f0, vowel, dur, glide=0.0, breath=0.06, cons=True, q=(6, 9, 12)):
    n = N(dur); fx = f0 * (1 + glide * np.linspace(0, 1, n)) * (1 + .012 * np.sin(2 * np.pi * 5.5 * tgrid(n) + r.random() * 6))
    src = saw(np.cumsum(fx) / SR + r.random()) + breath * r.standard_normal(n) * 4
    F = VOWELS[vowel]; v = r.random(3) * 0.1 + .95
    spec = lambda f: (res(f, F[0] * v[0], q[0]) + .7 * res(f, F[1] * v[1], q[1]) + .3 * res(f, F[2] * v[2], q[2])) * hp(f, 110) * lp(f, 4200, 1)
    y = filt1(src, spec)[:n]
    a = max(N(0.012), int(n * .15)); b = max(N(0.02), int(n * .3))
    y[:a] *= np.linspace(0, 1, a); y[-b:] *= np.linspace(1, 0, b) ** 1.6
    if cons and r.random() < 0.45:      # a consonant: short noisy burst before the vowel
        c = N(0.022 + .03 * r.random()); hi = r.random() < .5
        e = filt1(fades(r.standard_normal(c), .001, c / SR * .6), (lambda f: bp(f, 3500, 8000)) if hi else (lambda f: bp(f, 500, 2500)))[:c]
        y = np.concatenate([e * .3, y])
    return y
def babble(n, r, voices=20, rate=4.2, talk=0.62, spread=1.0):
    buf = np.zeros(n); dur = n / SR
    for v in range(voices):
        f0 = float(r.choice([105, 120, 135, 170, 205, 225, 245])) * (0.92 + .16 * r.random())
        t = r.random() * dur; left = dur; g = 0.45 + .55 * r.random() ** (1 / spread)
        names = list(VOWELS)
        while left > 0:
            phrase = 0.7 + 2.2 * r.random(); ph = 0.0; base = 1 + .08 * r.random()
            while ph < phrase:
                d = (0.8 + .8 * r.random()) / rate
                place(buf, syllable(r, f0 * base * (1 + .1 * r.standard_normal()), names[r.integers(len(names))], d, glide=-.1 + .2 * r.random()), int((t + ph) * SR), g)
                ph += d
            gap = phrase * (1 - talk) / talk * (0.5 + r.random()); t += phrase + gap; left -= phrase + gap
    return buf
def laugh(r, f0=None, beats=5):
    f0 = f0 or float(r.choice([190, 240, 280])); parts = []
    for i in range(beats):
        s = syllable(r, f0 * (1.05 - .05 * i) * (1 + .05 * r.random()), "ah", .085 + .03 * r.random(), glide=-.15, breath=.2, cons=False)
        parts.append(np.pad(s, (0, N(.055 + .035 * r.random()))))
    return np.concatenate(parts) * np.linspace(1, .55, sum(len(p) for p in parts))
# drum kit
def kick(g=1.0, f0=118, fe=46, dur=.3):
    n = N(dur); t = tgrid(n); f = fe + (f0 - fe) * np.exp(-t / .03)
    return g * np.exp(-t / .1) * np.sin(2 * np.pi * np.cumsum(f) / SR)
def snare(r, g=1.0, dur=.18):
    n = N(dur); t = tgrid(n); y = np.exp(-t / .05) * filt1(r.standard_normal(n), lambda f: bp(f, 1200, 8000, 1))[:n] + .6 * np.exp(-t / .03) * np.sin(2 * np.pi * 190 * t)
    return g * y
def hat(r, g=1.0, dur=.05):
    n = N(dur); t = tgrid(n); return g * np.exp(-t / (dur / 3)) * filt1(r.standard_normal(n), lambda f: hp(f, 6000))[:n]
def midi(m): return 440 * 2 ** ((m - 69) / 12)
def note(f, dur, kind="saw", a=.01, d=None, det=.003):
    n = N(dur); t = tgrid(n)
    if kind == "saw": y = saw(f * t) + .7 * saw(f * (1 + det) * t + .3)
    elif kind == "square": y = np.sign(np.sin(2 * np.pi * f * t)) * .7
    elif kind == "ep": y = np.sin(2 * np.pi * f * t + 1.2 * np.exp(-t / .25) * np.sin(2 * np.pi * f * 2 * t)) + .25 * np.sin(2 * np.pi * f * 4 * t) * np.exp(-t / .1)
    else: y = np.sin(2 * np.pi * f * t) + .3 * np.sin(2 * np.pi * 2 * f * t)
    e = np.minimum(t / a, 1) * (np.exp(-t / d) if d else 1); r_ = min(n, N(.02)); e[-r_:] *= np.linspace(1, 0, r_)
    return y * e

# ------------------------------------------------------------------ AMBIENCE (each returns one seamless period)
def amb_house(r):
    n = N(26); y = shaped(n, lambda f: lp(f, 170, 2) * hp(f, 28, 1) / np.sqrt(f / 30), r); y = setrms(y, .10) * (.6 + .4 * lfo(n, .08, r))
    for f, a in ((55, .05), (82.5, .035), (110.4, .03), (165, .016), (220.7, .009)):
        y += a * sine(n, f, r.random() * 6) * (.55 + .45 * lfo(n, .1, r))
    air = setrms(shaped(n, lambda f: res(f, 420, 2.2) + .5 * res(f, 1050, 3), r), .018) * (.2 + .8 * lfo(n, .13, r, 1.6)); y += air
    for pos, d, g in ((2.5, .9, .05), (9.4, 1.3, .08), (14.1, .5, .04), (20.3, 1.1, .065), (23.6, .6, .035)):
        place(y, filt1(creak(r, d), lambda f: lp(f, 1500, 1)), N(pos), g)
    return verb(y, 2.6, .35, r, bright=2500)
def amb_wind(r):
    n = N(26); y = np.zeros(n)
    for fc, q, a, hz, sh in ((110, .7, .9, .12, 1.2), (260, 1.3, .55, .16, 1.5), (520, 2.2, .3, .2, 2.0), (980, 3.5, .14, .26, 2.6), (1750, 5, .06, .3, 3.2)):
        y += a * setrms(shaped(n, lambda f: res(f, fc, q), r), .1) * (.08 + .92 * lfo(n, hz, r, sh))
    y += .045 * setrms(shaped(n, lambda f: res(f, 760, 28) + res(f, 1130, 34), r), .1) * lfo(n, .17, r, 3.0)     # thin whistle round the eaves
    return y
def amb_record(r):
    """A sealed party room remembering itself: original 118 BPM dance groove, far away, on old vinyl."""
    bpm = 118; beat = 60 / bpm; bars = 16; n = N(beat * 4 * bars); y = np.zeros(n)
    chords = [(45, 60, 64, 67), (45, 60, 64, 67), (41, 57, 60, 64), (43, 59, 62, 67)]
    for b in range(bars):
        root, *tones = chords[(b // 2) % 4]; t0 = b * 4 * beat
        for i in range(4): place(y, kick(.9, 96, 50, .24), N(t0 + i * beat)); place(y, hat(r, .16, .07), N(t0 + (i + .5) * beat))
        place(y, snare(r, .3), N(t0 + beat)); place(y, snare(r, .3), N(t0 + 3 * beat))
        for i, s in enumerate((0, .75, 1.5, 2, 2.75, 3.5)):       # bass, octave-hopping
            place(y, note(midi(root + (12 if i % 3 == 1 else 0)), beat * .62, "sine", .005, .25) * .6, N(t0 + s * beat))
        for s in (.5, 1.75, 2.5, 3.75):                           # electric piano stabs
            for m in tones: place(y, note(midi(m + 12), beat * 1.1, "ep", .004, .28) * .11, N(t0 + s * beat))
        if b % 2 == 0:                                            # string pad
            for m in tones: place(y, note(midi(m + 12), beat * 8, "saw", .5) * .018, N(t0))
    y = filt(y, lambda f: bp(f, 170, 2800, 2))
    # wow and flutter of an old turntable, kept periodic
    w = .0009 * sine(n, 0.55) * SR + .0003 * sine(n, 6) * SR
    y = np.interp((np.arange(n) + w) % n, np.arange(n), y, period=n)
    y = verb(setrms(sat(y, 1.4), .07), 2.2, .6, r, bright=2600)
    # the echoes: a few laughs and voices in the same far-off room
    e = setrms(babble(n, r, 9, 3.6, .4), .012)
    for _ in range(int(n / SR / 4)): place(e, laugh(r), r.integers(n), .03 + .02 * r.random())
    e = verb(filt(e, lambda f: bp(f, 250, 3000)), 2.4, .75, r, bright=2200)
    c = setrms(shaped(n, lambda f: bp(f, 900, 7000, 1), r), .004); crackles(c, r, 7, 1200, 7000, .14); crackles(c, r, .5, 400, 2000, .32, (.004, .014))
    rot = 60 / 33.33
    for k in range(int(n / SR / rot)): place(c, tick(r, 1500, .05), N(k * rot))
    return y + e * 1.1 + c
def amb_heart(r):
    per = 6 / 7; n = N(per * 7); y = np.zeros(n)
    def beat(g, f0):
        m = N(.34); t = tgrid(m); f = 40 + (f0 - 40) * np.exp(-t / .05); ph = np.cumsum(f) / SR
        b = np.exp(-t / .07) * (.7 * np.sin(2 * np.pi * ph) + .75 * np.sin(4 * np.pi * ph) + .55 * np.sin(6 * np.pi * ph) + .3 * np.sin(8 * np.pi * ph))   # harmonics so it survives a small speaker
        return g * np.tanh(b * 1.6) * np.minimum(t / .006, 1)
    for k in range(7):
        place(y, beat(1, 86), N(k * per)); place(y, beat(.62, 104), N(k * per + .27))
    y += setrms(shaped(n, lambda f: bp(f, 60, 300), r), .006)
    return verb(y, .5, .12, r, bright=900, dark=40)
def amb_crowd(r):
    n = N(24); y = setrms(babble(n, r, 34, 4.4, .72), .1)
    for _ in range(9): place(y, laugh(r), r.integers(n), .22 * (.5 + r.random()))
    y = filt(y, lambda f: hp(f, 150) * lp(f, 4200, 1)) * (.82 + .18 * lfo(n, .25, r))
    y = verb(y, 1.6, .5, r, bright=3200)
    return y + setrms(shaped(n, lambda f: bp(f, 180, 1400, 1), r), .012)
def amb_candle(r):
    n = N(18); y = setrms(flame(n, r), .06)
    h = shaped(n, lambda f: bp(f, 900, 6000, 1), r); y += setrms(h, .003)
    crackles(y, r, 2.4, 1000, 6500, .22); crackles(y, r, .35, 300, 2200, .34, (.004, .018))
    return verb(y, .7, .18, r, bright=3000)
def amb_class(r):
    """Radiators clanking in a near-empty classroom."""
    n = N(26); y = setrms(shaped(n, lambda f: bp(f, 90, 900, 1) / np.sqrt(f / 90), r), .022)
    y += setrms(shaped(n, lambda f: bp(f, 2500, 8000, 1), r), .006) * (.4 + .6 * lfo(n, .12, r))       # steam valve
    for f in (60, 120, 180): y += (.006 if f == 120 else .0028) * sine(n, f)
    for pos in (1.8, 2.05, 2.25, 8.9, 9.05, 15.6, 15.72, 15.9, 16.05, 22.4, 22.62):
        place(y, knock_pipe(r), N(pos), .035 + .03 * r.random())
    b = setrms(babble(n, r, 2, 3.5, .3), .007); y += filt(b, lambda f: bp(f, 300, 2500))    # hallway, through the door
    for pos, g in ((5.5, .03), (19.3, .022)):
        place(y, filt1(creak(r, .4, (34, 60), 1.15), lambda f: lp(f, 2500, 1)), N(pos), g)    # a chair
    return verb(y, 1.0, .3, r, bright=3600)
def amb_hall(r):
    """Between periods: lockers, sneakers, somebody's Discman."""
    n = N(24); y = setrms(babble(n, r, 14, 4.6, .55), .05)
    y = filt(y, lambda f: bp(f, 180, 4000, 1))
    def slam(g):
        m = metal(r, 300 + 160 * r.random(), 9, .55, .13); add(m, kick(.8, 150, 70, .2), 0); return m * g
    for pos in (1.1, 4.7, 6.3, 9.8, 13.2, 14.1, 18.9, 21.6): place(y, slam(.05 + .05 * r.random()), N(pos))
    def squeak(g):
        d = .05 + .09 * r.random(); m = N(d); t = tgrid(m); f = (1500 + 1900 * r.random()) * (1 + .4 * np.sin(np.pi * t / d))
        ph = np.cumsum(f) / SR; return g * np.sin(np.pi * t / d) ** 2 * (np.sin(2 * np.pi * ph) + .4 * np.sin(4 * np.pi * ph))
    for _ in range(26): place(y, squeak(.012 + .02 * r.random()), r.integers(n))
    for _ in range(50): place(y, footstep(r, .12, 1400), r.integers(n), .08)
    beat = 60 / 100; leak = np.zeros(n)                                     # tinny headphone leak drifting by
    for k in range(int(n / SR / (beat / 2))):
        place(leak, hat(r, .5 if k % 2 else .25, .03), N(k * beat / 2))
        if k % 4 == 2: place(leak, filt1(snare(r, .4), lambda f: hp(f, 2500))[:N(.1)], N(k * beat / 2))
    y += filt(leak, lambda f: bp(f, 3000, 9000)) * .022 * (.1 + .9 * lfo(n, .1, r, 2.4))
    return verb(y, 1.5, .42, r, bright=4200)
def amb_records(r):
    """Hall of records: green lamp hum, a wall clock, paper."""
    n = N(24); y = setrms(shaped(n, lambda f: bp(f, 110, 1100, 1) / np.sqrt(f / 110), r), .012)
    for f, a in ((120, .004), (240, .002), (360, .0012)): y += a * sine(n, f)
    for k in range(24): place(y, tick(r, 2300 if k % 2 else 1900, .05), N(k))
    for pos in (4.4, 14.8): place(y, page_turn(r), N(pos), .035)
    for pos in (10.3, 20.6): place(y, footstep(r, .4, 900), N(pos), .025)
    return verb(y, 1.9, .34, r, bright=3400)
def amb_gazebo(r):
    """Outside, dusk, a cheap boombox on the rail playing an original 88 BPM loop."""
    beat = 60 / 88; bars = 8; n = N(beat * 4 * bars)
    w = setrms(shaped(n, lambda f: bp(f, 90, 800, 1) / np.sqrt(f / 90), r), .03) * (.3 + .7 * lfo(n, .15, r, 1.3))
    w += setrms(shaped(n, lambda f: bp(f, 1200, 5000, 1), r), .004) * lfo(n, .3, r, 2)                   # bare branches
    tr = setrms(shaped(n, lambda f: lp(f, 300, 1) * hp(f, 40), r), .012) * lfo(n, .09, r, 2.2)            # the road, far off
    m = np.zeros(n)
    seq = [41, 41, 44, 39]
    for b in range(bars):
        t0 = b * 4 * beat
        for s in (0, 1.75, 2.25): place(m, kick(.9, 130, 56, .22), N(t0 + s * beat))
        for s in (1, 3): place(m, snare(r, .75), N(t0 + s * beat))
        for k in range(8): place(m, hat(r, .3 if k % 2 else .18, .04), N(t0 + k * .5 * beat))
        root = seq[b % 4]
        place(m, note(midi(root + 12), beat * 1.4, "saw", .005, .4) * .3, N(t0)); place(m, note(midi(root + 12), beat * .7, "saw", .005, .2) * .24, N(t0 + 2.5 * beat))
        place(m, note(midi(root + 31), beat * .4, "ep", .004, .14) * .1, N(t0 + 1.5 * beat)); place(m, note(midi(root + 34), beat * .4, "ep", .004, .14) * .08, N(t0 + 3.5 * beat))
    m = sat(setrms(filt(m, lambda f: bp(f, 260, 3400, 2) * (1 + 1.3 * res(f, 1150, 2))), .16), 2.2)         # small speakers, pushed
    m = verb(m * .18, .7, .22, r, bright=3000, dark=300)
    return w + tr + m
def amb_creak(r):
    """Upper floors: boards answering every step."""
    n = N(26); y = setrms(shaped(n, lambda f: lp(f, 240, 1) * hp(f, 35, 1), r), .02)
    y += setrms(shaped(n, lambda f: res(f, 620, 2.4), r), .006) * lfo(n, .14, r, 1.8)
    t = 1.2
    while t < 25:
        burst = int(r.integers(3, 6))
        for k in range(burst):
            place(y, footstep(r, .5, 800), N(t), .07); 
            if r.random() < .75: place(y, creak(r, .3 + .7 * r.random(), (22 + 10 * r.random(), 40 + 20 * r.random())), N(t + .05), .05 + .05 * r.random())
            t += .62 + .2 * r.random()
        t += 2.2 + 3.5 * r.random()
    place(y, filt1(creak(r, 1.5, (16, 30), .8), lambda f: lp(f, 1100, 1)), N(13), .05)
    return verb(y, 1.7, .4, r, bright=2400)
def amb_summon(r):
    """The hot sealed room: something half-made breathing fire."""
    n = N(24); y = setrms(flame(n, r), .10) * (.7 + .3 * lfo(n, .3, r))
    y += setrms(shaped(n, lambda f: lp(f, 130, 2) * hp(f, 28, 1), r), .07) * (.4 + .6 * lfo(n, .35, r, 1.3))
    for f, a in ((73.5, .05), (77.7, .05), (147, .03), (155.5, .028), (220, .012), (311, .009)):       # a tritone rubbing against itself
        y += a * sine(n, f, r.random() * 6) * (.45 + .55 * lfo(n, .12, r))
    gr = saw(np.cumsum(np.full(n, 47.0)) / SR); gr = filt(gr, lambda f: res(f, 340, 2.5) + .7 * res(f, 720, 4))
    bre = (np.maximum(sine(n, 4 / 24), 0)) ** 1.5                                                        # four slow breaths per loop
    y += setrms(gr, .045) * bre * (.6 + .4 * lfo(n, 9, r)) + setrms(shaped(n, lambda f: res(f, 620, 1.8), r), .03) * bre
    crackles(y, r, 4.5, 800, 5000, .24); crackles(y, r, .6, 300, 1800, .5, (.006, .02))
    for pos, g in ((5.6, .05), (15.1, .07)): place(y, creak(r, 1.1, (16, 26), .7), N(pos), g)
    return verb(y, 1.0, .3, r, bright=3000)
def amb_study(r):
    """A room sealed since the thirties: no clock running, dead air, the house a long way off."""
    n = N(22); y = setrms(shaped(n, lambda f: bp(f, 60, 500, 1) / (f / 60) ** .6, r), .012)
    y += filt(setrms(amb_wind(np.random.default_rng(int(r.integers(1 << 30))))[:n], .03), lambda f: lp(f, 340, 2))
    for pos, g in ((6.1, .05), (6.4, .022), (16.7, .04)): place(y, filt1(tick(r, 1100, 1), lambda f: lp(f, 1800, 1)), N(pos), g)     # dry wood settling
    for pos in (11.5,): place(y, rustle(r, .9, 2000, 8000), N(pos), .012)                                # dust, or a mouse
    return verb(y, .55, .22, r, bright=2200)
def amb_cellar(r):
    """Stone cellar clinic: drips, straw, a sleeping fox, an owl shifting on its perch, an oil lamp."""
    n = N(24); y = setrms(shaped(n, lambda f: bp(f, 70, 700, 1) / np.sqrt(f / 70), r), .012)
    y += setrms(flame(n, r), .006)
    dr = np.zeros(n)
    for pos in (1.3, 4.9, 6.2, 11.1, 14.6, 15.9, 20.4): place(dr, drip(r), N(pos), .17 + .08 * r.random())
    dr = verb(dr, 2.4, .6, r, bright=4500, dark=300)
    st = np.zeros(n)
    for pos, d, g in ((3.1, .8, .022), (9.2, 1.4, .03), (17.8, .7, .018)): place(st, rustle(r, d, 900, 6000), N(pos), g)   # straw
    br = setrms(shaped(n, lambda f: bp(f, 500, 2200, 1), r), .006) * np.maximum(sine(n, 7 / 24), 0) ** 1.4          # fox, asleep
    ow = np.zeros(n)
    for pos in (12.7, 13.0, 13.2): place(ow, rustle(r, .16, 700, 3500), N(pos), .05)                                  # wing against perch
    place(ow, modal([520], [.02], [1], .05), N(13.4), .012)                                                              # talon on wood
    return verb(y + st + br + ow, 1.2, .25, r, bright=3000) + dr
def amb_rig(r):
    """The old beige computer: fan, CRT whine, drive chatter, mains hum."""
    n = N(20); y = setrms(shaped(n, lambda f: bp(f, 120, 3000, 1) * (1 + 1.4 * res(f, 236, 8) + .7 * res(f, 472, 8)), r), .022)
    for f, a in ((60, .008), (120, .016), (180, .005), (240, .004)): y += a * sine(n, f)
    y += .0035 * sine(n, 7860) + .0025 * sine(n, 15734)
    t = .4
    while t < 19.5:
        for _ in range(int(r.integers(2, 9))):
            place(y, modal([1450, 3100, 4700], [.003, .002, .001], [1, .6, .3], .012), N(t), .022 * (.5 + r.random())); t += .025 + .06 * r.random()
        t += .9 + 3.2 * r.random()
    return verb(y, .35, .12, r, bright=4000)
def amb_set(r):
    """Poe Boy's set through a house rig, from out on the ballroom floor. Original 128 BPM pattern."""
    beat = 60 / 128; bars = 8; n = N(beat * 4 * bars); y = np.zeros(n)
    seq = [38, 38, 41, 36]
    for b in range(bars):
        t0 = b * 4 * beat; root = seq[(b // 2) % 4]
        for i in range(4):
            place(y, sat(kick(1.1, 150, 52, .28), 1.8), N(t0 + i * beat)); place(y, hat(r, .2, .06), N(t0 + (i + .5) * beat))
        place(y, snare(r, .35), N(t0 + beat)); place(y, snare(r, .35), N(t0 + 3 * beat))
        for k in range(16):
            if k % 4 == 0: continue
            place(y, note(midi(root + 12), beat * .22, "saw", .003, .09) * (.42 if k % 2 else .3), N(t0 + k * beat / 4))
        for s in (.75, 2.25, 3.25):
            for iv in (24, 27, 31): place(y, note(midi(root + iv), beat * .3, "saw", .004, .1) * .05, N(t0 + s * beat))
    y = sat(setrms(filt(y, lambda f: bp(f, 60, 7000, 1) * (1 + .8 * res(f, 95, 1.5))), .18), 1.8)
    return verb(y, 1.6, .38, r, bright=3400, dark=90)
def amb_hiss(r):
    n = N(8); y = setrms(shaped(n, lambda f: hp(f, 500, 1) * lp(f, 11000, 1), r), .05)
    for f, a in ((60, .012), (120, .02), (180, .008), (300, .004)): y += a * sine(n, f)
    return y
def amb_dawn(r):
    """Sunrise on the lawn: first birds, a little breeze."""
    n = N(26); y = setrms(shaped(n, lambda f: bp(f, 150, 2200, 1) / np.sqrt(f / 150), r), .012) * (.35 + .65 * lfo(n, .15, r, 1.4))
    y += setrms(shaped(n, lambda f: bp(f, 3000, 9000, 1), r), .002) * lfo(n, .2, r, 1.8)                  # leaves
    def chirp(f0, f1, d, g=1.0, vib=0.0):
        m = N(d); t = tgrid(m); f = f0 + (f1 - f0) * (t / d) + vib * np.sin(2 * np.pi * 30 * t)
        return g * np.sin(np.pi * t / d) ** 1.4 * np.sin(2 * np.pi * np.cumsum(f) / SR)
    b = np.zeros(n)
    def song(pos, base, g):                 # a thrush-ish phrase
        t = 0
        for _ in range(int(r.integers(3, 7))):
            s = base * (0.8 + .55 * r.random()); e = base * (0.8 + .55 * r.random()); d = .09 + .15 * r.random()
            place(b, chirp(s, e, d, g, 120 * r.random()), N(pos + t)); t += d + .03 + .1 * r.random()
    for pos, base, g in ((1.5, 2500, .04), (6.6, 3100, .025), (10.5, 2500, .036), (15.8, 3100, .03), (19.9, 2500, .03), (24.1, 3400, .018)): song(pos, base, g)
    for pos in (3.9, 4.15, 4.4, 12.6, 12.85, 13.1, 13.35, 21.9, 22.15):                                  # sparrow chips
        place(b, chirp(5200, 3900, .045, .02), N(pos))
    for pos in (8.1, 8.6, 17.9):                                                                           # a crow, a long way off
        cr = filt1(saw(np.cumsum(np.linspace(520, 470, N(.3))) / SR) * np.sin(np.pi * np.linspace(0, 1, N(.3))), lambda f: bp(f, 900, 2600))
        place(b, cr, N(pos), .006)
    return y + verb(b, 1.8, .45, r, bright=6000, dark=500, pre=.05)

# ------------------------------------------------------------------ STINGS
def st_jump(r):
    n = N(1.4); y = np.zeros(n)
    for f in (185, 196, 277.2, 293.7, 554, 622, 932):
        y += env(n, .003, .3) * (saw(f * tgrid(n) * (1 + .002 * r.random())) + .5 * saw(f * 1.004 * tgrid(n))) / 6
    y = filt1(y, lambda f: bp(f, 110, 7000, 1))[:n]
    add(y, filt1(r.standard_normal(N(.12)) * env(N(.12), .001, .03), lambda f: hp(f, 1800, 1)), 0, .9)
    add(y, kick(1.4, 180, 42, .5), 0)
    return verb1(sat(y, 1.8), 1.3, .3, r, bright=4500)
def st_braaam(r):
    n = N(3.6); t = tgrid(n); x = np.zeros(n)
    for f, a in ((36.7, 1), (55, .9), (73.4, .8), (87.3, .55), (110, .55), (174.6, .22)):
        x += a * (saw(f * t + r.random()) + saw(f * 1.006 * t + r.random()))
    fc = 220 + 1900 * np.minimum(t / .55, 1) ** 1.5 * np.exp(-t / 2.4)
    l, b = svf(x * .12, fc, 1.6); y = l + .35 * b
    e = np.minimum(t / .05, 1) * np.minimum((3.6 - t) / 1.1, 1) ** 1.6
    y = sat(y * e, 2.2)
    add(y, kick(.9, 120, 36, .9), 0)
    return verb1(y, 2.2, .3, r, bright=2800, dark=40)
def st_bell(r):
    """Three tolls of a big cast bell."""
    def toll():
        f0 = 196.0; fs = [f0 * x for x in (.5, 1, 1.19, 1.5, 2, 2.51, 2.66, 3.01, 4.17, 5.43)]
        ds = [3.6, 2.4, 1.7, 1.4, 1.1, .7, .6, .45, .3, .2]; am = [.55, 1, .55, .35, .6, .22, .2, .12, .08, .05]
        y = modal(fs, ds, am, 4.5)
        add(y, filt1(r.standard_normal(N(.008)) * np.hanning(N(.008)), lambda f: bp(f, 800, 5000)), 0, .9)
        return y
    y = np.zeros(N(8.6))
    for k in range(3): add(y, toll(), N(k * 2.05))
    y[-N(1):] *= np.linspace(1, 0, N(1)) ** 2
    return verb1(y, 2.0, .28, r, bright=3200)
def st_riser(r):
    """Four seconds climbing into a hit."""
    d = 4.0; n = N(d); t = tgrid(n); pr = t / d
    fc = 280 * (6500 / 280) ** pr; l, b = svf(r.standard_normal(n), fc, 5)
    y = b * (.02 + pr ** 2.4) * .2
    for f in (110, 164.8, 220):
        f2 = f * (1 + pr ** 2 * 1.0); y += (pr ** 1.6) * .1 * saw(np.cumsum(f2) / SR) 
    s = 12 / np.maximum(1 - pr, .03)                                                     # tremolo accelerating
    y = y * (.72 + .28 * np.sin(2 * np.pi * np.cumsum(np.minimum(s, 26)) / SR))
    y = filt1(y, lambda f: bp(f, 90, 9000, 1))[:n]
    out = np.zeros(N(5.4)); add(out, sat(y, 1.5), 0)
    add(out, kick(1.5, 170, 34, 1.1), N(d)); add(out, st_jump_tail(r), N(d), .6)
    return verb1(out, 1.6, .22, r, bright=4200)
def st_jump_tail(r):
    n = N(.6); return env(n, .002, .12) * filt1(r.standard_normal(n), lambda f: bp(f, 300, 6000, 1))[:n]
def st_pa(r):
    """Every speaker in the house waking up: thump, mains, then a howl that gets grabbed."""
    d = 2.5; n = N(d); t = tgrid(n); y = np.zeros(n)
    add(y, sat(kick(1.2, 130, 58, .3), 2), 0)
    for f, a in ((60, .1), (120, .16), (180, .08), (240, .05), (360, .03)): y += a * np.sin(2 * np.pi * f * t) * np.minimum(t / .05, 1)
    y += .03 * r.standard_normal(n) * np.minimum(t / .05, 1)
    f = 1150 + 1680 * np.minimum(np.maximum(t - .45, 0) / 1.1, 1) ** .5
    how = np.sin(2 * np.pi * np.cumsum(f) / SR); how2 = np.sin(2 * np.pi * np.cumsum(f * 2.003) / SR)
    he = np.clip((t - .45) / 1.35, 0, 1) ** 2.4
    y += sat((how + .35 * how2) * he * (1 + .15 * np.sin(2 * np.pi * 7 * t)), 2.5) * .55
    out = y * np.where(t > 2.08, np.exp(-(t - 2.08) / .03), 1.0)
    return verb1(filt1(out, lambda f: bp(f, 70, 8000, 1))[:n], 1.5, .32, r, bright=3600)
def st_scratch(r):
    """Hand on the platter: the set dragged back and forth, then stopped dead."""
    src = amb_set(np.random.default_rng(7))
    d = .95; n = N(d); t = tgrid(n)
    sp = np.interp(t, [0, .07, .17, .26, .33, .44, .58, .95], [1, 1, -1.9, -2.1, 1.6, 1.8, -1.4, 0]) ** 1
    pos = N(2) + np.cumsum(sp); y = np.interp(pos % len(src), np.arange(len(src)), src)
    y = y * (.35 + .65 * np.minimum(np.abs(sp), 1))
    y = sat(filt1(y, lambda f: bp(f, 200, 5200, 1))[:n], 1.6)
    y = y * np.minimum((d - t) / .05, 1)
    add(y, tick(r, 1100, .6), N(.915))
    return verb1(y, .35, .12, r, bright=4000)
def st_levelup(r):
    y = np.zeros(N(2.6))
    for i, m in enumerate((62, 66, 69, 74, 78, 81)):
        add(y, note(midi(m), 1.7, "ep", .004, .55) * .3, N(i * .085))
        add(y, note(midi(m + 12), 1.2, "sine", .002, .25) * .1, N(i * .085))
    for m in (62, 69, 74): add(y, note(midi(m), 2.0, "saw", .24) * .02 * np.linspace(1, 0, N(2.0)) ** 1.5, N(.3))
    return verb1(filt1(y, lambda f: bp(f, 200, 10000, 1))[:N(2.6)], 1.4, .32, r, bright=7000, dark=300)
def st_dice(r):
    """Four dice on a wooden table."""
    y = np.zeros(N(1.0))
    for dd in range(4):
        t = .01 + .05 * r.random(); gap = .07 + .05 * r.random(); g = 1.0
        while gap > .012 and t < .85:
            fs = [(3000 + 2600 * r.random()), (6500 + 2800 * r.random()), 1300 + 500 * r.random()]
            add(y, modal(fs, [.006, .003, .009], [1, .6, .5], .03) * g, N(t), .25)
            t += gap; gap *= .68 + .1 * r.random(); g *= .8
    y += .004 * r.standard_normal(len(y)) * np.exp(-tgrid(len(y)) / .4)
    return verb1(y, .25, .1, r, bright=7000)
def st_aim(r):
    """The AIM prop's own incoming-message sound, heard from down a hallway."""
    y = load_audio(os.path.join(OUT, "..", "..", "aim", "sounds", "imrcv.wav"))
    y = filt1(y, lambda f: bp(f, 450, 4200, 2))
    return verb1(y, 1.2, .3, r, bright=3400, pre=.03)
def st_schoolbell(r):
    """Electric hallway bell: clapper hammering a gong."""
    d = 2.6; y = np.zeros(N(d)); t = 0.0
    while t < d - .05:
        add(y, modal([1140, 1450, 2280, 3120, 4090], [.05, .04, .03, .02, .012], [1, .6, .5, .3, .15], .08), N(t), .45)
        t += 1 / 23
    return verb1(sat(y, 1.5) * np.minimum((d - tgrid(len(y))) / .03, 1), .9, .3, r, bright=4800)
def st_phone(r):
    """A 2004 flip phone: original little polyphonic ring, tinny, with the buzz under it."""
    mel = [(76, .13), (79, .13), (83, .13), (81, .26), (79, .13), (76, .26), (0, .22)]; y = np.zeros(N(3.4)); t = 0.0
    for rep in range(2):
        for m, d in mel:
            if m:
                add(y, (note(midi(m), d, "square", .003, .2) * .5 + note(midi(m + 12), d, "sine", .003, .1) * .2), N(t))
                add(y, note(midi(m - 12), d, "square", .003, .2) * .18, N(t))
            t += d
    y = filt1(y, lambda f: bp(f, 650, 3600, 2) * (1 + 1.3 * res(f, 2100, 2.6)))[:len(y)]
    bz = (saw(170 * tgrid(len(y))) * .06) * ((tgrid(len(y)) % 1.44) < .6)
    return y + filt1(bz, lambda f: lp(f, 1200))[:len(y)]
def st_paper(r):
    """The reading room's stationery coming alive: a rising flurry, then a long rip."""
    d = 2.6; n = N(d); y = np.zeros(n); t = tgrid(n)
    for _ in range(38):
        m = N(.06 + .2 * r.random()); s = shaped(m, lambda f: bp(f, 900 + 1500 * r.random(), 8000, 1), r)
        rate = 14 + 26 * r.random(); e = (.5 + .5 * np.sin(2 * np.pi * rate * tgrid(m) + r.random() * 6)) * np.sin(np.pi * np.linspace(0, 1, m))
        add(y, s * e, N((1.9 * r.random() ** .6)), .55 + .45 * r.random())
    y *= np.minimum(t / .9, 1) ** 1.2
    m = N(.6); rp = shaped(m, lambda f: bp(f, 1500, 9000, 1), r); ra = np.zeros(m); k = 0
    while k < m: ra[k] = 1 + r.random(); k += int(SR / (130 + 200 * r.random()))
    ra = filt1(ra, lambda f: lp(f, 2200, 1))[:m]; add(y, rp * np.abs(ra) * 3.5 * np.linspace(1, .4, m), N(1.85))
    return verb1(y, .9, .22, r, bright=6500, dark=500)
def st_bolt(r):
    """Iron bolt thrown home on a heavy door, down a cold hall."""
    d = 1.2; y = np.zeros(N(d))
    m = N(.17); sc = shaped(m, lambda f: bp(f, 900, 4200, 1) * (1 + res(f, 1900, 4)), r) * np.linspace(.2, 1, m) ** 2
    add(y, sc, 0, .45)
    add(y, metal(r, 330, 10, .5, .1), m, 1.1)
    add(y, modal([74, 118, 182, 260], [.13, .09, .06, .04], [1, .8, .5, .3], .5), m, 1.3)
    add(y, tick(r, 1600, 1.1), m)
    return verb1(sat(filt1(y, lambda f: hp(f, 45, 1))[:len(y)], 1.5), 1.9, .36, r, bright=3200, dark=60, pre=.02)
def st_steps(r):
    """Slow footsteps on the floor above, through the ceiling."""
    y = np.zeros(N(5.2)); t = .1
    for k in range(7):
        add(y, footstep(r, 1.0, 620), N(t), .9 * (.75 + .35 * k / 6))
        if k in (1, 4, 5): add(y, filt1(creak(r, .55, (22, 44), .8), lambda f: lp(f, 900, 1)), N(t + .06), .3)
        t += .66 + .1 * r.random()
    return verb1(y, 1.5, .28, r, bright=1500, dark=40)
def st_swoop(r):
    """A cape coming down on you."""
    d = 1.15; n = N(d); t = tgrid(n); pr = t / d
    fc = 240 + 3100 * np.sin(np.pi * pr ** 1.3) ** 2; _, b = svf(r.standard_normal(n), fc, 1.6)
    flap = .62 + .38 * np.sin(2 * np.pi * np.cumsum(13 + 22 * np.sin(np.pi * pr)) / SR)
    y = b * flap * np.sin(np.pi * pr) ** 1.2
    add(y, kick(.35, 110, 55, .22), N(.74))
    return verb1(y, .8, .22, r, bright=4800)
def st_breath(r):
    """Something behind a warm door, breathing. Two breaths, slow and wet, muffled by the wood."""
    y = np.zeros(N(7.2))
    def part(d, up, g):
        n = N(d); t = tgrid(n); pr = t / d
        fc = (340 + 520 * pr) if up else (880 - 520 * pr)
        l, b = svf(r.standard_normal(n), fc, 2.4)
        v = saw(np.cumsum(np.full(n, 44 + 12 * r.random())) / SR) * (.3 + .3 * lfo(n, 12, r))
        v = filt1(v, lambda f: res(f, 380, 2.5))[:n]
        return g * (b + v * .16) * np.sin(np.pi * pr) ** .9
    t = .1
    for _ in range(2):
        a = part(1.45, True, .8); add(y, a, N(t)); t += 1.5 + .22
        a = part(1.7, False, 1.0); add(y, a, N(t)); t += 1.7 + .12
    y = filt1(y, lambda f: bp(f, 90, 2100, 2))[:len(y)]
    return verb1(y, .5, .18, r, bright=1800, dark=50)
def st_monitor(r):
    """A CRT waking up: relay click, degauss thunk, picture-tube whine, a little static."""
    n = N(1.9); t = tgrid(n); y = np.zeros(n)
    add(y, tick(r, 1900, 1.2), 0)
    dg = (np.sin(2 * np.pi * 60 * t) + .6 * np.sin(2 * np.pi * 120 * t) + .3 * np.sin(2 * np.pi * 180 * t)) * np.exp(-np.maximum(t - .08, 0) / .24) * np.minimum(t / .08, 1) * (t > .04)
    y += filt1(dg, lambda f: bp(f, 90, 900, 1))[:n] * .9 + .12 * np.sign(dg) * np.abs(dg) ** .5
    y += .1 * np.sin(2 * np.pi * np.cumsum(5400 + 2300 * np.minimum(t / 1.3, 1)) / SR) * np.minimum(t / .9, 1) * np.minimum((1.9 - t) / .3, 1)
    s = shaped(n, lambda f: bp(f, 1800, 9000, 1), r) * lfo(n, 45, r, 4.0) * np.exp(-t / .55); y += setrms(s, .08)
    return verb1(y, .25, .12, r, bright=7000)
def st_lockclick(r):
    """An old lock turning over by itself."""
    y = np.zeros(N(1.1))
    add(y, tick(r, 2100, .55), N(.02)); add(y, tick(r, 2700, .48), N(.14)); add(y, tick(r, 1900, .6), N(.26))
    add(y, metal(r, 700, 7, .25, .05), N(.42), .5); add(y, modal([165, 280, 430], [.03, .02, .012], [1, .6, .3], .12), N(.42), .8)
    add(y, creak(r, .36, (20, 36), 1.1), N(.62), .22)
    return verb1(y, .55, .18, r, bright=4800)
def st_smash(r):
    """A ceramic piggy bank meets the floor: crack, shards, coins."""
    y = np.zeros(N(2.0))
    add(y, kick(1.0, 210, 80, .16), 0)
    add(y, filt1(r.standard_normal(N(.09)) * env(N(.09), .0005, .03), lambda f: bp(f, 700, 7500, 1)), 0, 1.0)
    for _ in range(46):
        tt = r.random() ** 1.9 * .9; f = 2400 + 5500 * r.random()
        add(y, modal([f, f * 1.47, f * 2.1], [.018, .012, .007], [1, .5, .25], .05), N(tt), .22 * (1 - tt * .7))
    for _ in range(24):                                                      # coins
        tt = .1 + 1.5 * r.random() ** 1.3; b = 3600 + 3600 * r.random()
        add(y, modal([b, b * 1.18, b * 1.62, b * 2.27], [.09, .07, .05, .03], [1, .7, .5, .25], .22), N(tt), .05 * (1 - tt * .35))
    return verb1(y, .7, .15, r, bright=7000)
def st_needle(r):
    """Needle drops onto dusty vinyl."""
    y = np.zeros(N(1.3)); add(y, modal([120, 240, 410], [.07, .05, .03], [1, .5, .3], .25), 0, .7); add(y, tick(r, 1800, .5), 0)
    c = np.zeros(N(1.3)); crackles(c, r, 26, 900, 7000, .28)
    return y + (c + shaped(N(1.3), lambda f: bp(f, 700, 6000, 1), r) * .012) * np.minimum(tgrid(N(1.3)) / .1, 1) * np.minimum((1.3 - tgrid(N(1.3))) / .3, 1)
def st_cheer(r):
    """The echoes cheer: a far-off room clapping and whooping, gone almost as it starts."""
    d = 4.6; n = N(d); y = np.zeros(n); e = np.sin(np.pi * np.minimum(tgrid(n) / d, 1)) ** .8
    for _ in range(int(d * 90)):
        m = N(.014); c = filt1(fades(r.standard_normal(m), .0005, .01), lambda f: bp(f, 900 + 800 * r.random(), 5200, 1))[:m]
        add(y, c, r.integers(n), .18 * (.4 + r.random()))
    for _ in range(11):
        f0 = float(r.choice([240, 300, 370])); v = syllable(r, f0, "u" if r.random() < .5 else "ah", .35 + .5 * r.random(), glide=.32, breath=.12, cons=False)
        add(y, v, N(.2 + 3.2 * r.random()), .45)
    for _ in range(5): add(y, laugh(r), N(.5 + 3 * r.random()), .3)
    return verb1(filt1(y * e, lambda f: bp(f, 260, 4400, 1))[:n], 1.9, .55, r, bright=3000)
def st_boo(r):
    """One boo. A beat. Then the whole room."""
    d = 6.6; n = N(d); y = np.zeros(n)
    y[:0]; add(y, syllable(r, 126, "u", 1.2, glide=-.2, breath=.08, cons=False, q=(3, 5, 7)), N(.05), .8)
    for _ in range(46):
        tt = 1.9 + 1.7 * r.random(); dur = 1.3 + 1.6 * r.random()
        add(y, syllable(r, float(r.choice([105, 120, 138, 175, 210, 240])) * (.94 + .12 * r.random()), "u", min(dur, d - tt - .05), glide=-.18, breath=.14, cons=False, q=(3, 5, 7)), N(tt), .18 + .16 * r.random())
    t = tgrid(n); y *= np.minimum((d - t) / 1.1, 1) ** 1.5
    return verb1(filt1(y, lambda f: bp(f, 110, 4000, 1))[:n], 1.5, .34, r, bright=3400)
def st_car(r):
    """An old family car comes up a gravel drive, stops, a door opens and shuts."""
    d = 7.0; n = N(d); t = tgrid(n)
    roll = np.clip(t / 1.8, 0, 1) * np.clip((4.6 - t) / .6, 0, 1); sp = .4 + .6 * np.clip((4.6 - t) / 4.6, 0, 1)
    eng = saw(np.cumsum(46 + 18 * sp) / SR) * .5 + saw(np.cumsum((46 + 18 * sp) * 2.01) / SR) * .25
    eng = filt1(eng, lambda f: bp(f, 40, 520, 2))[:n] * (.25 + .75 * np.clip((5.1 - t) / .5, 0, 1)) * np.minimum(t / 1.4, 1)
    y = setrms(eng, .045)
    g = np.zeros(n); k = 0.0
    while k < 4.7:
        m = N(.012 + .04 * r.random()); e = filt1(fades(r.standard_normal(m), .001, m / SR * .7), lambda f: bp(f, 500 + 1700 * r.random(), 6000, 1))[:m]
        add(g, e, N(k), .24 * (.4 + r.random())); k += .006 + .02 * r.random()
    y += g * roll * .42
    add(y, modal([440, 860], [.03, .02], [1, .5], .08), N(4.82), .05)                                  # handbrake
    add(y, tick(r, 1100, .3), N(5.42)); add(y, creak(r, .25, (28, 50), 1.2), N(5.48), .12)              # door opens
    add(y, modal([72, 135, 240, 520], [.09, .06, .05, .02], [1, .7, .5, .3], .34), N(6.32), .55)        # door shuts
    return verb1(y, .9, .22, r, bright=4600, dark=70)
def st_bloom(r):
    """Sun's-mercy opening: a warm climb of soft bells."""
    y = np.zeros(N(3.6))
    for i, m in enumerate((64, 69, 71, 76, 81, 83, 88)):
        add(y, note(midi(m), 2.3, "ep", .01, .7) * (.14 - i * .008), N(.05 + i * .22))
    for m in (52, 64, 71): add(y, note(midi(m), 3.2, "sine", .9) * .1 * np.linspace(1, 0, N(3.2)) ** 1.2, 0)
    return verb1(filt1(y, lambda f: bp(f, 160, 11000, 1))[:len(y)], 2.2, .42, r, bright=8000, dark=200)

# ------------------------------------------------------------------ the set
# name, kind, target LUFS, renderer, ElevenLabs prompt, ElevenLabs duration
SOUNDS = [
 ("house",  "amb", -29, amb_house,   "Eerie old haunted mansion interior room tone: very low droning hum, air moving through walls, distant wooden creaks. No music, no voices.", 26),
 ("wind",   "amb", -28, amb_wind,    "Cold night wind round an old house on a bare hilltop, gusting and whistling faintly at the eaves. No rain, no music.", 26),
 ("record", "amb", -28, amb_record,  "A faint 1970s disco party heard from another room through a dusty vinyl record: muffled bass and strings, crackle and pops, ghostly distant laughter. Instrumental, no vocals.", 30),
 ("heart",  "amb", -24, amb_heart,   "Close, slow human heartbeat, deep lub-dub, nothing else.", 6),
 ("crowd",  "amb", -25, amb_crowd,   "A large excited party crowd in a big indoor ballroom, unintelligible chatter and occasional laughter, no music.", 24),
 ("candle", "amb", -33, amb_candle,  "Close candle flames fluttering and softly crackling in a silent room.", 18),
 ("class",  "amb", -31, amb_class,   "Near-empty high school classroom: old steam radiators clanking and ticking, faint fluorescent hum, a muffled hallway far away. No clear speech.", 26),
 ("hall",   "amb", -27, amb_hall,    "Busy American high school hallway between classes: metal lockers slamming, sneakers squeaking on linoleum, unintelligible teenage chatter.", 24),
 ("library","amb", -27, lambda r: sys.exit("library needs src/eleven/library.mp3 (ElevenLabs Music, prompt in library_fight)"), None, None),
 ("records","amb", -36, amb_records, "A silent records archive reading room: faint lamp buzz, slow wall clock ticking, an occasional page turning. Very quiet.", 24),
 ("gazebo", "amb", -29, amb_gazebo,  "Outdoors at dusk beside a school: light cold breeze, a tinny boombox playing an instrumental hip-hop beat a few metres away, distant traffic. No vocals, no crickets.", 22),
 ("creak",  "amb", -30, amb_creak,   "Dark upstairs corridor of an old wooden house: slow footsteps and floorboards creaking, low room tone. No voices.", 26),
 ("summon", "amb", -25, amb_summon,  "A hot sealed room with a demonic ritual gone wrong: low rumbling roar, slow wet monstrous breathing, crackling flame, dissonant drone. No voices or chanting.", 24),
 ("study",  "amb", -38, amb_study,   "A dusty room sealed for decades: dead still air, wind very far away through thick walls, an occasional tiny tick of old wood settling. Almost silent. No clock.", 22),
 ("cellar", "amb", -33, amb_cellar,  "Stone cellar: slow water drips with echo, soft straw rustling, a small animal breathing as it sleeps, faint oil lamp flame. Calm, not scary.", 24),
 ("rig",    "amb", -32, amb_rig,     "An old beige 1990s desktop computer running in a quiet room: fan whir, CRT monitor whine, occasional hard drive clicks, mains hum.", 20),
 ("set",    "amb", -23, amb_set,     "Instrumental 2004 club dance beat, 128 BPM, four on the floor, through a big PA in a large hall, heard from the dance floor. No vocals.", 15),
 ("hiss",   "amb", -38, amb_hiss,    "Loudspeakers left on with nothing playing: steady white hiss and low mains hum. Nothing else.", 8),
 ("dawn",   "amb", -33, amb_dawn,    "Sunrise on a lawn in late autumn: first birdsong, one distant crow, light breeze in bare branches. No crickets.", 26),
 ("aim",    "one", -19, st_aim,      None, None),
 ("jump",   "one", -15, st_jump,     "Horror movie jump scare: sudden orchestral dissonant stab with a heavy low hit.", 2),
 ("braaam", "one", -15, st_braaam,   "Huge low cinematic brass hit, trailer braam, long dark tail.", 5),
 ("bell",   "one", -17, st_bell,     "A big cast iron bell tolling exactly three times, slowly, with long decay.", 8),
 ("riser",  "one", -16, st_riser,    "Horror tension riser, strings and noise climbing for four seconds into one heavy impact.", 5.5),
 ("pa",     "one", -15, st_pa,       "Large PA system switching on: a loud speaker thump, mains hum, then screeching microphone feedback cut off abruptly.", 3),
 ("scratch","one", -16, st_scratch,  "DJ record scratch, hand dragging vinyl back and forth then stopping dead.", 1.5),
 ("levelup","one", -18, st_levelup,  "Short warm fantasy level-up flourish: rising harp and bells, triumphant, under three seconds.", 3),
 ("dice",   "one", -21, st_dice,     "Four plastic dice rolling and clattering to a stop on a wooden table.", 1.5),
 ("schoolbell","one",-19, st_schoolbell, "Old electric school bell ringing in a hallway for two seconds, hard metallic clanging.", 3),
 ("phone",  "one", -22, st_phone,    "A 2004 flip phone ringing: tinny polyphonic original ringtone with vibration buzz.", 3.5),
 ("paper",  "one", -18, st_paper,    "A storm of paper sheets flapping violently, rising, ending in a long paper rip.", 3),
 ("bolt",   "one", -16, st_bolt,     "Heavy iron door bolt slamming home on a big wooden door in a cold empty hall, echoing.", 2.5),
 ("steps",  "one", -21, st_steps,    "Slow heavy footsteps on the wooden floor above, heard muffled through the ceiling, creaking boards.", 5.5),
 ("swoop",  "one", -18, st_swoop,    "Large heavy cape whooshing past, close, fast flutter of cloth.", 1.5),
 ("breath", "one", -20, st_breath,   "Slow, wet, inhuman breathing behind a closed wooden door, muffled. Two breaths.", 7),
 ("monitor","one", -21, st_monitor,  "An old CRT monitor switching on: relay click, degauss thunk, rising high whine, static.", 2),
 ("lockclick","one",-19, st_lockclick, "An old door lock turning by itself: small metal clicks, a heavy clack, door creaks open a crack.", 1.5),
 ("smash",  "one", -17, st_smash,    "Ceramic piggy bank smashed on a hard floor, shards and many coins scattering.", 2),
 ("needle", "one", -22, st_needle,   "A record needle dropping onto dusty vinyl: soft thump then crackle.", 1.5),
 ("cheer",  "one", -20, st_cheer,    "Ghostly distant party crowd clapping and whooping for a few seconds, heard as an echo from far away, fading.", 5),
 ("boo",    "one", -16, st_boo,      "One single man booing alone in a silent hall, then a pause, then a huge crowd booing together.", 7),
 ("car",    "one", -18, st_car,      "An old family car rolling slowly up a gravel driveway, stopping; engine off; car door opens and shuts.", 7),
 ("bloom",  "one", -21, st_bloom,    "Soft magical shimmer, warm rising bells, a flower opening in light. Gentle, three seconds.", 3.5),
]

# ------------------------------------------------------------------ the library fight
# src/eleven/library.mp3 came from eleven_music_v2_5, 75 s, instrumental:
#   "Playful, mischievous fantasy RPG battle music at a steady 132 BPM in D minor: urgent pizzicato strings, a galloping
#    low frame drum and a sly bassoon melody, with paper rustling swells and sharp scissor snips ticking in time as
#    percussion, heavy wooden drawers slamming on the big accents, rubber-stamp thuds on the backbeat. Tense and bouncy,
#    mid-level energy held evenly from start to finish with no intro, no ending and no fade, dry, uncluttered mix that
#    leaves room for a voice talking over it."
# The lib_* stems are eleven_text_to_sound_v2 one-shots: the room itself, laid on the music's own beat grid.
LIB_BEAT = 60 / 132
LIB_START = 3.580         # a strong beat 1; measured, 36 bars on it matches itself best
LIB_BARS = 36
LIB_XF = .12              # the two sides of the seam line up, so this needn't smear the beat
def lib_stem(name, a, b, level, ref):
    y = load_audio(os.path.join(ELEVEN, "lib_" + name + ".mp3"))[N(a):N(b)]
    y = filt1(y, lambda f: hp(f, 90, 1))[:len(y)]; return fades(setrms(y, ref * 10 ** (level / 20)), .001, min(.06, len(y) / SR / 3))
def library_fight(x):
    r = np.random.default_rng(132)
    # the loop: 36 bars out of the middle, closed with the music that really follows the last bar
    L = N(LIB_BARS * 4 * LIB_BEAT); s = N(LIB_START)
    m = seamless(x[s:s + L + 16 + N(LIB_XF)], LIB_XF)
    # a gentle dip where consonants live, so narration stays clear on top
    m = filt(m, lambda f: 1 - .25 * bp(f, 1200, 3500, 2))
    ref = rms(m); n = len(m); y = np.zeros(n)
    def at(bar, beat=1, sixteenth=0): return (bar * 4 + beat - 1) * LIB_BEAT + sixteenth * LIB_BEAT / 4
    snip = lib_stem("snip", .165, .30, -15, ref); stamp = lib_stem("stamp", 0, .22, -5, ref); drawer = lib_stem("drawer", .225, .95, 0, ref)
    paper = lib_stem("paper", .25, 2.3, -13, ref); cart = lib_stem("cart", .1, 2.6, -15, ref); shh = lib_stem("shh", 0, 1.42, -6, ref)
    def nudged(ev, pitch, gain):
        i = np.arange(0, len(ev) - 1, pitch); return np.interp(i, np.arange(len(ev)), ev) * gain
    def hit(ev, t, gain=1.0, wobble=.03):
        place(y, nudged(ev, 1 + wobble * r.uniform(-1, 1), gain * r.uniform(.85, 1.1)), N(t))
    # card catalogue drawers: the big hits, every 8 bars, and a double before the last stretch
    for b in (0, 8, 16, 24, 32): hit(drawer, at(b))
    hit(drawer, at(23, 3), .7); hit(drawer, at(23, 4), .85)
    # rubber stamps on the backbeat, in and out so it never turns into a click track
    for b in [*range(4, 8), *range(12, 16), *range(20, 24), *range(28, 32), 34, 35]:
        hit(stamp, at(b, 2)); hit(stamp, at(b, 4))
    # shears: one quiet snip now and then, unevenly spaced, so they never settle into a rhythm
    for b, beat in ((5, 2), (14, 4), (21, 3), (30, 2), (34, 4)):
        hit(snip, at(b, beat, 2))
    # paper flurries swell into three of the slams and scatter off the fourth
    for b in (8, 24, 32): place(y, paper, N(at(b) - len(paper) / SR + .05))
    place(y, paper[::-1] * .9, N(at(16) + .05))
    # the cart rattles past, twice
    for b in (18, 33):
        c = cart * np.sin(np.linspace(0, np.pi, len(cart))) ** 1.2; place(y, c, N(at(b, 2)))
    # the shush: everything flinches for a bar, then carries on anyway
    t0 = at(26, 3); place(y, shh, N(t0))
    d = np.ones(n); a0, a1, a2, a3 = N(t0 - .05), N(t0 + .03), N(at(27, 3) - .2), N(at(27, 3))
    d[a0:a1] = np.linspace(1, .5, a1 - a0); d[a1:a2] = .5; d[a2:a3] = np.linspace(.5, 1, a3 - a2)
    return m * d + y

# ------------------------------------------------------------------ mastering
def load_audio(path):
    p = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True, check=True)
    return np.frombuffer(p.stdout, dtype=np.float32).astype(np.float64)
def lufs(x):
    x = np.tile(x, max(1, int(np.ceil(N(6) / max(1, len(x)))))) if len(x) < N(6) else x
    with tempfile.NamedTemporaryFile(suffix=".f32") as f:
        x.astype(np.float32).tofile(f.name)
        p = subprocess.run(["ffmpeg", "-hide_banner", "-nostats", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", f.name, "-af", "ebur128=framelog=quiet", "-f", "null", "-"], capture_output=True, text=True)
    m = re.findall(r"I:\s+(-?[\d.]+) LUFS", p.stderr)
    return float(m[-1])
def limit(x, ceil=.74):
    """Soft knee above -3 dB, memoryless, so a loop stays a loop."""
    k = ceil * .7; a = np.abs(x); out = x.copy(); over = a > k
    out[over] = np.sign(x[over]) * (k + (ceil - k) * np.tanh((a[over] - k) / (ceil - k)))
    return out
def seamless(x, xf=1.0):
    """For bought audio that may not quite loop: equal-power crossfade its tail into its head."""
    m = N(xf); head = x[:m]; tail = x[-m:]; c = np.linspace(0, np.pi / 2, m)
    body = x[:-m].copy(); body[:m] = head * np.sin(c) + tail * np.cos(c); return body
def trim(x):
    th = max(np.max(np.abs(x)) * 10 ** (-58 / 20), 1e-5); idx = np.nonzero(np.abs(x) > th)[0]
    x = x[: min(len(x), idx[-1] + N(.05))]; b = min(N(.05), len(x) // 4); x[-b:] *= np.linspace(1, 0, b); return x
def master(name, kind, target, x):
    x = x - np.mean(x)
    x = (x if kind == "amb" else trim(x))
    # a room's transients stay within 22 dB of its level, so a crackle or a drip can't jump out next to a sting
    ceil = min(.74, 10 ** ((target + 22) / 20)) if kind == "amb" else .74
    g = 10 ** ((target - lufs(x)) / 20)
    for _ in range(3):
        y = limit(x * g, ceil); g *= 10 ** ((target - lufs(y)) / 20)
    x = limit(x * g, ceil)
    if kind == "amb":
        # the roll keeps a downbeat or clock tick from landing exactly on the seam
        p = N(PAD); body = np.roll(x, N(.137)); x = np.concatenate([body[-p:], body, body[:p]]); length = len(body) / SR
    else:
        x = np.concatenate([np.zeros(N(.002)), x]); length = len(x) / SR
    path = os.path.join(OUT, name + ".mp3")
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "-", "-b:a", "80k", "-id3v2_version", "0", path], input=x.astype(np.float32).tobytes(), check=True)
    return length, os.path.getsize(path)

# Loops with a beat keep the seam the model gave them: a long crossfade would smear the rhythm.
RHYTHMIC = {"heart", "record", "gazebo", "set"}
LOOPED = {"library"}    # arrange() has already closed the loop
LOW_CUT = {"heart": 45, "set": 45, "library": 60}
def arrange(name, x):
    """Where a generation needs shaping to fit its scene."""
    if name == "bell":      # the model gives one strike; the cue wants three tolls
        y = np.zeros(N(2.3) * 2 + N(5)); strike = x[:N(2.3)].copy(); strike[-N(.5):] *= np.linspace(1, 0, N(.5))
        tail = x[:N(5)].copy(); tail[-N(1):] *= np.linspace(1, 0, N(1))
        add(y, strike, 0); add(y, strike, N(2.3)); add(y, tail, N(4.6)); return y
    if name == "boo":       # "one boo, then the whole room"
        lone = load_audio(os.path.join(ELEVEN, "boo1.mp3")); lone = trim(lone); lone = setrms(lone, rms(x) * .55)
        gap = len(lone) + N(.6); y = np.zeros(gap + len(x)); add(y, lone, 0)
        crowd = x.copy(); crowd[:N(.35)] *= np.linspace(0, 1, N(.35)); add(y, crowd, gap); return y
    if name == "library": return library_fight(x)
    return x

def fetch_eleven(name, prompt, dur, loop):
    key = os.environ.get("ELEVENLABS_API_KEY")
    if not key: sys.exit("ELEVENLABS_API_KEY is not set in this environment.")
    body = {"text": prompt, "prompt_influence": .5, "duration_seconds": min(30, max(.5, dur))}
    if loop: body["loop"] = True
    req = urllib.request.Request("https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_128", json.dumps(body).encode(),
                                 {"xi-api-key": key, "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=180) as r: data = r.read()
    except urllib.error.HTTPError as e:
        sys.exit(f"ElevenLabs refused {name}: {e.code} {e.read()[:400].decode(errors='replace')}")
    os.makedirs(ELEVEN, exist_ok=True); path = os.path.join(ELEVEN, name + ".mp3")
    open(path, "wb").write(data); print(f"  fetched {name}: {len(data) // 1024} KB")

def main():
    ap = argparse.ArgumentParser(); ap.add_argument("--only", default=""); ap.add_argument("--eleven", action="store_true"); ap.add_argument("--all", action="store_true")
    a = ap.parse_args(); only = {s for s in a.only.split(",") if s}
    if a.eleven and not only and not a.all: sys.exit("--eleven needs --only <name> (test one first) or --all")
    manifest_path = os.path.join(OUT, "manifest.js"); man = {}
    if os.path.exists(manifest_path):
        man = json.loads(re.search(r"=\s*(\{.*\})\s*;", open(manifest_path).read(), re.S).group(1))
    for name, kind, target, fn, prompt, dur in SOUNDS:
        if only and name not in only: continue
        raw = os.path.join(ELEVEN, name + ".mp3")
        if a.eleven and prompt and not os.path.exists(raw): fetch_eleven(name, prompt, dur, kind == "amb")
        r = np.random.default_rng(zlib.crc32(name.encode()))
        if os.path.exists(raw):
            x = arrange(name, load_audio(raw)); src = "elevenlabs"
            # generated audio carries a lot of sub rumble: a Bluetooth speaker can't play it, and it would eat the level
            if kind == "amb":
                if name not in LOOPED: x = seamless(x, .03 if name in RHYTHMIC else 1.0)
                x = filt(x, lambda f: hp(f, LOW_CUT.get(name, 75), 2))
            else:
                x = filt1(x, lambda f: hp(f, 45, 2))[:len(x)]
        else:
            x = fn(r); src = "render"
        length, size = master(name, kind, target, x)
        man[name] = {"f": name + ".mp3", "v": "%08x" % zlib.crc32(open(os.path.join(OUT, name + ".mp3"), "rb").read()), "amb": kind == "amb", "len": round(length, 5), "src": src}
        print(f"{name:11s} {kind} {length:6.2f}s {size // 1024:5d} KB  target {target} LUFS  [{src}]", flush=True)
    order = [s[0] for s in SOUNDS]; man = {k: man[k] for k in order if k in man}
    with open(manifest_path, "w") as f:
        f.write("/* Written by src/make_sounds.py. len is the loop length in seconds; loops carry PAD seconds of wrapped audio each side. */\n")
        f.write("const SOUND_PAD = %s;\nconst SOUND_FILES = %s;\n" % (PAD, json.dumps(man, indent=0)))
    total = sum(os.path.getsize(os.path.join(OUT, v["f"])) for v in man.values())
    print(f"total {total / 1048576:.2f} MB, {len(man)} sounds")

if __name__ == "__main__":
    main()
