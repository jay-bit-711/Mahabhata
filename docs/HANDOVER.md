# Mahabharatam — handover

Written 14 Nov 2026. Live commit at the time of this note: `9894421`.
Site: [mahabhatam.vercel.app](https://mahabhatam.vercel.app/).
Repo: [github.com/jay-bit-711/Mahabhata](https://github.com/jay-bit-711/Mahabhata).
Mac desk: `/Users/jay/Desktop/Mahabharatam`.

This file is the map from the original vision to what is on the screen, and what is still between those two. It is for the founder and for the next person, human or model, who opens the repo cold.

## The vision

A Mahabharata that is yours. Not the 3-hour serial and not the 300-hour reading. A premium web experience a person enters the way they enter a Rajamouli frame or a living manga: short, visual, and impossible to mistake for a textbook.

What it has to be, once it is finished:

- Your visual language, not Amar Chitra Katha and not a stock epic template.
- Sanskrit, English, and Telugu on the same beat, switchable, and able to sit side by side so someone can learn by comparing.
- Free to read. A gift, if it exists, is hidden. UPI `jayanthedara1@ybl`. Not on the first screen.
- A moral thriller, not a quiz. Rigid personal dharma is not enough when it keeps a rotten house standing. Krishna plays one side of the board. Shakuni plays the other. Time is already running.
- The feeling of One Piece’s scale and Vacation.inc’s restraint. Dark, gold, quiet, then a blow.
- Progress that belongs to the reader: they leave, they come back, they are still on the mountain.

The working name of the form is a cinematic manga. Twenty acts. A person should be able to finish the telling. Five scenes should stop the thumb.

## Where it stands

The spine is playable. The feeling is not finished.

| | |
| --- | --- |
| Structure | About three quarters. Twenty acts run from the vow to the dog. |
| Sensation | About a third. Five peaks have rites. Almost everything else is the same four pictures and the same type. |
| Scholarship | Not started. Telugu and Sanskrit are readable drafts, not a scholar’s pass. |
| The full epic | Not the aim of this build. This is a telling, not all 18 parvas shloka by shloka. |

GitHub `main` and Vercel are the same commit when a deploy of that commit is Ready. The Mac matches only after `git pull`. This file lives in `docs/`, which git keeps and Vercel does not upload.

## What a reader can do today

Open the site. Pass the gate. Read a beat. Tap to the next one. Switch `सं` / `En` / `తె`. Hold a line to see what the speaker will not say. That hold is Intent, the Divya-Drishti.

A clock called Kala rises toward the war. Vows lock, strain, and snap. Choices move a dharma score. The browser remembers the page, the score, and the vows. Nothing of the reader’s is stored on a server.

The Chronicle map jumps all twenty acts.

Five scenes do not behave like the others:

| Act | Scene to open | What the screen does |
| --- | --- | --- |
| 1 The Terrible Vow | The celibacy line | The sky goes dark. The drone falls. `BHISHMA` is drawn stroke by stroke. Hold, or the page will not move. |
| 6 The House of Lac | Vidura’s last line | The walls sweat amber. Every tap shakes. The tunnel is unreadable until the hand stays down. |
| 13 The Unbound Hair | The pull | The frame breaks into crimson. Silk does not end. Hair fills the glass. Hold, or her vow does not lock. |
| 17 Virata Rupam | The bow, then the form | Starless black. One heartbeat. Then a mandala, and the line is gold leaf: *Time am I, world-destroyer…* Hold. |
| 20 The Final Ascent | The falls, then the gate | White-grey mist. The fallen lines go to ash. He refuses heaven. The only warm thing left is the dog. Hold. |

## How the thing is built

TanStack Start. The screen never contains the story. The story is data.

| Path | Role |
| --- | --- |
| `src/data/parvas/act-slots.ts` | The locked list of 20 acts. A chapter `id` must match a slot. |
| `src/data/parvas/*.ts` | The acts, grouped by parva. |
| `src/components/engine/MangaStage.tsx` | Tap, hold, Intent, and the rites. |
| `src/components/engine/Campaign.tsx` | The shell, the map, dharma, Kala, the continue bar. |
| `src/components/engine/games.tsx` | Four drills: diplomacy, dice, astra, vyuha. Only some scenes call them. |
| `src/lib/engine/types.ts` | `Beat`, `Rite`, `Air`, vows, choices. |
| `src/lib/engine/audio.ts` | Drone, heartbeat, the pitch drop, the silk, the shatter. Web Audio only. No audio files. |
| `src/lib/engine/store.ts` | Save. `localStorage`. |
| `src/styles.css` | Obsidian, gold, crimson, and the rite overlays. |
| `public/chronicle/` | The only pictures the site serves: `beam`, `fire`, `satra`, `sauti`, plus two short clips. |

A beat looks like this:

```ts
beat("boom", "संस्कृतम्।", "English, short enough to say aloud.", "తెలుగు.", {
  speaker: "Krishna",
  rite: "cosmos",
  holdMs: 2800,
  intent: line("सा।", "What he will not say.", "అతడు చెప్పనిది."),
})
```

Rites that exist: `vow`, `seal`, `shatter`, `silk`, `hair`, `black`, `cosmos`, `ash`, `amber`.
Air that exists: `lac` (the house sweats), `void` (starless), `mist` (the mountain, drained of color).

A new act does not need a new screen. It needs a chapter whose `id` is already in `act-slots.ts`, dropped into the parva file that slot names.

## The twenty acts

All twenty are written and reachable. They are a dramatic arc, not the books.

1. The Terrible Vow — rite on the celibacy line.
2. Fire and Ashes of Amba.
3. The Blind Throne.
4. Rivals of Fate. Karna.
5. First Blood and Poison.
6. The House of Lac — amber sweat, sealed tunnel, then the fire.
7. Fire-Born. Draupadi.
8. Enter the Strategist. Krishna.
9. The Matsya Yantra.
10. Five Husbands, One Queen.
11. Maya Sabha and the Laugh.
12. Dharma as a Trap. The dice are a drill here.
13. The Unbound Hair — shatter, silk, hair.
14. Exile and the Divine Arsenal. The astra drill can sit here.
15. The Peace Envoy. Five villages.
16. Lines in the Dust.
17. Virata Rupam and the Gita — black, then the mandala.
18. The Fall of Titans. Bhishma, Abhimanyu, Drona, Karna, the thigh. The wheel rite is the older flash, not a full scene of its own.
19. A Mother’s Curse. Gandhari. Krishna accepts it.
20. The Final Ascent — mist, ash, then the dog’s amber.

Parvas with no act of their own (4, 7–10, 12–17) are not empty by mistake. Those books are folded into acts 14–19. Do not invent an 18-file mirror of the critical edition unless the vision changes back to a shloka reader.

## Desk versus stage

The Mac keeps the whole repo. Vercel uploads only what the app builds. The split is `.vercelignore`. Paths there must start with `/`. A bare `data` once hid `src/data` and broke the build.

Kept off the deploy, still in git: `docs/`, `prompts/`, `data/`, the old `index.html`, the duplicate `chronicle/` at the repo root, `AGENTS.md`, tests.

Served: `src/`, `public/chronicle/`, the config, and the scripts the build actually imports.

Vercel project settings that must stay:

- Framework: TanStack Start
- Install: `npm install`
- Build: `npm run build`
- Output directory: empty

If those are reverted, the site goes back to the old one-page `index.html`.

## Pending, in the order that reaches the vision

Do these. Do not start at the bottom.

### 1. Faces and panels for the five peaks

The rites are real. The pictures are not. `beam`, `fire`, `satra`, and `sauti` stand in for every river, court, and battlefield. Until those five scenes have their own faces, the goosebumps are only in the sentences.

For each peak, the missing plate is:

- Vow: Hastinapura going dark, one man, flowers that do not know what they are burying.
- Lac: a house sweating amber, a mouth speaking a language the hall thinks is manners.
- Hair: a hall in pieces, cloth that does not end, hair let down.
- Virata: no friend left in the chariot. Mouths. Suns. The reader small.
- Ascent: white mist, four bodies already behind, one dog, one amber breath.

Art direction is Rajamouli scale and Vacation.inc restraint. No text baked into the image. No blast footage. No stock "Indian mythology" filters. Drop files in `public/chronicle/` and point the scene’s `image` / `video` at them. Prompts can live in `prompts/` and stay off the deploy.

### 2. Silence and sound that belong to a person

The synth can drop, thump, and hiss. It cannot yet be Bhishma’s quiet or Draupadi’s hall. Next sound is still Web Audio, not a folder of mp3s: a held drone per rite, a single conch at the start of the war, and the absence of sound on the mountain until the amber. A mute control already exists. Keep it.

### 3. The other fifteen acts are still type

Acts 2–5, 7–12, 14–16, 18, and 19 are written and choice-bearing. They do not have rites. Do not give all of them a full-screen trick. Pick the blows:

- Amba, neither wife nor free.
- The laugh in the illusion palace.
- The dice, when the kingdom is already gone and he is still playing.
- Karna in the mud.
- Gandhari on the field, and Krishna bowing to the curse.

Same pattern as the five: one `rite`, one `holdMs` if the page must not be skippable, a line short enough to say aloud.

### 4. Languages as a way to learn

The switcher works. Side by side does not. `lang: "all"` stacks the three lines. It is not yet a comparison a student can live in: same beat, three columns, Sanskrit word able to be looked at against the Telugu and the English. That was in the first brief. It is still open.

After the layout, a human pass. The Sanskrit is compressed, not the critical edition. The Telugu is a draft. Do not pretend otherwise in the UI.

### 5. The drills, only where the story needs them

Four exist and are rough: allocating allies, a dice wager, a timing trial for a weapon, a formation grid. They are not the dice hall, the peace mission, or eighteen days of war. Use them as interruptions, not as a second game.

- Dice belongs to act 12, and it should feel like a trap, not a mini-game trophy.
- Astra belongs to act 14.
- Vyuha belongs to Abhimanyu in act 18, one door, the way out never taught.
- Diplomacy belongs to the envoy in act 15: five villages, and the clock still running.

If a drill does not change dharma, an ally, or a vow, cut it.

### 6. A map of Bharata, not a progress bar

The Chronicle list is how you jump. What is missing is where the story is standing: river, Hastinapura, the lac house, Indraprastha, the hall, the forest, Kurukshetra, the snow. One dark map. A single mark. No pins for every shloka.

### 7. The gift, hidden

No donate button on the gate or the first act. Deep in the field, or after act 20, a quiet line and `jayanthedara1@ybl`. Ten or fifteen rupees. Other payment methods stay "later" until there is a reason.

### 8. Return, and a place to talk

The browser remembers. A reader on a second phone does not. Cloud save is not required for the vision. A way to say "I am still on the mountain" in one sentence is.

Forums and notes to the creator were asked for and not built. They are later than the faces. If they are added, they are a single quiet thread per act, not a social network.

## Explicitly not the next build

- A shloka-by-shloka reader of all 18 parvas.
- A level ladder to 100. The act map replaced it. Do not bring the bar back.
- Accounts, unless save-across-devices becomes the actual request.
- A second visual mode (anime, manga, cartoon, gif-only) as a row of buttons. The rite is the mode. More buttons made the early page look like a shop.
- Framer Motion, a component library, or a backend, until a scene cannot be done without it.
- Baking captions into images.

## How to continue without breaking the live site

```bash
cd /Users/jay/Desktop/Mahabharatam
git checkout main
git pull origin main
npm install
npm run dev
```

Dev server: `http://127.0.0.1:8080/`.

Change a chapter. Commit. Push `main`. Vercel builds. Do not redeploy an older red row. Do not commit `.env` or `node_modules`. If `package-lock.json` dirties itself after install, `git restore package-lock.json` unless you meant to change dependencies.

Before calling a scene finished, open it on the phone width. Hold the line the rite names. If you can skip the blow, it is not finished.

## The sentence to keep

The engine is ahead of the feeling. The next work is faces, panels, and silence on the five peaks. Not more plot.
