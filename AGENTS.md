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

- Landing page complete with: LoadingScreen, Grain overlay, CursorGlow, Navbar, Hero (rotating roles), SelectedWork, Journal, About, Capabilities, Vision, Stats, EnquiryForm, Contact.
- Resume page complete (Education, Skills, Projects).
- Framer Motion page transitions, RevealHeading, TiltCard, Magnetic, Marquee helpers bane hain.
- **NEW (`v7`) — About/Capabilities/Vision/EnquiryForm sections** — `src/components/About.tsx`, `Capabilities.tsx`, `Vision.tsx`, `EnquiryForm.tsx` add hue. EnquiryForm me EmailJS placeholder credentials (`YOUR_SERVICE_ID` etc.) daalne baaki hain.
- **NEW — DOM Click Overlay (`v8`):** panels ab mesh raycast nahi, `PanelClickLayer` ke invisible DOM buttons se open hote hain (useFrame screen-projection + rAF sync). Sab panels any scroll position par clickable.
- **NEW — 3D Scroll-to-Fly-Through Works:** `SelectedWork.tsx` ab React Three Fiber 3D section hai — scroll par camera panels ke beech fly karta hai (sticky `h-[400vh]` + window scroll + Lenis). Components `src/components/works/` me (WorksScene, ProjectPanel, GridFloor, WorksOverlay, PanelClickLayer, projectsData).
- **Lenis nav scroll (`v8`):** nav/hero/landing `src/lib/lenis.ts` ke `scrollToSection()`/`scrollToTop()` use karte hain — Lenis conflict se dead-scroll fix hua.
- **Panel click par `ProjectDetailTransition` kholta hai** (`v5`, refactor) — tiles scatter → circle converge → dissolve → card; View Details = GitHub link (v6); coming-soon desaturated + shake.
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

### [v10 — Secure contact form (Resend API) + Secrets protection] — 16 Sep 2026
- **Enquiry form ab Resend se mail karta hai (EmailJS hata diya):**
  - `api/send-email.ts` — Vercel **serverless function** (Node runtime). Form POST → Resend API se mail (`from: onboarding@resend.dev`, `to: CONTACT_EMAIL`, `reply_to` sender). API key **kabhi client/browser me nahi** — sirf server-side `process.env.RESEND_API_KEY` se.
  - `src/components/EnquiryForm.tsx` — `emailjs.send()` ki jagah plain `fetch('/api/send-email')`. Validation + sent/failed states same.
  - `@emailjs/browser` uninstall, `resend` + `@vercel/node` (devDeps) install.
- **Secrets protection (security):**
  - `.env` (Naya) — `RESEND_API_KEY` + `CONTACT_EMAIL` (real values). **`.env` gitignore me hai, GitHub par kabhi nahi jayega.**
  - `.env.example` (Naya, committed) — same keys, **no values**. Kisi bhi gobhi ko pata ho kaunse secrets chahiye.
  - `.gitignore` update — `.env`, `.env.*`, `!.env.example`, `.vercel` added. `.vercel` (CLI project folder) bhi ignore.
  - **Note:** `VITE_` prefix kabhi use nahi karna secrets ke liye (wo browser bundle me inline hota hai). Resend key only server-side.
- **Email source:** Resend free tier `onboarding@resend.dev` (testing). Agar custom domain verify karoge to `from` change ho sakti hai (`api/send-email.ts`).

### [v9 — Rachit's photo + Vercel ready] — 16 Sep 2026
- **Photo lagayi:** `D:\Pictures\rachit.jpg` → `public/rachit.jpg` (162KB) copy hui; `About.tsx` me photo slot ab initials placeholder ki jagah `/rachit.jpg` dikhata hai (240px circle, gradient ring, `object-cover`).
- **Vercel CLI installed:** `npm i -g vercel` (pnpm global bin PATH me nahi tha) → `vercel@59.19.0`. `vercel whoami` → login required.
- **`vercel.json` banaya:** `framework: "vite"` + SPA rewrite (`assets/` kochhod kar sab `/index.html` → `/resume` refresh par kaam kare).

### [v8 — Round 2 Fixes: DOM click, Lenis nav, About redesign] — 16 Sep 2026
- **Bug fix — project panel click ab har scroll position par reliably kholta hai:** 3D raycast hit-testing (unreliable, sirf focused panel work karta tha) hata ke **DOM click overlay** approach use kiya:
  - `src/components/works/ProjectPanel.tsx` — mesh se `onClick`/`raycast` gating hata diya; `useFrame` me har panel ka front-face **screen coords me project** hota hai (`Vector3.project(camera)`, 4 corners → viewport px rect) aur `screenRect` object me likhta hai.
  - `src/components/works/PanelClickLayer.tsx` (Naya) — sticky container ke upar invisible DOM `<button>`s (har panel ke liye ek), rAF loop se `screenRect` ke hisaab se position/size sync. DOM button click mesh raycast se kahin zyada reliable. Click → clientX/Y origin → `ProjectDetailTransition`.
  - `WorksScene`/`SelectedWork` — `focusIndex` state aur `active` prop puri tarah remove (ab sab panels clickable hain). `screenRects` = `useMemo` array (stable objects, React-render safe).
  - WorksOverlay + top "Selected Work" bar `pointer-events-none` already the; top bar container z-20→z-30.
