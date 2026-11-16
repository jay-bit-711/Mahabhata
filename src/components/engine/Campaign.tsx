import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
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
  markTrial,
  resetCampaign,
  setAudio,
  setLang,
  useCampaign,
} from "@/lib/engine/store";
import type { Choice, GameId, Lang, Line, Outcome, VowMark } from "@/lib/engine/types";
import { AstraGame, DiceGame, DiplomacyGame, VyuhaGame } from "./games";
import { MangaStage } from "./MangaStage";
import { Trial } from "./Trial";
import { rankName } from "@/data/parvas/trials";

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
  const [panel, setPanel] = useState<"map" | null>(null);
  const [playing, setPlaying] = useState<GameId | null>(null);
  const [drill, setDrill] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [trialId, setTrialId] = useState<string | null>(null);

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
    if (!drill) leaveAfter(located);
    uiTick();
  }

  function leaveAfter(where: typeof located) {
    if (!where) return;
    const end = save.cursor.scene === where.chapter.scenes.length - 1;
    if (end && !save.trials.includes(where.chapter.id)) {
      setTrialId(where.chapter.id);
      return;
    }
    advance();
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
    leaveAfter(located);
  }

  function continueScene() {
    uiTick();
    if (located!.scene.game) {
      setPlaying(located!.scene.game.game);
      return;
    }
    applyOutcome(located!.scene.outcome);
    markHistory(located!.scene.id);
    leaveAfter(located);
  }

  const act = ACT_SLOTS.find((slot) => slot.id === located.chapter.id);
  const rank = rankName(save.trials.length);
  const chapterEnd = save.cursor.scene === located.chapter.scenes.length - 1;
  const needsTrial = chapterEnd && !save.trials.includes(located.chapter.id);
  const langMark = save.lang === "sa" ? "स" : save.lang === "te" ? "తె" : save.lang === "all" ? "III" : "E";
  const nextLang: Lang = save.lang === "sa" ? "en" : save.lang === "en" ? "te" : save.lang === "te" ? "all" : "sa";

  return (
    <div className="relative h-dvh overflow-hidden bg-ink text-cream">
      <div className="kala-edge" style={{ height: `${located.scene.kala}%` }} />
      <header className="pointer-events-none absolute inset-x-0 top-0 z-40 flex items-start justify-between px-5 pt-4">
        <button type="button" className="pointer-events-auto text-left" onClick={() => setPanel(panel === "map" ? null : "map")}>
          <p className="text-[10px] tracking-[0.35em] text-gold uppercase">{act ? String(act.n).padStart(2, "0") : "—"}</p>
          <p className="font-display text-lg leading-none text-cream">{located.chapter.title}</p>
          <p className="mt-1 text-[10px] tracking-[0.28em] text-mute uppercase">
            {save.lang === "sa" ? rank.sa : save.lang === "te" ? rank.te : rank.en} · {save.trials.length}/20
          </p>
        </button>
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            type="button"
            aria-label={save.audio ? "Silence" : "Sound"}
            className="flex size-9 items-center justify-center text-mute"
            onClick={() => {
              unlockAudio();
              setAudio(!save.audio);
            }}
          >
            {save.audio ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
          </button>
          <button
            type="button"
            aria-label="Language"
            className="flex size-9 items-center justify-center font-display text-lg text-gold"
            onClick={() => setLang(nextLang)}
          >
            {langMark}
          </button>
        </div>
      </header>

      <main className="h-dvh">
        {playing ? (
          <div className="scene-in mx-auto flex h-dvh max-w-xl flex-col justify-end px-6 pb-16">
            {playing === "diplomacy" ? <DiplomacyGame onDone={(o) => finishGame(o, "diplomacy")} /> : null}
            {playing === "dice" ? <DiceGame onDone={(o) => finishGame(o, "dice")} /> : null}
            {playing === "astra" ? <AstraGame onDone={(o) => finishGame(o, "astra")} /> : null}
            {playing === "vyuha" ? <VyuhaGame onDone={(o) => finishGame(o, "vyuha")} /> : null}
          </div>
        ) : (
          <article className="scene-in h-dvh">
            <MangaStage key={located.scene.id} scene={located.scene} lang={save.lang} audio={save.audio} onReady={setReady} />
            {ready && finished ? (
              <p className="fixed inset-x-0 bottom-0 z-40 px-6 pb-10 text-sm text-gold">This book is told.</p>
            ) : ready && located.scene.choices?.length ? (
              <div className="fixed inset-x-0 bottom-0 z-40 space-y-2 px-6 pb-10">
                {located.scene.choices.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className="block w-full py-3 text-left font-display text-2xl leading-tight text-cream"
                    onClick={() => takeChoice(c)}
                  >
                    {lines(c.label, save.lang === "all" ? "en" : save.lang)[0]}
                  </button>
                ))}
              </div>
            ) : ready ? (
              <button type="button" className="fixed inset-x-0 bottom-0 z-40 px-6 pb-8 text-left text-[10px] tracking-[0.35em] text-gold uppercase" onClick={continueScene}>
                {located.scene.game ? "Enter" : needsTrial ? "Trial" : "Onward"}
              </button>
            ) : null}
          </article>
        )}
      </main>

      {trialId ? (
        <Trial
          actId={trialId}
          lang={save.lang}
          onPass={() => {
            markTrial(trialId);
            setTrialId(null);
            advance();
          }}
          onLeave={() => {
            setTrialId(null);
            advance();
          }}
        />
      ) : null}

      {panel === "map" ? (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-ink px-6 py-8">
          <button type="button" className="text-[10px] tracking-[0.35em] text-gold uppercase" onClick={() => setPanel(null)}>
            Close
          </button>
          <ChronicleMap
            current={located.chapter.id}
            unlocked={save.unlocked}
            vows={save.vows}
            passed={save.trials}
            dharma={save.dharma}
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
            onDrill={(id) => {
              unlockAudio();
              setDrill(true);
              setPlaying(id);
              setPanel(null);
              if (id === "vyuha" || id === "astra") conch();
            }}
          />
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
      <h1 className="title-in relative font-display text-7xl leading-none text-gold">Mahabharata</h1>
      <button
        type="button"
        disabled={booting}
        onClick={onEnter}
        className="title-in relative mt-12 text-[10px] tracking-[0.4em] text-cream uppercase"
      >
        {booting ? "Opening" : "Enter"}
      </button>
    </div>
  );
}

