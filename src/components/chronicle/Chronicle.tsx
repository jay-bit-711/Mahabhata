import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  BookOpen,
  Clapperboard,
  Feather,
  Map,
  Route,
  ScrollText,
  Swords,
  Type,
  X,
} from "lucide-react";
import {
  ACTS,
  BEATS,
  LEVEL_XP,
  PLACES,
  type Beat,
  type Lang,
  type Line,
  type Mode,
} from "@/lib/chronicle/content";

const KEY = "mb-chronicle-v1";

type Save = {
  intro: boolean;
  dharma: number;
  xp: number;
  heard: string[];
  picks: Record<string, string>;
  lang: Lang;
  mode: Mode;
};

const EMPTY: Save = {
  intro: true,
  dharma: 0,
  xp: 0,
  heard: [],
  picks: {},
  lang: "all",
  mode: "film",
};

function loadSave(): Save {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<Save>;
    return { ...EMPTY, ...parsed, heard: parsed.heard ?? [], picks: parsed.picks ?? {} };
  } catch {
    return EMPTY;
  }
}

function line(text: Line, lang: Lang) {
  if (lang === "sa") return [text.sa];
  if (lang === "en") return [text.en];
  if (lang === "te") return [text.te];
  return [text.sa, text.en, text.te];
}

function stance(dharma: number) {
  if (dharma > 16) return "Dharma";
  if (dharma < -16) return "Adharma";
  return "Balance";
}

export function Chronicle() {
  const [boot, setBoot] = useState(true);
  const [save, setSave] = useState<Save>(EMPTY);
  const [panel, setPanel] = useState<"map" | "path" | "acts" | null>(null);

  useEffect(() => {
    setSave(loadSave());
    setBoot(false);
  }, []);

  useEffect(() => {
    if (boot) return;
    localStorage.setItem(KEY, JSON.stringify(save));
  }, [save, boot]);

  const heard = useMemo(() => new Set(save.heard), [save.heard]);
  const done = BEATS.every((b) => heard.has(b.id));
  const beatIndex = Math.min(save.heard.length + 1, BEATS.length);

  function patch(next: Partial<Save>) {
    setSave((s) => ({ ...s, ...next }));
  }

  function hear(beat: Beat, extraXp: number, dharma = 0, pick?: string) {
    setSave((s) => {
      if (s.heard.includes(beat.id)) return s;
      return {
        ...s,
        heard: [...s.heard, beat.id],
        xp: Math.min(LEVEL_XP, s.xp + beat.xp + extraXp),
        dharma: Math.max(-100, Math.min(100, s.dharma + dharma)),
        picks: pick ? { ...s.picks, [beat.id]: pick } : s.picks,
      };
    });
  }

  if (boot || save.intro) {
    return (
      <Intro
        booting={boot}
        onEnter={() => patch({ intro: false })}
      />
    );
  }

  return (
    <div className="min-h-dvh bg-ink pb-24 text-cream">
      <header className="sticky top-0 z-20 border-b border-line bg-ink/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-xl items-center justify-between gap-3 px-4 py-3">
          <p className="font-display text-xl text-gold">Mahabharata</p>
          <LangSwitch lang={save.lang} onChange={(lang) => patch({ lang })} />
        </div>
      </header>

      <main className="mx-auto w-full max-w-xl px-4 pt-5 pb-10">
        <div className="mb-1 flex items-baseline justify-between text-xs tracking-widest text-mute uppercase">
          <span>Adi Parva</span>
          <span>
            Beat {beatIndex}/{BEATS.length}
          </span>
        </div>
        <Dharma value={save.dharma} />
        <div className="mt-3 mb-6">
          <div className="mb-1 flex justify-between text-xs text-mute">
            <span>
              {save.xp} / {LEVEL_XP} XP
            </span>
            <span>Level 1 of 100</span>
          </div>
          <div className="h-0.5 bg-line">
            <div className="h-full bg-gold" style={{ width: `${save.xp}%` }} />
          </div>
        </div>

        <ModeRow mode={save.mode} onChange={(mode) => patch({ mode })} />

        <section className="mt-6 space-y-8">
          {BEATS.map((beat) => (
            <BeatCard
              key={beat.id}
              beat={beat}
              lang={save.lang}
              mode={save.mode}
              heard={heard.has(beat.id)}
              pick={save.picks[beat.id]}
              onHear={(xp, dharma, pick) => hear(beat, xp, dharma, pick)}
            />
          ))}
        </section>

        {done ? (
          <div className="mt-8 border border-gold/40 bg-panel px-4 py-5">
            <p className="font-display text-2xl text-gold">Level 1 complete</p>
            <p className="mt-2 text-sm leading-relaxed text-cream/90">
              The hearing is set. Your stance is {stance(save.dharma).toLowerCase()}. The House of Lac
              is the next act — still sealed.
            </p>
            <button
              type="button"
              className="mt-4 border border-line px-4 py-3 text-xs tracking-widest text-mute uppercase"
              onClick={() =>
                patch({
                  intro: true,
                  dharma: 0,
                  xp: 0,
                  heard: [],
                  picks: {},
                })
              }
            >
              Hear it again
            </button>
          </div>
        ) : null}
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-ink">
        <div className="mx-auto grid max-w-xl grid-cols-4">
          <HudButton icon={BookOpen} label="Read" active={panel === null} onClick={() => setPanel(null)} />
          <HudButton icon={Map} label="Map" active={panel === "map"} onClick={() => setPanel("map")} />
          <HudButton icon={Route} label="Path" active={panel === "path"} onClick={() => setPanel("path")} />
          <HudButton icon={Swords} label="Acts" active={panel === "acts"} onClick={() => setPanel("acts")} />
        </div>
      </nav>

      {panel ? (
        <Sheet title={panel === "map" ? "Where you stand" : panel === "path" ? "The path" : "Acts"} onClose={() => setPanel(null)}>
          {panel === "map" ? <MapBody /> : null}
          {panel === "path" ? <PathBody save={save} beatIndex={beatIndex} /> : null}
          {panel === "acts" ? <ActsBody open={done} /> : null}
        </Sheet>
      ) : null}
    </div>
  );
}

