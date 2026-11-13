export type Lang = "sa" | "en" | "te" | "all";

export type Line = { sa: string; en: string; te: string };

export type Emotion = "still" | "wrath" | "grief" | "calm" | "sly";

export type Voice = "whisper" | "speak" | "boom";

export type Sakuga = "vastraharan" | "virata" | "wheel" | "pyre";

export type VowState = "lock" | "strain" | "snap";

export type GameId = "diplomacy" | "dice" | "astra" | "vyuha";

export type Outcome = {
  dharma?: number;
  astras?: string[];
  allies?: string[];
  army?: number;
};

export type Choice = {
  id: string;
  label: Line;
  note?: Line;
  outcome?: Outcome;
};

export type GameTrigger = {
  game: GameId;
  title: Line;
};

export type Rite = "vow" | "seal" | "shatter" | "silk" | "hair" | "black" | "cosmos" | "ash" | "amber";

export type Air = "lac" | "void" | "mist";

export type Beat = {
  speaker?: string;
  emotion?: Emotion;
  voice?: Voice;
  shake?: boolean;
  line: Line;
  intent?: Line;
  /** Sensory override. The stage paints it only while this beat is the one on screen. */
  rite?: Rite;
  /** The chronicle will not move on until the reader has held this long. */
  holdMs?: number;
};

export type VowMark = {
  id: string;
  name: string;
  state: VowState;
};

export type Scene = {
  id: string;
  speaker?: string;
  emotion?: Emotion;
  place?: string;
  image?: string;
  video?: string;
  /** 0–100. How close Hastinapura is to erasing itself. */
  kala: number;
  beats: Beat[];
  vows?: VowMark[];
  /** House of lac: the walls sweat, and every tap is a small shake. */
  air?: Air;
  /** Full-screen climax. vastraharan, virata, and wheel are reserved for acts 13, 17, and the wheel-day. */
  sakuga?: Sakuga;
  choices?: Choice[];
  game?: GameTrigger;
  outcome?: Outcome;
};

export type Chapter = {
  id: string;
  title: string;
  scenes: Scene[];
};

export type Parva = {
  id: number;
  key: string;
  title: string;
  sanskrit: string;
  blurb: string;
  chapters: Chapter[];
};

export type Cursor = { parva: number; chapter: number; scene: number };

export type HistoryMark = { sceneId: string; choiceId?: string; game?: GameId };

export type Campaign = {
  v: 1;
  cursor: Cursor;
  dharma: number;
  astras: string[];
  allies: string[];
  army: number;
  unlocked: number[];
  history: HistoryMark[];
  vows: VowMark[];
  intro: boolean;
  lang: Lang;
  audio: boolean;
};