const PEOPLE = [
  { name: "Bhishma", line: "Bought a throne with a life, then guarded the wrong army with the receipt." },
  { name: "Amba", line: "The vow could not marry her and would not free her. She comes back as the end of it." },
  { name: "Gandhari", line: "Closed her eyes because his were closed. Later she walks a field of sons." },
  { name: "Shakuni", line: "Holds the door and smiles like an uncle. The man's own honor walks in." },
  { name: "Karna", line: "Friendship over the crown, then over the armor, then over his life." },
  { name: "Kunti", line: "One sentence splits a wife into five. Both the lie and the tear are true." },
  { name: "Draupadi", line: "Not the cause. The fruit they blame. She keeps the faces." },
  { name: "Krishna", line: "Not here to stop the fire. Here to stand where it has to burn." },
  { name: "Yudhishthira", line: "Coward is the crueler word. That is how the dice own him." },
  { name: "Arjuna", line: "The bow hits the floor. What remains is grief, asking to be called mercy." },
  { name: "Duryodhana", line: "The laugh in a hall that is not a floor." },
  { name: "The dog", line: "Not dharma. The one who does not leave." },
];

function ChronicleMap({
  current,
  unlocked,
  vows,
  passed,
  dharma,
  onJump,
  onExport,
  exportOpen,
  dump,
  onReset,
  onDrill,
}: {
  current: string;
  unlocked: number[];
  vows: VowMark[];
  passed: string[];
  dharma: number;
  onJump: (id: string) => void;
  onExport: () => void;
  exportOpen: boolean;
  dump: string;
  onReset: () => void;
  onDrill: (id: GameId) => void;
}) {
  return (
    <div className="mt-8">
      <p className="text-[10px] tracking-[0.35em] text-mute uppercase">{stance(dharma)}</p>
      <ol className="mt-6">
        {ACT_SLOTS.map((act) => {
          const cursor = actCursor(act.id);
          const open = Boolean(cursor && unlocked.includes(act.parva));
          const here = act.id === current;
          return (
            <li key={act.id}>
              <button type="button" disabled={!open} onClick={() => onJump(act.id)} className="block w-full py-3 text-left disabled:opacity-40">
                <p className={"font-display text-3xl leading-none " + (here ? "text-gold" : "text-cream")}>{act.title}</p>
                <p className="mt-1 text-sm text-mute">
                  {passed.includes(act.id) ? "Heard. " : ""}
                  {act.blurb}
                </p>
              </button>
            </li>
          );
        })}
      </ol>
      <ul className="mt-10 space-y-4">
        {PEOPLE.map((person) => (
          <li key={person.name}>
            <p className="font-display text-2xl text-cream">{person.name}</p>
            <p className="text-sm text-mute">{person.line}</p>
          </li>
        ))}
      </ul>
      {vows.length ? (
        <ul className="mt-8 space-y-1">
          {vows.map((vow) => (
            <li key={vow.id} className={"text-sm " + (vow.state === "snap" ? "chain-snap text-mute" : "text-gold")}>
              {vow.name}
            </li>
          ))}
        </ul>
      ) : null}
      <div className="mt-10 flex gap-6 text-sm text-mute">
        <button type="button" onClick={() => onDrill("dice")}>
          Dice
        </button>
        <button type="button" onClick={() => onDrill("astra")}>
          Astra
        </button>
        <button type="button" onClick={() => onDrill("vyuha")}>
          Vyuha
        </button>
        <button type="button" onClick={onExport}>
          Save
        </button>
        <button type="button" onClick={onReset}>
          Begin again
        </button>
      </div>
      {exportOpen ? <textarea readOnly className="mt-4 h-28 w-full bg-ink text-xs text-cream" value={dump} /> : null}
    </div>
  );
}
