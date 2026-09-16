# AGENTS.md — Rachit Portfolio (Project Brain)

> **Ye file is project ka memory hai.** Koi bhi agent (AI / coding tool) is file ko
> **sabse pehle** read karega jab bhi is project par kaam kare. Yahan har baat-cheet,
> har decision, aur har change ka log kiya jata hai.

---

## 📜 Instructions for Any Agent (Sab Agents Ke Liye)

1. **READ THIS FILE FIRST** — Pehla step hamesha `AGENTS.md` ko read karna hai. Koi kaam shuru karne se pehle, current state aur history samjho.
2. **UPDATE AFTER EVERY TASK** — Har kaam ke **baad**, bina kisi se pooche, is file ko update karo:
   - Log mein naya entry add karo (`## Changelog` section ke andar latest entry sabse UPAR).
   - Project state badli ho to `## Current State` update karo.
   - Koi pending/reh gaya kaam ho to `## Todo / Pending` me daal do.
3. **Secrets NEVER yahan** — GitHub token, password, API keys is file me kabhi mat likhna. Secrets ko repo me kabhi commit nahi karna.
4. **Baat-cheet ka record** — User ke saath jo bhi important decision/correction hua, use Changelog me likho taaki next agent ko pata ho.
5. **Code conventions follow karo** — React + TypeScript + Vite + Tailwind CSS v4 + Framer Motion + GSAP. Existing pattern/style copy karo, unwanted comments mat daalo.
6. **Verification** — Har change ke baad `npm run lint` chalao. Build check ke liye `npm run build` chalao.
7. **Git/GitHub** — Changes sirf tab push karo jab user kaho. Commit messages chhote aur clear rakho.

---

## 🔧 Project Overview

- **What:** Rachit Sharma ka personal portfolio website — Digital Marketer / AI-Powered Creator.
- **Stack:** React 19 + TypeScript + Vite + Tailwind CSS v4 + Framer Motion + GSAP + HLS.js + tanstack-router (react-router-dom v7).
- **Pages:**
  - `/` → Landing (Hero, SelectedWork, Journal, Stats, Contact)
  - `/resume` → Resume page
- **Design vibe:** Dark, grain texture, cursor glow, loading screen, marquee, magnetic buttons — aesthetic + animated.
- **Data source:** `src/data.ts` (personal info, socials, projects, journal, stats — sab yahan se control hota hai).

---

## 🧱 Current State (as of last update)

- Landing page complete with: LoadingScreen, Grain overlay, CursorGlow, Navbar, Hero (rotating roles), SelectedWork, Journal, Stats, Contact.
- Resume page complete (Education, Skills, Projects).
- Framer Motion page transitions, RevealHeading, TiltCard, Magnetic, Marquee helpers bane hain.
- **NEW — 3D Scroll-to-Fly-Through Works:** `SelectedWork.tsx` ab React Three Fiber 3D section hai — scroll par camera panels ke beech fly karta hai (sticky `h-[400vh]` + window scroll + Lenis). Components `src/components/works/` me (WorksScene, ProjectPanel, GridFloor, WorksOverlay, projectsData). Panels par click → `ProjectDetailTransition`.
- **NEW — Click-to-Open transition (`v5`):** `ProjectTileTransition.tsx` ko 3 files me refactor kiya — `ProjectDetailTransition.tsx` (tile scatter → circle converge → dissolve → card), `ProjectDetailCard.tsx` (card + detail panel), `useProjectTransition.ts` (open/close hook, `seq` counter). Tiles panel ke click-point se originate hoti hain, per-project accent/screenshot, coming-soon desaturated + shake. Rapid-clicks par seq-key se fresh mount.
- **Hero black-background fix:** `BackgroundVideo` ab fallback gradient dikhata hai jab video load/play nahi hoti (VS Code embedded browser case). Video sirf tab dikhti hai jab actually play ho rahi ho.
- **Lenis smooth scroll** App-level wired (`src/App.tsx`, autoRaf lerp 0.09).
- `data.ts` me highlight:
  - LinkedIn & Instagram links TODO hai (`src/data.ts`)
  - `VIDEO_SRC` — real HLS/video link chahiye (abhi Mux test stream hai)
  - Projects me ab accent/tagline/description/tech fields bhi hain
