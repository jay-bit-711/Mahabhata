# Mahabharata

Premium cinematic retelling. Mobile-first, multi-mode, multi-language.

## Files
- `index.html` — live app (users only see this)
- `data/level-1.json` — Level 1 content, XP, prompts
- `data/levels.json` — 100-level map
- `data/characters.json` — characters + portrait prompts
- `prompts/visuals.md` — all visual prompts
- `assets/` — images, GIFs, videos (add locally)

## Founder workflow
```bash
git pull
# edit data/*.json or prompts/visuals.md
git add .
git commit -m "update"
git push
```

## Current state
- Level 1 (Naimisha) is playable and completable (100 XP)
- XP bar + hierarchical path (Parva · Adhyaya · Block)
- Map panel shows story location
- 100-level structure ready for expansion
