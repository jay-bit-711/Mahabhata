# Where things live

The Mac is the desk. Vercel is the stage. Git carries both, and `.vercelignore` decides what never walks on stage.

## Read this before a pull

`git pull` will not delete `prompts/`, `data/`, or the old `index.html`. Those stay in the repo for you. They are listed in `.vercelignore`, so the deployment upload skips them.

If a file is only on the Mac and not committed, a new clone will not have it. Commit desk notes when you want them on both computers. Leave them uncommitted when they are scraps.

## Desk (your eyes only)

| Path | What it is |
| --- | --- |
| `prompts/visuals.md` | Lines for plates you have not drawn yet. |
| `data/characters.json` | Who is who, for you, not for the player. |
| `data/level-1.json`, `data/levels.json` | The earlier level sketch. The live progress is the act map. |
| `index.html` | The first static page. Kept so you can compare. Do not point Vercel at it. |
| `chronicle/` | First copies of the plates. The served copies are `public/chronicle/`. |
| `docs/` | Writing about the project. |
| `AGENTS.md` | Notes for the builder. Ignore unless you are changing how the app is made. |

## Stage (what a reader can hit)

| Path | What it is |
| --- | --- |
| `src/data/parvas/` | The twenty acts. One file per book. Ids must match `act-slots.ts`. |
| `src/components/engine/` | The page: beats, Intent, vows, Kala, the four drills. |
| `src/lib/engine/` | Save, dharma, the clock. Saved in the browser, not on a server. |
| `src/styles.css` | The obsidian, gold, and crimson. Sakuga lives here. |
| `public/chronicle/` | beam, fire, satra, sauti. Images and the two clips. |

A new act is a chapter whose `id` is already in `src/data/parvas/act-slots.ts`, dropped into the parva file that slot names. No screen code changes.

## How a beat is shaped

```ts
beat("boom", "संस्कृतम्।", "English, short enough to say aloud.", "తెలుగు.", {
  speaker: "Draupadi",
  shake: true,
  intent: line("सा।", "What she will not say in the hall.", "ఆమె సభలో చెప్పనిది."),
})
```

`whisper` is close. `speak` is the room. `boom` is the line people repeat later. Intent is the lens, not a second caption.

## What the reader keeps

Nothing of theirs is on Vercel. Dharma, vows, and the page they stopped on sit in `localStorage` on that browser. Clearing the site data starts the chronicle over.

## Commands

```bash
cd /Users/jay/Desktop/Mahabharatam
git pull origin main
npm install
npm run dev
```

Push only when a chapter or the screen should change for everyone else.

```bash
git push origin main
```