- **Bug fix — nav/hero/"Say hi" links ab actually scroll karte hain (Lenis fight fix):** `scrollIntoView`/`window.scrollTo` Lenis se clash karta tha → `src/lib/lenis.ts` (Naya) — Lenis singleton `setLenis()`/`scrollToSection(id)`/`scrollToTop()` helpers. `App.tsx` me Lenis register; `Navbar`, `Hero`, `Landing` sab `lenis.scrollTo()` use karte hain.
- **Footer/social links:** pehle se real `<a target="_blank">` hain (`data.ts` SOCIALS). LinkedIn/Instagram abhi placeholder URLs (real handle share karo to replace).
- **About section redesign (`v8`):** photo slot (240px circular frame, permanent blue accent gradient ring, initials placeholder + `TODO: replace with Rachit's own photo` comment) + "My Story" card left column; bio paragraphs ab 3 bordered cards (`bg-surface border-stroke rounded-2xl`) + chips/buttons hover lift (`-translate-y-0.5` + border accent). "My Journey" timeline: har item scroll reveal, dot accent-gradient + glow spring-in.
- **Capabilities hover:** cards ab `hover:-translate-y-1` lift + border text-primary/50.
- **Enquiry Form:** already wired (`Landing.tsx` me, Stats ke baad, Contact se pehle) — sirf EmailJS credentials placeholders baaki (`src/components/EnquiryForm.tsx:19-21`).
- `npm run lint` + `npm run build` pass (sirf known R3F useFrame mutation warnings + chunk-size warning).

### [v7 — About / Capabilities / Vision / Enquiry Form Sections] — 16 Sep 2026
- **4 naye sections** landing page par (order: Hero → SelectedWork → Journal → **About → Capabilities → Vision → Stats → Enquiry Form → Contact**):
  - `src/components/About.tsx` — "Who is Rachit?" + chips (AI Tools 25+, Focus, VoiceMemories AI) + GitHub/LinkedIn pills + "My Story" bordered card + "My Journey" vertical timeline (2025–2026, dot + line style). `SOCIALS.github` / `SOCIALS.linkedin` links.
  - `src/components/Capabilities.tsx` — icon grid (lucide-react): Row 1 tools (OpenCode, OpenAI GPT, ElevenLabs, Cartesia AI, Claude), Row 2 skills (25+ AI Tools, Digital Marketing, AI-Powered Campaigns, Real Projects, Learning Every Day). 5 cols desktop → 2 cols mobile, hover lift + accent color.
  - `src/components/Vision.tsx` — bold stacked lines, big type alternative accent/muted, radial-glow bg in site's blue accent.
  - `src/components/EnquiryForm.tsx` — EmailJS form (NAME/TEMPLATE/PUBLIC_KEY placeholders `src/components/EnquiryForm.tsx` me — **user ko real EmailJS credentials daalne hain**). Fields: Name, Email, Reason select (Hire me/Collaborate/Just say hi/Other), Message. Validation + "Message sent ✓" 3s state + error state + disabled while sending.
- **Deps:** `lucide-react` + `@emailjs/browser` installed.
- `Landing.tsx` me saare sections wired, `id="about"` / `id="capabilities"` / `id="vision"` / `id="enquiry"`.
- `npm run lint` + `npm run build` pass (sirf same 3 R3F warnings + chunk-size warning).

### [v6 — Panel Click Gating + Detail Button Fix] — 16 Sep 2026
- **Bug fix — panels ab har scroll position par clickable:** `SelectedWork` me `focusIndex` (scroll progress se `round(p*(PANEL_COUNT-1))`) → `WorksScene` → `ProjectPanel active` prop. Non-active panels me `raycast={() => null}` → R3F unhe raycast nahi karta, focused panel ke click kabhi intercept nahi hote. `Html` me `pointerEvents="none"` prop bhi.
- **Bug fix — detail card buttons ab clickable:** `ProjectDetailTransition` ko `createPortal(document.body)` me render kiya — framer-motion transform stacking context + drei Html ke z-index (16M) se bahar. z-[1000], bg/tiles layers `pointer-events-none`.
- **Feature — "View Details" ab GitHub repo kholta hai:** `projectsData.ts` me `repoUrl` field (Fitness/Neon ke real GitHub URLs). Card me View Details = `<a href target=_blank>` anchor → repo naya tab me. Coming-soon → "Details coming soon" disabled. `toProject` me `repoUrl` fallback `href`. Detail panel flow `ProjectDetailCard` se hata diya (View Details ab in-card panel nahi kholta).
- Commit `7b48f56`.

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

- [ ] Vercel deploy: `vercel login` (browser) → `vercel --prod`
- [ ] LinkedIn real profile link lagana (`src/data.ts`)
- [ ] Instagram real profile link lagana (`src/data.ts`)
- [ ] `VIDEO_SRC` ko real video (HLS/MP4) se replace karna
- [ ] EnquiryForm ab Resend wired (serverless) — deployed env me `RESEND_API_KEY` set hona chahiye
- [ ] "Coming soon" project cards ko real projects se replace karna
- [ ] Site ke live deploy ki setup (abhi sirf local build ready hai)

---
*Generated by opencode — har agent is file ko read/update karega.*