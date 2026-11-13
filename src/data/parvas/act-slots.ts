export type ActSlot = {
  n: number;
  parva: number;
  id: string;
  title: string;
  blurb: string;
  sakuga?: "vastraharan" | "virata" | "wheel" | "pyre";
};

/** Locked 20-act order. Written chapters must use these ids. */
export const ACT_SLOTS: ActSlot[] = [
  { n: 1, parva: 1, id: "vow", title: "The Terrible Vow", blurb: "Devavrata buys a throne with his life." },
  { n: 2, parva: 1, id: "amba", title: "Fire and Ashes of Amba", blurb: "A woman the vow could not marry, and would not free." },
  { n: 3, parva: 1, id: "throne", title: "The Blind Throne", blurb: "A brother passed over. A wife who closes her eyes. An uncle who does not." },
  { n: 4, parva: 1, id: "rivals", title: "Rivals of Fate", blurb: "Two archers. One question of birth. A crown given in public." },
  { n: 5, parva: 1, id: "poison", title: "First Blood and Poison", blurb: "Hatred learns it can be sweet." },
  { n: 6, parva: 1, id: "lac", title: "The House of Lac", blurb: "A welcome built to burn.", sakuga: "pyre" },
  { n: 7, parva: 1, id: "fireborn", title: "Fire-Born", blurb: "She rises from the altar already owed a war." },
  { n: 8, parva: 1, id: "strategist", title: "Enter the Strategist", blurb: "Krishna arrives, already finished with the board." },
  { n: 9, parva: 1, id: "matsya", title: "The Matsya Yantra", blurb: "A fish, an eye, and a hall of kings who came too late." },
  { n: 10, parva: 1, id: "five", title: "Five Husbands, One Queen", blurb: "A mother's word. A marriage no code prepared for." },
  { n: 11, parva: 2, id: "maya", title: "Maya Sabha and the Laugh", blurb: "An illusion palace, and the laugh that starts the war." },
  { n: 12, parva: 2, id: "trap", title: "Dharma as a Trap", blurb: "Shakuni aims Yudhishthira's honor at his own house." },
  { n: 13, parva: 2, id: "hair", title: "The Unbound Hair", blurb: "The court chooses a technicality. She chooses a vow.", sakuga: "vastraharan" },
  { n: 14, parva: 3, id: "exile", title: "Exile and the Divine Arsenal", blurb: "Thirteen years. A weapon from a god. Armor given away." },
  { n: 15, parva: 5, id: "envoy", title: "The Peace Envoy", blurb: "Five villages. A refusal. A glimpse of what is coming." },
  { n: 16, parva: 6, id: "dust", title: "Lines in the Dust", blurb: "Rules of war, and a grandsire leading the wrong army." },
  { n: 17, parva: 6, id: "gita", title: "Virata Rupam and the Gita", blurb: "Time stops. The cosmos opens its mouth.", sakuga: "virata" },
  { n: 18, parva: 6, id: "titans", title: "The Fall of Titans", blurb: "Bhishma, Abhimanyu, Drona, Karna, Duryodhana.", sakuga: "wheel" },
  { n: 19, parva: 11, id: "curse", title: "A Mother's Curse", blurb: "Gandhari walks the field. Krishna accepts the price." },
  { n: 20, parva: 18, id: "ascent", title: "The Final Ascent", blurb: "A dog, a heaven, a hell, and the meaning of the word." },
];