- Git repo initialized, GitHub remote `rachitportfolio` se linked, first push done. Branch `main`.

---

## 📄 Key Files Map

| File | Kaam |
|---|---|
| `src/App.tsx` | Router + loading screen + page transitions |
| `src/data.ts` | Saara content ek jagah (info, socials, projects, stats) |
| `src/pages/Landing.tsx` | Home page |
| `src/pages/Resume.tsx` | Resume page |
| `src/components/` | Saare UI sections (Hero, Navbar, Contact, ...) |
| `index.html` | SEO meta + fonts (Inter, Instrument Serif) |

---

## 📝 Changelog (History of Work)

### [v5 — Click-to-Open Project Animation Refactor] — 16 Sep 2026
- **Tile transition ko naye structure me refactor kiya** — `ProjectTileTransition.tsx` delete, ab 3 files `src/components/works/` me:
  - `ProjectDetailTransition.tsx` — full-screen overlay: GSAP timeline tiles panel origin se → scatter (0.5s, stagger 0.025) → circle converge (0.65s, stagger 0.04, CIRCLE_EASE) → hold → tiles dissolve (scale+fade) jis raj par detail card fade/scale-in hota hai. `prefers-reduced-motion` par tiles skip → direct crossfade. Timings per phir tweak kare (`AGENTS.md`).
  - `ProjectDetailCard.tsx` — card (accent label, title, tagline, View Details + ✕) aur full detail panel (image, About, Built with, GitHub link). Refs `cardRef`/`panelRef` transition ko dete hain (openPanel card fade-out + panel fade-in).
  - `useProjectTransition.ts` — hook: `{ request, open(project, originRect), close }`. `seq` counter → rapid multi-clicks par fresh mount (old timeline `ctx.revert()` se kill hota hai).
- **Per-project identity:** Fitness = blue accent + tiles apne screenshot (project.image, sprite-crop via background-position), Neon = magenta/purple + solid glow tiles, Coming-soon = desaturated (grayscale 0.6) tiles + circle me converge → gentle shake/bounce (x+14, y+10, repeat 4) → dissolve → auto-close (kabhi card nahi khulta).
- **Origin position:** `ProjectPanel` ab `onOpen(project, {x,y})` de deta hai — `event.nativeEvent.clientX/Y` (click point ka exact screen position). `SelectedWork` usse `DOMRect` banata hai → tiles panel ki position se originate hoti hain, screen center se nahi. Coming-soon ke liye chhota origin rect (0.09 * minDim).
- **Cleanup:** Escape/body scroll-lock, `timeline` context scoped `rootRef` + `ctx.revert()` on unmount, `closingRef` se double-close guard.
- `npm run lint` + `npm run build` pass (sirf 3 R3F ref-pattern warnings + chunk-size warning).

### [v4 — 3D Scroll-to-Fly-Through Works Section] — 16 Sep 2026
- **Naya 3D Works section** — `SelectedWork.tsx` ko 2D grid se **React Three Fiber 3D fly-through** me badla:
  - `src/components/works/WorksScene.tsx` — Canvas + camera rig. Scroll progress (`progressRef`) se camera Z-axis par panels ke beech se aage fly karta hai (start z=7 → end z=-18), eased lerp + `camera.lookAt` forward.
  - `src/components/works/ProjectPanel.tsx` — landscape gradient panels (5×3.1), DOM `Html` overlay (Archivo/Space Grotesk text), distance-based focus scale/opacity, click → open detail.
  - `src/components/works/GridFloor.tsx` — drei `<Grid>` infinite perspective grid floor.
  - `src/components/works/WorksOverlay.tsx` — HUD: "SCROLL TO FLY THROUGH" + live progress line + active slug + "01 / 04" counter (rAF loop reads progressRef).
  - `src/components/works/projectsData.ts` — 4 projects (Fitness, Neon, Upcoming, Video) with accent gradients matching `data.ts`.
