import { useEffect, useState } from "react";
import { beatHit, sakugaSwell } from "@/lib/engine/audio";
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
  const [shake, setShake] = useState(false);
  const beats = scene.beats;
  const beat = beats[Math.min(shown, beats.length - 1)];
  const last = shown >= beats.length - 1;

  useEffect(() => {
    setShown(0);
    setLens(false);
    setHold(false);
    onReady(beats.length <= 1);
    if (scene.vows?.length) bindVows(scene.vows);
  }, [scene.id]);

  useEffect(() => {
    if (!last || !scene.sakuga) return;
    if (audio) sakugaSwell(scene.sakuga);
  }, [last, scene.id, scene.sakuga, audio]);

  function reveal() {
    if (last) return;
    const next = beats[shown + 1];
    setShown((n) => n + 1);
    setShake(Boolean(next.shake || next.voice === "boom"));
    if (audio) beatHit(next.voice ?? "speak");
    if (shown + 1 >= beats.length - 1) onReady(true);
  }

  return (
    <div className={shake ? "shake" : ""}>
      {scene.sakuga && last ? <Sakuga kind={scene.sakuga} /> : null}
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
            peek={lens || (hold && index === shown)}
            onHold={index === shown ? setHold : undefined}
          />
        ))}
      </div>
      {!last ? (
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
  onHold,
}: {
  beat: Beat;
  lang: Lang;
  fresh: boolean;
  peek: boolean;
  onHold?: (down: boolean) => void;
}) {
  const voice = VOICE[beat.voice ?? "speak"];
  return (
    <button
      type="button"
      className={"ink block w-full border border-line bg-panel px-4 py-4 text-left " + (fresh ? "" : "opacity-80")}
      onPointerDown={() => onHold?.(true)}
      onPointerUp={() => onHold?.(false)}
      onPointerLeave={() => onHold?.(false)}
    >
      {lines(beat.line, lang).map((chunk, i) => (
        <p key={chunk} className={i === 0 ? voice : "mt-2 text-sm leading-relaxed text-cream/80"}>
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
