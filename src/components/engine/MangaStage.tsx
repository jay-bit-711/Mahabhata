import { useEffect, useRef, useState } from "react";
import { beatHit, drip, sakugaSwell, shatterHit, silkStream, vowDrop } from "@/lib/engine/audio";
import { bindVows } from "@/lib/engine/store";
import type { Beat, Emotion, Lang, Line, Scene, Voice } from "@/lib/engine/types";

function lines(text: Line, lang: Lang) {
  if (lang === "sa") return [text.sa];
  if (lang === "en") return [text.en];
  if (lang === "te") return [text.te];
  return [text.sa, text.en, text.te];
}

const MOOD: Record<Emotion, string> = {
  still: "border-gold",
  calm: "border-gold",
  wrath: "border-blood",
  grief: "border-mute",
  sly: "border-cream",
};

const VOICE: Record<Voice, string> = {
  whisper: "text-sm tracking-[0.14em] text-mute italic",
  speak: "text-base leading-relaxed text-cream",
  boom: "font-display text-4xl leading-tight text-gold",
};

function blocked(beat: Beat | undefined, opened: boolean) {
  if (!beat) return false;
  if (beat.holdMs && !opened) return true;
  if (beat.rite === "seal" && !opened) return true;
  return false;
}

export function MangaStage({
  scene,
  lang,
  audio,
  onReady,
}: {
  scene: Scene;
  lang: Lang;
  audio: boolean;
  onReady: (ready: boolean) => void;
}) {
  const [shown, setShown] = useState(0);
  const [lens, setLens] = useState(false);
  const [hold, setHold] = useState(false);
  const [opened, setOpened] = useState(false);
  const [pct, setPct] = useState(0);
  const [shake, setShake] = useState(false);
  const frame = useRef(0);
  const beats = scene.beats;
  const beat = beats[Math.min(shown, beats.length - 1)];
  const last = shown >= beats.length - 1;
  const gate = blocked(beat, opened);
  const rite = beat?.rite;

  useEffect(() => {
    setShown(0);
    setLens(false);
    setHold(false);
    setOpened(false);
    setPct(0);
    onReady(beats.length <= 1 && !blocked(beats[0], false));
    if (scene.vows?.length) bindVows(scene.vows);
  }, [scene.id]);

  useEffect(() => {
    onReady(last && !gate);
  }, [last, gate, scene.id]);

  useEffect(() => {
    if (!last || !scene.sakuga || gate) return;
    if (audio) sakugaSwell(scene.sakuga);
  }, [last, gate, scene.id, scene.sakuga, audio]);

  useEffect(() => {
    if (!audio || !rite) return;
    if (rite === "vow") vowDrop();
    if (rite === "shatter") shatterHit();
    if (rite === "silk") silkStream();
  }, [rite, shown, scene.id, audio]);

  function reveal() {
    if (last || gate) return;
    const next = beats[shown + 1];
    setShown((n) => n + 1);
    setOpened(false);
    setPct(0);
    setHold(false);
    setShake(false);
    requestAnimationFrame(() => setShake(Boolean(scene.air === "lac" || next.shake || next.voice === "boom")));
    if (audio) {
      if (scene.air === "lac") drip();
      else beatHit(next.voice ?? "speak");
    }
  }

  function beginHold() {
    setHold(true);
    const need = beat?.holdMs ?? (beat?.rite === "seal" ? 700 : 0);
    if (!need || opened) return;
    const start = performance.now();
    const step = (now: number) => {
      const next = Math.min(1, (now - start) / need);
      setPct(next);
      if (next >= 1) {
        setOpened(true);
        return;
      }
      frame.current = requestAnimationFrame(step);
    };
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(step);
  }

  function endHold() {
    setHold(false);
    cancelAnimationFrame(frame.current);
    if (!opened) setPct(0);
  }

  return (
    <div className={(shake ? "shake " : "") + (scene.air === "lac" ? "air-lac " : "") + (rite ? "rite-live rite-" + rite : "")}>
      {scene.air === "lac" ? <Wax /> : null}
      {rite === "vow" ? <VowSky progress={opened ? 1 : pct} /> : null}
      {rite === "shatter" ? <Shatter /> : null}
      {rite === "silk" ? <Silk /> : null}
      {rite === "hair" ? <Hair progress={opened ? 1 : pct} /> : null}
      {scene.sakuga && last && !gate ? <Sakuga kind={scene.sakuga} /> : null}
      {scene.video || scene.image ? (
        <div className="plate mb-4">
          {scene.video ? (
            <video autoPlay muted loop playsInline poster={scene.image} src={scene.video} />
          ) : (
            <img src={scene.image} alt="" />
          )}
        </div>
      ) : null}
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className={"flex size-10 items-center justify-center rounded-full border font-display text-gold " + MOOD[beat?.emotion ?? scene.emotion ?? "still"]}>
            {(beat?.speaker ?? scene.speaker ?? "—").slice(0, 1)}
          </span>
          <div>
            <p className="text-sm text-cream">{beat?.speaker ?? scene.speaker ?? "Narrator"}</p>
            <p className="text-xs tracking-widest text-mute uppercase">{scene.place}</p>
          </div>
        </div>
        <button
          type="button"
          aria-pressed={lens}
          onClick={() => setLens((v) => !v)}
          className={"min-h-11 border px-3 text-xs tracking-widest uppercase " + (lens ? "border-gold text-gold" : "border-line text-mute")}
        >
          Intent
        </button>
      </div>
      <div className="space-y-3">
        {beats.slice(0, shown + 1).map((item, index) => (
          <BeatCard
            key={scene.id + index}
            beat={item}
            lang={lang}
            fresh={index === shown}
            peek={lens || (hold && index === shown) || (opened && index === shown && item.rite === "seal")}
            jagged={item.rite === "shatter" || item.rite === "hair"}
            progress={index === shown ? pct : 0}
            onHold={index === shown ? { down: beginHold, up: endHold } : undefined}
          />
        ))}
      </div>
      {gate ? (
        <p className="mt-4 text-xs tracking-widest text-gold uppercase">
          {rite === "vow" ? "Hold. Let the name finish." : rite === "hair" ? "Hold. Lock the vow." : "Hold. The tunnel is not in this tongue."}
        </p>
      ) : !last ? (
        <button type="button" className="mt-4 min-h-11 border border-gold px-4 text-xs tracking-widest text-gold uppercase" onClick={reveal}>
          Next beat
        </button>
      ) : null}
    </div>
  );
}

