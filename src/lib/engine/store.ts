import { useSyncExternalStore } from "react";
import { PARVAS, findScene } from "@/data/parvas";
import type { Campaign, Cursor, GameId, Outcome, VowMark } from "./types";

const KEY = "mb-campaign-v1";

function writtenParvas() {
  return PARVAS.filter((parva) => parva.chapters.length > 0).map((parva) => parva.id);
}

export const EMPTY: Campaign = {
  v: 1,
  cursor: { parva: 1, chapter: 0, scene: 0 },
  dharma: 0,
  astras: [],
  allies: [],
  army: 7,
  unlocked: writtenParvas(),
  history: [],
  vows: [],
  intro: true,
  lang: "all",
  audio: false,
  trials: [],
};

let state: Campaign = EMPTY;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function persist() {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function hydrate() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as Partial<Campaign>;
    state = {
      ...EMPTY,
      ...parsed,
      cursor: parsed.cursor ?? EMPTY.cursor,
      astras: parsed.astras ?? [],
      allies: parsed.allies ?? [],
      unlocked: [...new Set([...(parsed.unlocked ?? []), ...writtenParvas()])],
      history: parsed.history ?? [],
      vows: parsed.vows ?? [],
      trials: parsed.trials ?? [],
    };
    if (!findScene(state.cursor)) state = { ...state, cursor: EMPTY.cursor, intro: true };
    emit();
  } catch {
    state = EMPTY;
  }
}

export function getCampaign() {
  return state;
}

export function useCampaign() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    getCampaign,
    getCampaign,
  );
}

function patch(next: Partial<Campaign>) {
  state = { ...state, ...next };
  persist();
  emit();
}

export function bindVows(marks: VowMark[]) {
  if (!marks.length) return;
  const map = new Map(state.vows.map((v) => [v.id, v]));
  for (const mark of marks) map.set(mark.id, mark);
  state = { ...state, vows: [...map.values()] };
  persist();
  emit();
}

export function applyOutcome(outcome?: Outcome) {
  if (!outcome) return;
  state = {
    ...state,
    dharma: Math.max(-100, Math.min(100, state.dharma + (outcome.dharma ?? 0))),
    army: Math.max(0, state.army + (outcome.army ?? 0)),
    astras: [...new Set([...state.astras, ...(outcome.astras ?? [])])],
    allies: [...new Set([...state.allies, ...(outcome.allies ?? [])])],
  };
  persist();
  emit();
}

export function setLang(lang: Campaign["lang"]) {
  patch({ lang });
}

export function setAudio(audio: boolean) {
  patch({ audio });
}

export function enterChronicle() {
  patch({ intro: false });
}

export function markHistory(sceneId: string, choiceId?: string, game?: GameId) {
  state = { ...state, history: [...state.history, { sceneId, choiceId, game }] };
  persist();
  emit();
}

export function goTo(cursor: Cursor) {
  const parva = PARVAS.find((p) => p.id === cursor.parva);
  if (!parva || !state.unlocked.includes(parva.id) || parva.chapters.length === 0) return;
  patch({ cursor, intro: false });
}

function nextCursor(cursor: Cursor): { cursor: Cursor; finishedParva: boolean } | null {
  const parva = PARVAS.find((p) => p.id === cursor.parva);
  if (!parva) return null;
  const chapter = parva.chapters[cursor.chapter];
  if (!chapter) return null;
  if (cursor.scene < chapter.scenes.length - 1) {
    return { cursor: { ...cursor, scene: cursor.scene + 1 }, finishedParva: false };
  }
  if (cursor.chapter < parva.chapters.length - 1) {
    return { cursor: { parva: cursor.parva, chapter: cursor.chapter + 1, scene: 0 }, finishedParva: false };
  }
  return { cursor, finishedParva: true };
}

export function markTrial(id: string) {
  if (state.trials.includes(id)) return;
  patch({ trials: [...state.trials, id] });
}

export function advance() {
  const step = nextCursor(state.cursor);
  if (!step) return;
  if (step.finishedParva) {
    const next = PARVAS.find((parva) => parva.id > state.cursor.parva && parva.chapters.length > 0);
    const unlocked = next && !state.unlocked.includes(next.id) ? [...state.unlocked, next.id] : state.unlocked;
    if (next) {
      patch({ unlocked, cursor: { parva: next.id, chapter: 0, scene: 0 } });
      return;
    }
    patch({ unlocked });
    return;
  }
  patch({ cursor: step.cursor });
}

export function exportSave() {
  return JSON.stringify(state, null, 2);
}

export function resetCampaign() {
  state = { ...EMPTY, lang: state.lang };
  persist();
  emit();
}