- **Motion blur on fast scroll** — CameraRig velocity se camera ke sath-sath ek DOM wrapper par CSS `filter: blur()` apply karta hai (max ~8px).
- **Lenis smooth scroll** — `App.tsx` me `lenis` wired (`autoRaf`, lerp 0.09).
- **Click → detail** — `ProjectDetailTransition` (tile scatter → circle → dissolve → detail card) reuse; coming-soon projects click-par sirf shake karte hain (card nahi khulta).
- **Deps:** `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three`, `lenis` install hua. `react`/`react-dom` **pin 19.2.8** (fiber 9.7 peer `react >=19 <19.3` — 19.3.0 par ERESOLVE aata tha).
- **Fonts:** `index.html` me Archivo (500–900) + Space Grotesk (300–700) add, `src/index.css` me `--font-archivo` / `--font-grotesk` theme vars.
- `npm run lint` + `npm run build` pass. Build chunk-size warning sirf (three.js bundle bada hai).
- **Scope note:** ScrollControls use nahi kiya — scroll ko window scroll (+Lenis) se drive kiya (`h-[400vh]` + sticky), taaki section mid-page embedded ho aur Lenis ke saath conflict na ho.

### [v3 — Tile Converge Transition + Background Fix] — 16 Sep 2026
- **Background black bug fix (VS Code):** `BackgroundVideo` me fallback gradient add hua. Video ab sirf tab visible hai jab actually play ho (opacity transition). HLS worker disable kiya. Hero ko nice dark-blue radial gradient fallback diya taaki video fail hone par bhi black nahi dikhe.
- **Project Tile Converge transition banaya:** `src/components/ProjectTileTransition.tsx` — GSAP timeline se tiles card se scatter → circle converge → dissolve → reveal card → detail panel. Per-project accent colors ([Fitness blue #4E85BF](data.ts), [Neon magenta #D946EF](data.ts)). Coming-soon cards desaturated + shake on click. `prefers-reduced-motion` par direct panel. Escape/body-scroll-lock handled.
- `data.ts` me Project type extend hua: `accent`, `tagline`, `description`, `tech`. Saare 4 projects ab detail-ready hain.
- `SelectedWork.tsx` ab cards ko expandable button banaya — click par transition khulta hai (pehle anchor link tha).

### [v2 — Repo Setup] — 16 Sep 2026
- Git init + GitHub repo `digitalguru99908-dev/rachitportfolio` (public) banaya + first push (`main` par).
- `AGENTS.md` banayi.

### [v1 — First Push] — 16 Sep 2026
- Project initial repo setup + GitHub par `rachitportfolio` repo banaya.
- `AGENTS.md` file banayi — project memory / instructions.
- Baat-cheet record:
  - User ne bola ki agent = partner hai is project ka, har kaam ka record `AGENTS.md` me rakhna hai.
  - Kaam ke baad hamesha khud file update karna (na puch ke).
- **Note:** User ne GitHub token chat me share kiya tha — token kabhi file/repo me nahi likha. (Security rule)

*[Pehle ke saare site kaam — Landing, Resume, components — is push se pehle ban chuke the, isliye unhe "built" state me dokument kiya gaya hai.]*

---

## 📌 Todo / Pending

- [ ] LinkedIn real profile link lagana (`src/data.ts`)
- [ ] Instagram real profile link lagana (`src/data.ts`)
- [ ] `VIDEO_SRC` ko real video (HLS/MP4) se replace karna
- [ ] "Coming soon" project cards ko real projects se replace karna
- [ ] Site ke live deploy ki setup (abhi sirf local build ready hai)

---
*Generated by opencode — har agent is file ko read/update karega.*