function BeatCard({
  beat,
  lang,
  fresh,
  peek,
  jagged,
  progress,
  onHold,
}: {
  beat: Beat;
  lang: Lang;
  fresh: boolean;
  peek: boolean;
  jagged: boolean;
  progress: number;
  onHold?: { down: () => void; up: () => void };
}) {
  const voice = jagged ? "rite-jagged" : VOICE[beat.voice ?? "speak"];
  const sealed = beat.rite === "seal" && !peek;
  return (
    <button
      type="button"
      className={"ink relative block w-full overflow-hidden border border-line bg-panel px-4 py-4 text-left " + (fresh ? "" : "opacity-80")}
      onPointerDown={() => onHold?.down()}
      onPointerUp={() => onHold?.up()}
      onPointerLeave={() => onHold?.up()}
      onPointerCancel={() => onHold?.up()}
    >
      {progress > 0 && progress < 1 ? <span className="rite-meter" style={{ transform: `scaleX(${progress})` }} /> : null}
      {lines(beat.line, lang).map((chunk, i) => (
        <p key={chunk} className={(i === 0 ? voice : "mt-2 text-sm leading-relaxed text-cream/80") + (sealed ? " rite-cipher" : "")}>
          {chunk}
        </p>
      ))}
      {peek && beat.intent ? (
        <div className="mt-3 border-t border-gold/40 pt-3">
          {lines(beat.intent, lang).map((chunk) => (
            <p key={chunk} className="text-sm leading-relaxed text-gold">
              {chunk}
            </p>
          ))}
        </div>
      ) : beat.intent ? (
        <p className="mt-3 text-xs tracking-widest text-mute uppercase">Hold for what they will not say</p>
      ) : null}
    </button>
  );
}

function VowSky({ progress }: { progress: number }) {
  return (
    <div className="rite rite-vow" style={{ background: `linear-gradient(to bottom, rgba(5,4,3,${0.55 + progress * 0.4}) 0%, rgba(5,4,3,${0.28 + progress * 0.35}) 46%, transparent 78%)` }} aria-hidden="true">
      <svg viewBox="0 0 1200 220" className="bhishma-svg">
        <text x="600" y="140" textAnchor="middle" className="bhishma-stroke">
          BHISHMA
        </text>
      </svg>
    </div>
  );
}

function Wax() {
  return (
    <div className="rite rite-wax" aria-hidden="true">
      {Array.from({ length: 7 }, (_, i) => (
        <span key={i} style={{ left: `${8 + i * 13}%`, animationDelay: `${i * 0.45}s` }} />
      ))}
    </div>
  );
}

function Shatter() {
  return <div className="rite rite-shatter" aria-hidden="true" />;
}

function Silk() {
  return (
    <div className="rite rite-silk" aria-hidden="true">
      {Array.from({ length: 18 }, (_, i) => (
        <span key={i} style={{ top: `${(i * 5.4) % 100}%`, animationDelay: `${(i % 6) * 0.35}s`, animationDuration: `${2.4 + (i % 5) * 0.4}s` }} />
      ))}
    </div>
  );
}

function Hair({ progress }: { progress: number }) {
  return <div className="rite rite-hair" style={{ opacity: 0.25 + progress * 0.75 }} aria-hidden="true" />;
}

function Sakuga({ kind }: { kind: NonNullable<Scene["sakuga"]> }) {
  if (kind === "virata") {
    return (
      <div className="sakuga sakuga-virata pointer-events-none fixed inset-0 z-40" aria-hidden="true">
        <svg className="absolute top-1/2 left-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2" viewBox="0 0 200 200">
          {Array.from({ length: 8 }, (_, i) => (
            <circle key={i} cx="100" cy="100" r={20 + i * 12} fill="none" stroke="currentColor" strokeWidth="0.4" />
          ))}
          <path d="M100 10 L190 150 L10 150 Z" fill="none" stroke="currentColor" strokeWidth="0.6" />
        </svg>
      </div>
    );
  }
  if (kind === "wheel") {
    return <div className="sakuga sakuga-wheel pointer-events-none fixed inset-0 z-40" aria-hidden="true" />;
  }
  if (kind === "vastraharan") {
    return <div className="sakuga sakuga-vastra pointer-events-none fixed inset-0 z-40" aria-hidden="true" />;
  }
  return <div className="sakuga sakuga-pyre pointer-events-none fixed inset-0 z-40" aria-hidden="true" />;
}
