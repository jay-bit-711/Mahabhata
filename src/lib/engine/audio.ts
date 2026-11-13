let ctx: AudioContext | null = null;
let nodes: { stop: () => void } | null = null;

function context() {
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

export function unlockAudio() {
  context();
}

export function setDrone(on: boolean) {
  const c = context();
  if (!on) {
    nodes?.stop();
    nodes = null;
    return;
  }
  if (nodes) return;
  const gain = c.createGain();
  gain.gain.value = 0.028;
  gain.connect(c.destination);
  const sa = c.createOscillator();
  const pa = c.createOscillator();
  sa.type = "sine";
  pa.type = "triangle";
  sa.frequency.value = 130.81;
  pa.frequency.value = 196;
  sa.connect(gain);
  pa.connect(gain);
  sa.start();
  pa.start();
  nodes = {
    stop() {
      sa.stop();
      pa.stop();
      gain.disconnect();
    },
  };
}

export function uiTick() {
  const c = context();
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.frequency.value = 640;
  osc.type = "square";
  gain.gain.setValueAtTime(0.03, c.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.06);
  osc.connect(gain);
  gain.connect(c.destination);
  osc.start();
  osc.stop(c.currentTime + 0.07);
}

export function conch() {
  const c = context();
  const length = Math.floor(c.sampleRate * 0.7);
  const buffer = c.createBuffer(1, length, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length);
  const src = c.createBufferSource();
  src.buffer = buffer;
  const filter = c.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(280, c.currentTime);
  filter.frequency.exponentialRampToValueAtTime(720, c.currentTime + 0.45);
  filter.Q.value = 6;
  const gain = c.createGain();
  gain.gain.setValueAtTime(0.12, c.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.7);
  src.connect(filter);
  filter.connect(gain);
  gain.connect(c.destination);
  src.start();
}

export function beatHit(voice: "whisper" | "speak" | "boom" = "speak") {
  const c = context();
  const osc = c.createOscillator();
  const gain = c.createGain();
  const now = c.currentTime;
  if (voice === "whisper") {
    osc.frequency.value = 220;
    osc.type = "sine";
    gain.gain.setValueAtTime(0.015, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    osc.stop(now + 0.2);
  } else if (voice === "boom") {
    osc.frequency.setValueAtTime(90, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.4);
    osc.type = "sawtooth";
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    osc.stop(now + 0.46);
  } else {
    osc.frequency.value = 480;
    osc.type = "triangle";
    gain.gain.setValueAtTime(0.03, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    osc.stop(now + 0.09);
  }
  osc.connect(gain);
  gain.connect(c.destination);
  osc.start();
}

export function sakugaSwell(kind: "vastraharan" | "virata" | "wheel" | "pyre") {
  const c = context();
  const now = c.currentTime;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = kind === "virata" ? "sawtooth" : "triangle";
  const start = kind === "vastraharan" ? 80 : kind === "wheel" ? 140 : kind === "pyre" ? 70 : 55;
  osc.frequency.setValueAtTime(start, now);
  osc.frequency.exponentialRampToValueAtTime(kind === "virata" ? 880 : 320, now + 1.4);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.09, now + 0.35);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);
  osc.connect(gain);
  gain.connect(c.destination);
  osc.start();
  osc.stop(now + 1.85);
  if (kind === "vastraharan" || kind === "pyre") conch();
}