function Intro({ booting, onEnter }: { booting: boolean; onEnter: () => void }) {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-ink px-6 text-center">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-80"
          autoPlay
          muted
          loop
          playsInline
          poster="/chronicle/beam.jpg"
          src="/chronicle/beam.mp4"
        />
        <div className="absolute inset-0 bg-ink/45" />
      </div>
      <h1 className="title-in font-display text-6xl leading-none text-gold sm:text-7xl">Mahabharata</h1>
      <p className="title-in mt-4 text-xs tracking-[0.35em] text-mute uppercase">A living chronicle</p>
      <button
        type="button"
        disabled={booting}
        onClick={onEnter}
        className="title-in mt-10 min-h-11 border border-gold px-6 py-3 text-xs tracking-widest text-gold uppercase"
      >
        {booting ? "Opening" : "Enter Naimisha"}
      </button>
    </div>
  );
}

function Dharma({ value }: { value: number }) {
  const pct = ((value + 100) / 200) * 100;
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs text-mute">
        <span>Adharma</span>
        <span className="text-gold">{stance(value)}</span>
        <span>Dharma</span>
      </div>
      <div className="relative h-1 bg-line">
        <span className="absolute top-1/2 left-1/2 h-2 w-px -translate-x-1/2 -translate-y-1/2 bg-mute" />
        <span
          className="absolute top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold"
          style={{ left: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function LangSwitch({ lang, onChange }: { lang: Lang; onChange: (l: Lang) => void }) {
  const items: { id: Lang; label: string }[] = [
    { id: "sa", label: "स" },
    { id: "en", label: "E" },
    { id: "te", label: "తె" },
    { id: "all", label: "A" },
  ];
  return (
    <div className="flex gap-1.5">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          aria-pressed={lang === item.id}
          onClick={() => onChange(item.id)}
          className={
            "flex size-9 items-center justify-center rounded-full border text-sm " +
            (lang === item.id
              ? "border-gold bg-gold text-on-gold"
              : "border-line text-cream")
          }
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

function ModeRow({ mode, onChange }: { mode: Mode; onChange: (m: Mode) => void }) {
  const items: { id: Mode; label: string; icon: typeof Clapperboard }[] = [
    { id: "film", label: "Film", icon: Clapperboard },
    { id: "page", label: "Page", icon: BookOpen },
    { id: "tale", label: "Tale", icon: Feather },
    { id: "text", label: "Text", icon: Type },
  ];
  return (
    <div className="flex gap-2">
      {items.map((item) => {
        const Icon = item.icon;
        const on = mode === item.id;
        return (
          <button
            key={item.id}
            type="button"
            aria-pressed={on}
            aria-label={item.label}
            title={item.label}
            onClick={() => onChange(item.id)}
            className={
              "flex size-11 items-center justify-center border " +
              (on ? "border-gold bg-gold text-on-gold" : "border-line bg-panel text-cream")
            }
          >
            <Icon className="size-4" strokeWidth={1.5} />
          </button>
        );
      })}
    </div>
  );
}

function BeatCard({
  beat,
  lang,
  mode,
  heard,
  pick,
  onHear,
}: {
  beat: Beat;
  lang: Lang;
  mode: Mode;
  heard: boolean;
  pick?: string;
  onHear: (xp: number, dharma: number, pick?: string) => void;
}) {
  const texts = line(beat.text, lang);
  const chosen = beat.choice?.options.find((o) => o.id === pick);
  return (
    <article className="border-t border-line pt-6">
      {mode !== "text" ? (
        <div className={"plate mb-4 " + (mode === "page" ? "plate-page" : mode === "tale" ? "plate-tale" : "")}>
          {mode === "film" && beat.video ? (
            <video autoPlay muted loop playsInline poster={beat.image} src={beat.video} />
          ) : (
            <img src={beat.image} alt="" />
          )}
        </div>
      ) : null}
      <p className="mb-3 text-xs tracking-widest text-gold uppercase">{beat.place}</p>
      {texts.map((chunk, i) => (
        <p
          key={chunk}
          className={
            "leading-relaxed " +
            (i === 0 && (lang === "sa" || lang === "all")
              ? "font-verse text-lg whitespace-pre-line"
              : "mt-3 text-sm text-cream/90")
          }
        >
          {chunk}
        </p>
      ))}
      {heard && chosen
        ? line(chosen.note, lang).map((chunk) => (
            <p key={chunk} className="mt-3 text-sm text-gold">
              {chunk}
            </p>
          ))
        : null}
      {!heard && !beat.choice ? (
        <button
          type="button"
          className="action mt-4 min-h-11 bg-gold px-4 py-2 text-sm text-on-gold"
          onClick={() => onHear(0, 0)}
        >
          Mark heard · +{beat.xp} XP
        </button>
      ) : null}
      {!heard && beat.choice ? (
        <div className="mt-4 space-y-2">
          <p className="text-sm text-mute">{line(beat.choice.prompt, lang === "all" ? "en" : lang)[0]}</p>
          {beat.choice.options.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className="action block w-full min-h-11 border border-line px-3 py-3 text-left text-sm hover:border-gold"
              onClick={() => onHear(opt.xp, opt.dharma, opt.id)}
            >
              <span className="block text-cream">{line(opt.label, lang === "all" ? "en" : lang)[0]}</span>
              <span className="mt-1 block text-xs text-mute">
                {opt.dharma > 0 ? "+" : ""}
                {opt.dharma} dharma · +{opt.xp} XP
              </span>
            </button>
          ))}
        </div>
      ) : null}
      {heard && !chosen ? <p className="mt-3 text-xs tracking-widest text-mute uppercase">Heard</p> : null}
    </article>
  );
}

function HudButton({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: typeof BookOpen;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={"flex min-h-14 flex-col items-center justify-center gap-1 text-xs tracking-widest uppercase " + (active ? "text-gold" : "text-mute")}
    >
      <Icon className="size-4" strokeWidth={1.5} />
      {label}
    </button>
  );
}

function Sheet({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center bg-ink/70 sm:items-center">
      <button type="button" aria-label="Close" className="absolute inset-0" onClick={onClose} />
      <div className="relative z-10 max-h-[80dvh] w-full max-w-xl overflow-y-auto border border-line bg-panel px-5 py-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-3xl text-gold">{title}</h2>
          <button type="button" aria-label="Close panel" onClick={onClose} className="flex size-11 items-center justify-center text-cream">
            <X className="size-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function MapBody() {
  return (
    <ol className="space-y-0">
      {PLACES.map((place, i) => (
        <li key={place.id} className="flex gap-3">
          <div className="flex flex-col items-center">
            <span className={"size-2.5 rounded-full " + (place.now ? "bg-gold" : "bg-line")} />
            {i < PLACES.length - 1 ? <span className="w-px flex-1 bg-line" /> : null}
          </div>
          <div className="pb-5">
            <p className={place.now ? "text-gold" : "text-cream"}>{place.name}</p>
            <p className="text-sm text-mute">{place.note}</p>
            {place.now ? <p className="mt-1 text-xs tracking-widest text-gold uppercase">You are here</p> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

function PathBody({ save, beatIndex }: { save: Save; beatIndex: number }) {
  return (
    <div>
      <p className="text-sm text-mute">Adi Parva · Adhyaya 1 · Beat {beatIndex}/{BEATS.length}</p>
      <p className="mt-4 font-display text-4xl text-cream">
        {save.xp}
        <span className="text-xl text-mute"> / {LEVEL_XP}</span>
      </p>
      <p className="mt-1 text-sm text-gold">{stance(save.dharma)} · Level 1 of 100</p>
      <div className="mt-4 h-1 bg-line">
        <div className="h-full bg-gold" style={{ width: `${save.xp}%` }} />
      </div>
      <p className="mt-4 text-sm leading-relaxed text-mute">
        Each hearing moves the level. The balance above it is not a grade — it is the weight of what you chose to tell.
      </p>
      <ScrollText className="mt-6 size-5 text-gold" />
    </div>
  );
}

function ActsBody({ open }: { open: boolean }) {
  return (
    <ul className="space-y-3">
      {ACTS.map((act) => {
        const locked = !act.open && !open;
        const ready = !act.open && open;
        return (
          <li key={act.id} className="border border-line px-3 py-3">
            <p className="text-xs tracking-widest text-mute uppercase">
              Act {act.index} · {act.phase}
            </p>
            <p className="font-display text-2xl text-cream">{act.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-mute">{act.blurb}</p>
            <p className="mt-2 text-xs tracking-widest text-gold uppercase">
              {act.open ? "Open" : ready ? "Next — still being written" : "Sealed"}
            </p>
            {locked || ready ? null : null}
          </li>
        );
      })}
    </ul>
  );
}
