import type { Cursor, Parva } from "@/lib/engine/types";
import { ACT_SLOTS } from "./act-slots";
import { CATALOG } from "./catalog";
import { adiChapters } from "./01-adi";
import { sabhaChapters } from "./02-sabha";
import { vanaChapters } from "./03-vana";
import { udyogaChapters } from "./05-udyoga";
import { bhishmaChapters } from "./06-bhishma";
import { striChapters } from "./11-stri";
import { svargaChapters } from "./18-svarga";
import { adiLater } from "./acts-08-10";

const WRITTEN: Record<number, Parva["chapters"]> = {
  1: [...adiChapters, ...adiLater],
  2: sabhaChapters,
  3: vanaChapters,
  5: udyogaChapters,
  6: bhishmaChapters,
  11: striChapters,
  18: svargaChapters,
};

export const PARVAS: Parva[] = CATALOG.map((meta) => ({
  ...meta,
  chapters: WRITTEN[meta.id] ?? [],
}));

export { ACT_SLOTS };

export function parvaById(id: number) {
  return PARVAS.find((p) => p.id === id);
}

export function findScene(cursor: Cursor) {
  const parva = parvaById(cursor.parva);
  const chapter = parva?.chapters[cursor.chapter];
  const scene = chapter?.scenes[cursor.scene];
  if (!parva || !chapter || !scene) return null;
  return { parva, chapter, scene };
}

export function actCursor(id: string): Cursor | null {
  const slot = ACT_SLOTS.find((act) => act.id === id);
  if (!slot) return null;
  const parva = parvaById(slot.parva);
  const chapter = parva?.chapters.findIndex((item) => item.id === id) ?? -1;
  if (!parva || chapter < 0) return null;
  return { parva: parva.id, chapter, scene: 0 };
}
