import { useState } from "react";
import { TRIALS } from "@/data/parvas/trials";
import type { Lang, Line } from "@/lib/engine/types";

function face(text: Line, lang: Lang) {
  if (lang === "te") return text.te;
  if (lang === "sa") return text.sa;
  return text.en;
}

export function Trial({
  actId,
  lang,
  onPass,
  onLeave,
}: {
  actId: string;
  lang: Lang;
  onPass: () => void;
  onLeave: () => void;
}) {
  const questions = TRIALS[actId] ?? [];
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const q = questions[index];

  if (!q || questions.length === 0) return null;

  function miss() {
    if (index + 1 >= questions.length) {
      setDone(true);
      return;
    }
    setWrong(null);
    setIndex((i) => i + 1);
  }

  function pick(n: number) {
    if (wrong !== null || done) return;
    if (n !== q.n) {
      setWrong(n);
      return;
    }
    const nextScore = score + 1;
    if (index + 1 >= questions.length) {
      setScore(nextScore);
      setDone(true);
      return;
    }
    setScore(nextScore);
    setIndex((i) => i + 1);
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-ink px-6 py-10 text-cream">
      <p className="text-[10px] tracking-[0.35em] text-gold uppercase">
        {index + 1} / {questions.length}
      </p>
      <h2 className="mt-4 max-w-xl font-display text-4xl leading-tight">{face(q.ask, lang)}</h2>
      <div className="mt-8 max-w-xl">
        {q.options.map((option, n) => (
          <button
            key={option.en}
            type="button"
            className={"block w-full py-3 text-left font-display text-2xl " + (wrong === n ? "text-mute line-through" : "text-cream")}
            onClick={() => pick(n)}
          >
            {face(option, lang)}
          </button>
        ))}
      </div>
      {done ? (
        <div className="mt-10">
          {score >= 2 ? (
            <button type="button" className="text-[10px] tracking-[0.35em] text-gold uppercase" onClick={onPass}>
              Passed. Onward
            </button>
          ) : (
            <div className="flex gap-6">
              <button
                type="button"
                className="text-[10px] tracking-[0.35em] text-gold uppercase"
                onClick={() => {
                  setIndex(0);
                  setScore(0);
                  setWrong(null);
                  setDone(false);
                }}
              >
                Again
              </button>
              <button type="button" className="text-[10px] tracking-[0.35em] text-mute uppercase" onClick={onLeave}>
                Leave it
              </button>
            </div>
          )}
        </div>
      ) : wrong !== null ? (
        <button type="button" className="mt-8 text-[10px] tracking-[0.35em] text-mute uppercase" onClick={miss}>
          Not that
        </button>
      ) : null}
    </div>
  );
}
