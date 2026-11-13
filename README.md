# Mahabharata — Premium Digital Experience

## Structure (Users see only index.html)
- `index.html` — User-facing app (Vercel)
- `data/level-1.json` — Full Level 1 content (blocks, text, XP, visual prompts)
- `data/levels.json` — 100-level overview
- `data/characters.json` — Character roster + portrait prompts
- `prompts/visuals.md` — Source of all visual prompts
- `assets/` — (create locally) for images / GIFs / videos

## Workflow
1. Edit content in `data/` and `prompts/`
2. Users only interact with `index.html`
3. Founder pulls, edits JSON/MD, commits, pushes

## Level System
- Entire story = 100 levels
- Each block/shloka grants XP
- Level 1 requires 100 XP (4 blocks)
- Progress scales: Parva → Adhyaya → Block
- Map shows current story location in Bharat
