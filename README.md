# Mahabharatam

A cinematic manga of the Mahabharata. Twenty acts. Sanskrit, English, and Telugu on the same beat. Choices move a dharma score and a set of vows. The reader is not taking a course. They are walking into a house that already knows how it burns.

Live site, once the project builds the app and not the old static page: [mahabhatam.vercel.app](https://mahabhatam.vercel.app/)

## What is done

The playable spine is in. Acts 1–20 run from Devavrata's vow to the dog at the gate. Tap advances a beat. Intent shows what a person will not say. Kala is the clock. Four climaxes take the whole screen: the lacquer house, the unbound hair, the cosmic form, the chariot wheel.

Story text is code, in `src/data/parvas/`. The screen never hardcodes a chapter.

## What is not done

The same four plates stand in for every hall, river, and battlefield. There is no cast of faces, no panel layout, no sound that belongs to a character. Telugu and Sanskrit are readable, not yet edited by a scholar. That is the distance between a working chronicle and a manga that stops a person mid-scroll.

## On your Mac

```bash
cd /Users/jay/Desktop/Mahabharatam
git checkout main
git pull origin main
npm install
npm run dev
```

Dev server: http://127.0.0.1:8080/

Edit a chapter, commit, push. Vercel builds from `main`.

```bash
git add -A
git commit -m "Say what changed"
git push origin main
```

Do not commit `.env`. Do not commit `node_modules`.

## Local desk vs Vercel

Your Mac keeps the whole repo. Vercel receives only what the app needs to build and serve. The split is `.vercelignore`.

| Stays on the Mac. Not uploaded. | Why |
| --- | --- |
| `index.html` | The old one-page site. It was hiding the new app. |
| `chronicle/` | Duplicate of `public/chronicle/`. The app serves the public copy. |
| `prompts/`, `data/` | Your notes, character sheets, visual prompts. Not imported by the player. |
| `docs/` | This explanation. |
| `AGENTS.md`, `startup.sh` | Builder notes. Not the product. |
| `**/*.test.*` | Checks. Not the site. |

| Vercel builds from these | Why |
| --- | --- |
| `src/` | Chronicle, beats, vows, the four drills. |
| `public/chronicle/` | The plates and the two clips. |
| `package.json`, `package-lock.json`, `vite.config.ts`, `tsconfig.json`, `vercel.json` | Install and build. |
| `scripts/with-app-env.mjs`, `scripts/migrate.mjs`, and the plugins Vite imports | The build does not start without them. |
| `.grok/app-env.json` | Keeps sign-in off, so the chronicle is public. |

Full map: [docs/where-things-live.md](docs/where-things-live.md)

## Vercel, once

The project is still set to serve `index.html` as a static site. Until that changes, a push updates GitHub and your Mac, and the old page stays up.

In the [mahabhatam build settings](https://vercel.com/jays-projects-89ebf098/mahabhatam/settings):

- Framework: TanStack Start
- Install: `npm install`
- Build: `npm run build`

Then redeploy. After that, `main` is the site.

## The five that should land

Open Chronicle and jump. Read these in English first, then hold Intent.

1. **The Terrible Vow**, scene "spoken". He gives the throne away, then the rest of a life. The flowers do not know what they are burying.
2. **The House of Lac**, scene "night". Lacquer burns like a decision. Five strangers are counted as the brothers. Survival is the lie.
3. **The Unbound Hair**, scene "vastra". The cloth does not end. She keeps the faces. The hair stays open until it is washed in blood.
4. **Virata Rupam**, scene "virata". Time stops. He sees himself already inside the mouth, and the war as a thing that has happened.
5. **The Final Ascent**, scene "gate". Heaven has conditions, so it looks like Hastinapura. The dog may not enter. He refuses the door.

If those five do not catch the breath, the engine is ahead of the feeling. The next work is faces, panels, and silence, not more plot.
