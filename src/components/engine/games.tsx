import { useEffect, useState, type ReactNode } from "react";
import type { Outcome } from "@/lib/engine/types";
import { uiTick } from "@/lib/engine/audio";

function Shell({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border border-line bg-panel p-4">
      <p className="text-xs tracking-widest text-gold uppercase">{kicker}</p>
      <h2 className="mt-1 font-display text-3xl text-cream">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Done({ label, onDone, outcome }: { label: string; onDone: (o: Outcome) => void; outcome: Outcome }) {
  return (
    <button type="button" className="mt-4 min-h-11 bg-gold px-4 text-sm text-on-gold" onClick={() => onDone(outcome)}>
      {label}
    </button>
  );
}

const KINGDOMS = [
  { id: "magadha", name: "Magadha", need: "force", hint: "Moves only for force" },
  { id: "chedi", name: "Chedi", need: "kin", hint: "Moves for kinship" },
  { id: "matsya", name: "Matsya", need: "honor", hint: "Moves for a clean vow" },
] as const;

const VOICES = [
  { id: "force", name: "Bhima", line: "Force" },
  { id: "kin", name: "Krishna", line: "Kinship" },
  { id: "honor", name: "Sahadeva", line: "A clean vow" },
] as const;

export function DiplomacyGame({ onDone }: { onDone: (o: Outcome) => void }) {
  const [pick, setPick] = useState<Record<string, string>>({});
  const [locked, setLocked] = useState(false);
  const allies = KINGDOMS.filter((k) => pick[k.id] === k.need).map((k) => k.name);
  return (
    <Shell kicker="Sabha" title="Send the envoys">
      <p className="text-sm leading-relaxed text-mute">One voice to each court. A mismatch is a wasted journey.</p>
      <ul className="mt-4 space-y-3">
        {KINGDOMS.map((k) => (
          <li key={k.id} className="border border-line p-3">
            <p className="text-cream">{k.name}</p>
            <p className="text-xs text-mute">{k.hint}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {VOICES.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  disabled={locked}
                  onClick={() => {
                    uiTick();
                    setPick((p) => {
                      const next = { ...p, [k.id]: v.id };
                      for (const key of Object.keys(next)) {
                        if (key !== k.id && next[key] === v.id) delete next[key];
                      }
                      return next;
                    });
                  }}
                  className={
                    "min-h-11 border px-3 text-sm " +
                    (pick[k.id] === v.id ? "border-gold bg-gold text-on-gold" : "border-line text-cream")
                  }
                >
                  {v.name}
                  <span className="block text-xs opacity-80">{v.line}</span>
                </button>
              ))}
            </div>
          </li>
        ))}
      </ul>
      {!locked ? (
        <button
          type="button"
          className="mt-4 min-h-11 bg-gold px-4 text-sm text-on-gold"
          onClick={() => setLocked(true)}
        >
          Dispatch
        </button>
      ) : (
        <>
          <p className="mt-4 text-sm text-gold">
            {allies.length ? `Sworn: ${allies.join(", ")}` : "No court swore."}
          </p>
          <Done label="Return" onDone={onDone} outcome={{ allies, dharma: allies.length * 4 }} />
        </>
      )}
    </Shell>
  );
}

export function DiceGame({ onDone }: { onDone: (o: Outcome) => void }) {
  const [round, setRound] = useState(0);
  const [you, setYou] = useState(0);
  const [him, setHim] = useState(0);
  const [last, setLast] = useState<string>("");
  const [folded, setFolded] = useState(false);
  const done = folded || round >= 3;

  function roll() {
    uiTick();
    const yours = 1 + Math.floor(Math.random() * 6);
    const his = Math.random() < 0.72 ? Math.max(yours, 1 + Math.floor(Math.random() * 6)) : 1 + Math.floor(Math.random() * 6);
    const win = yours > his;
    setYou((n) => n + (win ? 1 : 0));
    setHim((n) => n + (win ? 0 : 1));
    setLast(`You ${yours} · Shakuni ${his}`);
    setRound((n) => n + 1);
  }

  const outcome: Outcome = folded
    ? { dharma: 8, army: -1 }
    : you > him
      ? { dharma: 6, army: 1 }
      : { dharma: -18, army: -2 };

  return (
    <Shell kicker="Dyuta" title="Bone dice">
      <p className="text-sm text-mute">Three throws. His dice prefer him. Folding costs an army and keeps a little dharma.</p>
      <p className="mt-3 font-display text-4xl text-cream">
        {you} <span className="text-mute">/</span> {him}
      </p>
      <p className="text-xs tracking-widest text-gold uppercase">{last || `Throw ${Math.min(round + 1, 3)}`}</p>
      {!done ? (
        <div className="mt-4 flex gap-2">
          <button type="button" className="min-h-11 bg-gold px-4 text-sm text-on-gold" onClick={roll}>
            Throw
          </button>
          <button type="button" className="min-h-11 border border-line px-4 text-sm" onClick={() => setFolded(true)}>
            Fold
          </button>
        </div>
      ) : (
        <>
          <p className="mt-4 text-sm text-cream">{folded ? "You left the cloth." : you > him ? "The hall goes quiet." : "The hall laughs."}</p>
          <Done label="Face the hall" onDone={onDone} outcome={outcome} />
        </>
      )}
    </Shell>
  );
}

