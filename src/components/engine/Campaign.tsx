import { useEffect, useState } from "react";
import { BookOpen, Map, Volume2, VolumeX } from "lucide-react";
import { ACT_SLOTS, actCursor, findScene } from "@/data/parvas";
import { conch, setDrone, uiTick, unlockAudio } from "@/lib/engine/audio";
import {
  advance,
  applyOutcome,
  enterChronicle,
  exportSave,
  goTo,
  hydrate,
  markHistory,
  resetCampaign,
  setAudio,
  setLang,
  useCampaign,
} from "@/lib/engine/store";
import type { Choice, GameId, Lang, Line, Outcome, VowMark } from "@/lib/engine/types";
import { AstraGame, DiceGame, DiplomacyGame, VyuhaGame } from "./games";
import { MangaStage } from "./MangaStage";

function lines(text: Line, lang: Lang) {
  if (lang === "sa") return [text.sa];
  if (lang === "en") return [text.en];
  if (lang === "te") return [text.te];
  return [text.sa, text.en, text.te];
}

function stance(n: number) {
  if (n > 16) return "Dharma";
  if (n < -16) return "Adharma";
  return "Balance";
}

export function CampaignApp() {
  const save = useCampaign();
  const [booted, setBooted] = useState(false);
  const [panel, setPanel] = useState<"map" | "field" | null>(null);
  const [playing, setPlaying] = useState<GameId | null>(null);
  const [drill, setDrill] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    hydrate();
    setBooted(true);
  }, []);

  useEffect(() => {
    if (!booted) return;
    setDrone(save.audio);
  }, [save.audio, booted]);

  const located = findScene(save.cursor);
  const finished =
    located &&
    save.cursor.scene === located.chapter.scenes.length - 1 &&
    save.cursor.chapter === located.parva.chapters.length - 1 &&
    save.history.some((h) => h.sceneId === located.scene.id);

  if (!booted || save.intro || !located) {
    return <Gate booting={!booted} onEnter={() => { unlockAudio(); uiTick(); enterChronicle(); }} />;
  }

  function finishGame(outcome: Outcome, game: GameId) {
    applyOutcome(outcome);
    if (!drill && located) markHistory(located.scene.id, undefined, game);
    setPlaying(null);
    setDrill(false);
    if (!drill) advance();
    uiTick();
  }

  function takeChoice(choice: Choice) {
    uiTick();
    applyOutcome(choice.outcome);
    markHistory(located!.scene.id, choice.id);
    if (located!.scene.game) {
      setPlaying(located!.scene.game.game);
      if (located!.scene.game.game === "dice" || located!.scene.game.game === "vyuha") conch();
      return;
    }
    advance();
  }

  function continueScene() {
    uiTick();
    if (located!.scene.game) {
      setPlaying(located!.scene.game.game);
      return;
    }
    applyOutcome(located!.scene.outcome);
    markHistory(located!.scene.id);
    advance();
  }

  return (
    <div className="flex h-dvh flex-col bg-ink text-cream">
      <header className="z-20 shrink-0 border-b border-line bg-ink">
        <div className="mx-auto flex max-w-xl items-center justify-between gap-3 px-4 py-3">
          <div>
            <p className="font-display text-xl text-gold">Mahabharata</p>
            <p className="text-xs tracking-widest text-mute uppercase">
              {located.parva.sanskrit} · {located.chapter.title}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={save.audio ? "Silence the drone" : "Sound the drone"}
              className="flex size-9 items-center justify-center rounded-full border border-line"
              onClick={() => {
                unlockAudio();
                setAudio(!save.audio);
              }}
            >
              {save.audio ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
            </button>
            <Langs lang={save.lang} />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-xl min-h-0 flex-1 overflow-y-auto px-4 pt-5">
        <Meter
          dharma={save.dharma}
          army={save.army}
          astras={save.astras}
          allies={save.allies}
          kala={located.scene.kala}
          vows={save.vows}
        />
        {playing ? (
          <div className="scene-in mt-5">
            {playing === "diplomacy" ? <DiplomacyGame onDone={(o) => finishGame(o, "diplomacy")} /> : null}
            {playing === "dice" ? <DiceGame onDone={(o) => finishGame(o, "dice")} /> : null}
            {playing === "astra" ? <AstraGame onDone={(o) => finishGame(o, "astra")} /> : null}
            {playing === "vyuha" ? <VyuhaGame onDone={(o) => finishGame(o, "vyuha")} /> : null}
          </div>
        ) : (
          <article className="scene-in mt-5">
            <MangaStage key={located.scene.id} scene={located.scene} lang={save.lang} audio={save.audio} onReady={setReady} />
            {ready && finished ? (
              <p className="sticky bottom-0 mt-4 bg-ink py-3 text-sm text-gold">This book is told. The next act waits on the chronicle.</p>
            ) : ready && located.scene.choices?.length ? (
              <div className="sticky bottom-0 mt-4 space-y-2 bg-ink py-3">
                {located.scene.choices.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className="block w-full min-h-11 border border-line px-3 py-3 text-left text-sm hover:border-gold"
                    onClick={() => takeChoice(c)}
                  >
                    {lines(c.label, save.lang === "all" ? "en" : save.lang)[0]}
                  </button>
                ))}
              </div>
            ) : ready ? (
              <div className="sticky bottom-0 bg-ink py-3">
                <button type="button" className="min-h-11 bg-gold px-4 text-sm text-on-gold" onClick={continueScene}>
                  {located.scene.game ? "Enter" : "Continue"}
                </button>
              </div>
            ) : null}
          </article>
        )}
      </main>

      <nav className="z-20 grid shrink-0 grid-cols-3 border-t border-line bg-ink">
        <NavButton icon={BookOpen} label="Read" on={panel === null} onClick={() => setPanel(null)} />
        <NavButton icon={Map} label="Chronicle" on={panel === "map"} onClick={() => setPanel("map")} />
        <NavButton icon={Volume2} label="Field" on={panel === "field"} onClick={() => setPanel("field")} />
      </nav>

      {panel ? (
        <div className="fixed inset-0 z-30 flex items-end justify-center bg-ink/70 sm:items-center">
          <button type="button" aria-label="Close" className="absolute inset-0" onClick={() => setPanel(null)} />
          <div className="relative z-10 max-h-[80dvh] w-full max-w-xl overflow-y-auto border border-line bg-panel px-5 py-5">
            {panel === "map" ? (
              <ChronicleMap
                current={located.chapter.id}
                unlocked={save.unlocked}
                onJump={(id) => {
                  const cursor = actCursor(id);
                  if (!cursor) return;
                  goTo(cursor);
                  setPanel(null);
                }}
                onExport={() => setExportOpen((v) => !v)}
                exportOpen={exportOpen}
                dump={exportSave()}
                onReset={() => {
                  resetCampaign();
                  setPanel(null);
                }}
              />
            ) : (
              <Field
                onDrill={(id) => {
                  unlockAudio();
                  setDrill(true);
                  setPlaying(id);
                  setPanel(null);
                  if (id === "vyuha" || id === "astra") conch();
                }}
              />
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Gate({ booting, onEnter }: { booting: boolean; onEnter: () => void }) {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-ink px-6 text-center">
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-80"
        autoPlay
        muted
        loop
        playsInline
        poster="/chronicle/beam.jpg"
        src="/chronicle/beam.mp4"
      />
      <div className="absolute inset-0 bg-ink/50" />
      <h1 className="title-in relative font-display text-6xl leading-none text-gold">Mahabharata</h1>
      <p className="title-in relative mt-4 text-xs tracking-[0.35em] text-mute uppercase">Twenty acts</p>
      <button
        type="button"
        disabled={booting}
        onClick={onEnter}
        className="title-in relative mt-10 min-h-11 border border-gold px-6 py-3 text-xs tracking-widest text-gold uppercase"
      >
        {booting ? "Opening" : "Enter the chronicle"}
      </button>
    </div>
  );
}

function Langs({ lang }: { lang: Lang }) {
  const items: { id: Lang; label: string }[] = [
    { id: "sa", label: "स" },
    { id: "en", label: "E" },
    { id: "te", label: "తె" },
    { id: "all", label: "A" },
  ];
  return (
    <div className="flex gap-1">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          aria-pressed={lang === item.id}
          onClick={() => setLang(item.id)}
          className={
            "flex size-9 items-center justify-center rounded-full border text-sm " +
            (lang === item.id ? "border-gold bg-gold text-on-gold" : "border-line")
          }
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

function Meter({
  dharma,
  army,
  astras,
  allies,
  kala,
  vows,
}: {
  dharma: number;
  army: number;
  astras: string[];
  allies: string[];
  kala: number;
  vows: VowMark[];
}) {
  const pct = ((dharma + 100) / 200) * 100;
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs text-mute">
        <span>Adharma</span>
        <span className="text-gold">{stance(dharma)}</span>
        <span>Dharma</span>
      </div>
      <div className="relative h-1 bg-line">
        <span className="absolute top-1/2 left-1/2 h-2 w-px -translate-y-1/2 bg-mute" />
        <span className="absolute top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold" style={{ left: `${pct}%` }} />
      </div>
      <div className="mt-3">
        <div className="mb-1 flex justify-between text-xs tracking-widest text-mute uppercase">
          <span>Kala</span>
          <span className={kala > 60 ? "text-blood" : "text-gold"}>{kala}</span>
        </div>
        <div className="h-1 bg-line">
          <div className="h-full bg-blood" style={{ width: `${kala}%` }} />
        </div>
      </div>
      {vows.length ? (
        <ul className="mt-3 flex flex-wrap gap-2">
          {vows.map((vow) => (
            <li
              key={vow.id}
              className={
                "border px-2 py-1 text-xs tracking-wide " +
                (vow.state === "snap" ? "chain-snap border-line text-mute" : vow.state === "strain" ? "border-blood text-blood" : "border-gold text-gold")
              }
            >
              {vow.state === "snap" ? "Broken" : vow.state === "strain" ? "Straining" : "Bound"} · {vow.name}
            </li>
          ))}
        </ul>
      ) : null}
      <p className="mt-2 text-xs tracking-widest text-mute uppercase">
        {army} akshauhinis
        {allies.length ? ` · ${allies.join(", ")}` : ""}
        {astras.length ? ` · ${astras.join(", ")}` : ""}
      </p>
    </div>
  );
}

function NavButton({
  icon: Icon,
  label,
  on,
  onClick,
}: {
  icon: typeof BookOpen;
  label: string;
  on: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={"flex min-h-14 flex-col items-center justify-center gap-1 text-xs tracking-widest uppercase " + (on ? "text-gold" : "text-mute")}
    >
      <Icon className="size-4" strokeWidth={1.5} />
      {label}
    </button>
  );
}

function ChronicleMap({
  current,
  unlocked,
  onJump,
  onExport,
  exportOpen,
  dump,
  onReset,
}: {
  current: string;
  unlocked: number[];
  onJump: (id: string) => void;
  onExport: () => void;
  exportOpen: boolean;
  dump: string;
  onReset: () => void;
}) {
  return (
    <div>
      <h2 className="font-display text-3xl text-gold">Chronicle</h2>
      <ol className="mt-4">
        {ACT_SLOTS.map((act) => {
          const cursor = actCursor(act.id);
          const open = Boolean(cursor && unlocked.includes(act.parva));
          return (
            <li key={act.id} className="border-t border-line py-3">
              <button type="button" disabled={!open} onClick={() => onJump(act.id)} className="block w-full text-left disabled:opacity-60">
                <p className="text-xs tracking-widest text-mute uppercase">
                  Act {String(act.n).padStart(2, "0")}
                  {act.id === current ? " · here" : ""}
                </p>
                <p className="font-display text-2xl text-cream">{act.title}</p>
                <p className="text-sm text-mute">{act.blurb}</p>
                <p className="mt-1 text-xs tracking-widest text-gold uppercase">{open ? "Open" : "Not yet written"}</p>
              </button>
            </li>
          );
        })}
      </ol>
      <div className="mt-4 flex gap-2">
        <button type="button" className="min-h-11 border border-line px-3 text-sm" onClick={onExport}>
          Export save
        </button>
        <button type="button" className="min-h-11 border border-line px-3 text-sm text-mute" onClick={onReset}>
          Begin again
        </button>
      </div>
      {exportOpen ? (
        <textarea readOnly className="mt-3 h-32 w-full border border-line bg-ink p-2 text-xs text-cream" value={dump} />
      ) : null}
    </div>
  );
}

function Field({ onDrill }: { onDrill: (id: GameId) => void }) {
  return (
    <div>
      <h2 className="font-display text-3xl text-gold">Field</h2>
      <p className="mt-2 text-sm text-mute">
        Drills sit outside the telling. Astra and the vyuha wait for the forest and the war; you may practice them now.
      </p>
      <button type="button" className="mt-4 block w-full min-h-11 border border-line px-3 text-left" onClick={() => onDrill("astra")}>
        Astra trial
        <span className="mt-1 block text-xs text-mute">Timing at the gate. A weapon, if the strike is true.</span>
      </button>
      <button type="button" className="mt-2 block w-full min-h-11 border border-line px-3 text-left" onClick={() => onDrill("vyuha")}>
        One day at Kurukshetra
        <span className="mt-1 block text-xs text-mute">Answer Drona’s wheel.</span>
      </button>
    </div>
  );
}