export function AstraGame({ onDone }: { onDone: (o: Outcome) => void }) {
  const [pos, setPos] = useState(0);
  const [dir, setDir] = useState(1);
  const [hits, setHits] = useState(0);
  const [miss, setMiss] = useState(0);
  const done = hits >= 3 || miss >= 4;

  useEffect(() => {
    if (done) return;
    const id = window.setInterval(() => {
      setPos((p) => {
        const n = p + dir * 4;
        if (n >= 100) {
          setDir(-1);
          return 100;
        }
        if (n <= 0) {
          setDir(1);
          return 0;
        }
        return n;
      });
    }, 30);
    return () => window.clearInterval(id);
  }, [dir, done]);

  function tap() {
    uiTick();
    if (pos > 42 && pos < 58) setHits((n) => n + 1);
    else setMiss((n) => n + 1);
  }

  const astra = hits >= 3 ? "Pashupatastra" : hits === 2 ? "Brahmastra" : null;
  return (
    <Shell kicker="Tapas" title="The gate of the weapon">
      <p className="text-sm text-mute">Strike when the ember sits in the gold gate. Three true strikes.</p>
      <div className="relative mt-4 h-3 bg-line">
        <span className="absolute inset-y-0 left-[42%] w-[16%] bg-gold/40" />
        <span className="absolute top-1/2 size-3 -translate-y-1/2 rounded-full bg-gold" style={{ left: `${pos}%` }} />
      </div>
      <p className="mt-2 text-xs tracking-widest text-mute uppercase">
        True {hits} · Missed {miss}
      </p>
      {!done ? (
        <button type="button" className="mt-4 min-h-11 bg-gold px-4 text-sm text-on-gold" onClick={tap}>
          Strike
        </button>
      ) : (
        <>
          <p className="mt-4 text-sm text-gold">{astra ? `${astra} answers.` : "The god is silent."}</p>
          <Done label="Bow and return" onDone={onDone} outcome={astra ? { astras: [astra], dharma: 8 } : { dharma: -4 }} />
        </>
      )}
    </Shell>
  );
}

const FORMS = [
  { id: "chakra", name: "Chakravyuha", beats: "krauncha" },
  { id: "garuda", name: "Garuda", beats: "chakra" },
  { id: "krauncha", name: "Krauncha", beats: "garuda" },
] as const;

export function VyuhaGame({ onDone }: { onDone: (o: Outcome) => void }) {
  const enemy = "chakra";
  const [form, setForm] = useState<string | null>(null);
  const [hero, setHero] = useState<number | null>(null);
  const locked = form !== null && hero !== null && hero === 12;
  const ready = form !== null && hero !== null;
  const counter = FORMS.find((f) => f.beats === enemy);
  const win = form === counter?.id && hero === 12;

  return (
    <Shell kicker="Kurukshetra · Day drill" title="Answer the wheel">
      <p className="text-sm text-mute">Drona has set the Chakravyuha. Pick the counter-form, then set Arjuna on the center cell.</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {FORMS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => {
              uiTick();
              setForm(f.id);
            }}
            className={"min-h-11 border px-3 text-sm " + (form === f.id ? "border-gold bg-gold text-on-gold" : "border-line")}
          >
            {f.name}
          </button>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-5 gap-1">
        {Array.from({ length: 25 }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setHero(i)}
            className={
              "h-9 border text-xs " +
              (hero === i ? "border-gold bg-gold text-on-gold" : i === 12 ? "border-gold/50" : "border-line")
            }
          >
            {hero === i ? "A" : ""}
          </button>
        ))}
      </div>
      {ready ? (
        <>
          <p className="mt-3 text-sm text-cream">
            {win ? "The wheel opens." : locked ? "Right ground, wrong shape." : "The formation does not answer."}
          </p>
          <Done label="Close the day" onDone={onDone} outcome={{ army: win ? 1 : -1, dharma: win ? 4 : -2 }} />
        </>
      ) : null}
    </Shell>
  );
}
