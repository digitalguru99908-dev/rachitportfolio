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
- **Backend LIVE on Render (`v14`):** API **`https://rachit-api.onrender.com`** (Express + Resend), frontend Vercel static only. `VITE_API_URL` (Vercel env + `.env` local) = Render URL. `RENDER_API_KEY` saved in `.env` (gitignored). Keep-alive triple-layer:
  1. **GitHub Actions cron (`v15`, LIVE)** — `.github/workflows/keep-render-awake.yml` har 10 min Render `/health` ping (manual run verified SUCCESS — 100% free)
  2. **Client-side `startKeepAlive()`** (`src/lib/keepalive.ts`) — pings `/health` on mount + every 8 min while site open
  3. **EnquiryForm 3-attempt retry** — cold-start race me 6s backoff ke saath retry
- **User rule (`v15`):** user ne clear kaha — **"sab kam bilkul free ma hona chiye"**. Koi bhi change jo paisa maange (Render cron $1/mo, Vercel Pro cron, paid plan) = pehle se NO. Free solutions hi: GitHub Actions cron, client-side keep-alive, retry.
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

### [v15 — GitHub Actions keep-alive cron LIVE (100% free)] — 16 Sep 2026
- **User rule declared:** **"sab kam bilkul free ma hona chiye"** — koi paid option nahi (Render cron $1/mo, Vercel Pro) kabhi propose nahi karna. Ye rule AGENTS me record kiya gaya.
- **GitHub Actions cron god — LIVE ✅:** `.github/workflows/keep-render-awake.yml` me har 10 min Render `/health` ping. Manual dispatch run verified **SUCCESS**.
- **Why GitHub Actions, not Render/Vercel cron:** Render cron job type free plan par block (`invalid plan: free` + docs $1/cron/month minimum); Vercel cron Hobby par sirf daily (`Hobby accounts are limited to daily cron jobs`). → GitHub Actions hi ONLY free 10-min scheduler option hai.
- **PAT `workflow` scope issue solved:** user ne naya PAT banaya (`workflow` scope included). Workflow file **git push se nahi, GitHub Contents API se** create hui — kyunki git push `.github/workflows/` ko `workflow` scope ke bina block karta hai, par Contents API chalti hai.
- **PowerShell gotcha (important):** YAML here-string `@"..."@` me `$` variables interpolate ho jaate hain → `$i`/`$code` gayab. **Single-quoted `@'...'@` use karo.** Existing file UPDATE par `sha` field miss hota hai to 422 aata hai — pehle file ka current sha fetch karke pass karo.
- **Token hygiene note:** user ne ab tak 3 `ghp_` PATs chat me share kiye (last wala `ghp_b9Z...` abhi active, workflow file usi se bani). Sab tokens only memory me — AGENTS me kabhi nahi likhe, repo me nahi. Safety: `ghp_b9Z...` rotate karne ke liye GitHub → Settings → Developer settings → PAT.
- `git push` ke andar `.github/workflows/` ab repo me committed hai (file Contents API se bani thi, merge ke baad local me aa gayi).

### [v14 — Fresh Render backend + client-side keep-alive] — 16 Sep 2026
- **Bug fix — stale edge/routing on old service:** `rachit-portfolio-api.onrender.com` kept returning `x-render-routing: no-server` despite multiple fresh deploys + restarts. Root cause: stale DNS/edge mapping after delete + recreate of service with same name/URL. **Fix:** created fresh service `rachit-api` (`srv-dal9dd5g1s2s73em6lig`) → new URL `https://rachit-api.onrender.com` — first request returned 200 immediately.
- **Service create (API):** `POST /v1/services` — name `rachit-api`, owner `tea-dal7a1jm8hqs73f5i11g`, repo same, rootDir `server`, plan free, region oregon. Env vars from `.env`.
- **Vercel env updated:** `VITE_API_URL` = `https://rachit-api.onrender.com` (production), frontend redeployed (`vercel --prod`). Bundle verified inline.
- **End-to-end verified:** POST `Origin: https://rachitportfolio-fawn.vercel.app` → `{"ok":true}` (Resend mail sent). Preflight → 204 + correct CORS header.
- **Old service deleted:** `srv-dal8sq3m8hqs73fabth0` removed.
- **Client-side keep-alive (`src/lib/keepalive.ts`):** pings `/health` on page load + every 8 min while open. Keeps instance warm during browsing → email form instant.
- **EnquiryForm 3-attempt retry:** on cold-start race (instance sleeping), handleSubmit retries up to 3 times with 6s backoff before showing error. Eliminates most user-visible failures.
- **Render free cron NOT available:** `cron_job` type requires paid plan (`invalid plan: free`). Render docs confirm minimum charge **$1/cron job/month** — free par Render-native cron exist hi nahi karta.
- **Vercel cron bhi free par nahi:** Hobby plan daily-only cron allow karta hai; `*/10 * * * *` deploy par reject hua (`Hobby accounts are limited to daily cron jobs`). Vercel cron experiment revert (`vercel.json` wapas simple rewrite, `api/keepalive.ts` delete).
- **GitHub Actions cron = ONLY free 10-min option** → **LIVE ✅:** user ne naya PAT banaya (`workflow` scope included). Workflow file `.github/workflows/keep-render-awake.yml` GitHub Contents API se create hua (git push andar `workflow` scope block karta hai, par Contents API se chalti hai). Har 10 min Render `/health` ping. **Manual dispatch run = SUCCESS** (step `Ping Render health endpoint` → success). Cron schedule `*/10 * * * *` active. 💡 **Gotcha:** PowerShell `@"..."@` here-string `$` variables maarta hai — YAML upload se pehle single-quoted `@'...'@` use karo (pehle attempt me `$i/$code` gayab ho gaye the, `sha` required hai for file UPDATE).
- **Client-side keep-alive (`src/lib/keepalive.ts`)** = tumhara active bandobast (site khula → har 8 min ping). Email form abhi kaam karta hai.
- `npm run lint` + `npm run build` pass (same known R3F warnings + chunk-size warning).

### [v13 — Render backend LIVE via REST API] — 16 Sep 2026
- **Render API key:** user ne `RENDER_API_KEY` diya (`rnd_MhRE8...`, full in `.env`) — **`.env` me saved (gitignored, repo nahi gayi)**. Safety note: ye key chat me bhi share hui hai — Rotate karne ke liye dashboard → Account Settings → API Keys.
- **`brew install render` myth:** Render ka koi CLI/brew package hota hi nahi — user ne galat tutorial dekha tha. Deploy **official Render REST API** (`api.render.com/v1`) se kiya.
- **Service created via API** `POST /v1/services`:
  - Name `rachit-portfolio-api`, owner `tea-dal7a1jm8hqs73f5i11g` (Rachit's workspace, from `GET /v1/owners`)
  - Repo `digitalguru99908-dev/rachitportfolio`, branch `main`, rootDir `server`, runtime node
  - Build `npm install`, start `node index.js`, health `/health`, plan `free`, region `oregon`, autoDeploy yes
  - Env vars: `RESEND_API_KEY` + `CONTACT_EMAIL` (values `.env` se)
  - **Service ID `srv-dal8cibl550s73cja300`, Deploy `dep-dal8cijl550s73cja59g`**
  - Dashboard: `https://dashboard.render.com/web/srv-dal8cibl550s73cja300`
  - **URL: `https://rachit-portfolio-api.onrender.com`** (may be `-xxxx` suffix issue? NO — direct URL live, no suffix)
- **Verified (end-to-end):**
  - `GET /health` → 200 `{"status":"ok"}`
  - `POST /api/send-email` (bina Origin) → 200 `{"ok":true}` (real Resend mail bheja)
  - `POST` from `Origin: https://rachitportfolio-fawn.vercel.app` → 200 (CORS OK)
  - Preflight `OPTIONS` → 204 + `Access-Control-Allow-Origin: https://rachitportfolio-fawn.vercel.app`
  - Ek baar 404 aaya (transient cold-start), dusri try par sab 200 — free instance spin-up timing.
- **Vercel env:** `VITE_API_URL=https://rachitportfolio-api.onrender.com` (production) set + `vercel --prod` redeploy. Bundle me **Render URL inline verified** (`/assets/index-*.js`).
- **Ab contact form poora kaam karta hai:** Vercel (static) → Render API → Resend email. Architecture clean: **Vercel = frontend only, Render = backend only.**
- **AGENTS note:** `render.yaml` repo me hai (pehle ke liye) — service ab API se bani hai; agar kaheen Blueprint apply karna ho to **existing service ko update** select karein, dobara create NAHI (name conflict hoga).

### [v12 — Backend split: Render (API) + Vercel (frontend)] — 16 Sep 2026
- **Architecture split:** user ka plan = **Render = backend (API), Vercel = frontend (static)**.
- **`server/` (Naya, Render deploy):** Express server (plain JS, ES modules) — `server/index.js` + `server/package.json` (express, cors, dotenv, resend). Ends:
  - POST `/api/send-email` → Resend API se mail (same logic jo pehle Vercel function me thi)
  - GET `/health`
  - CORS sirf allowed origins (`rachitportfolio-fawn.vercel.app`, `localhost:5173`/`4173`)
  - `.env` se keys (dotenv/config), Render par dashboard env se. Port = `process.env.PORT || 3001`
  - **Local test done:** `/health` 200, POST send-email `{"ok":true}` (real Resend mail bheja).
- **`render.yaml` (Naya):** Render Blueprint — `rachit-portfolio-api` web service, `rootDir: server`, `buildCommand: npm install`, `startCommand: node index.js`, env `RESEND_API_KEY` + `CONTACT_EMAIL` (`sync: false` → dashboard se manually set).
- **Vercel serverless hata diya:** `api/send-email.ts` delete (backend ab sirf Render par). Vercel ab sirf static frontend.
- **Frontend call:** `EnquiryForm.tsx` ab `import.meta.env.VITE_API_URL || '/api/send-email'` fetch karta hai. `.env` me `VITE_API_URL=http://localhost:3001` (local dev). **Production me Vercel env `VITE_API_URL` = Render URL set karna hai + redeploy** — tab tak live Vercel deploy NAHI kiya (purana bundle + purana function abhi chal raha hai).
- **Post-recommit konverge (`10de4f3` ke baad):** user ne kaha — frontend Vercel par host karo, old backend delete karo. Done: `vercel --prod` se **naya static-only frontend live** (`https://rachitportfolio-fawn.vercel.app`, 200), old serverless API ab dead (`/api/send-email` → 405). ⚠️ **Contact form abhi TUTA hai** (koi API nahi) — Render deploy ke baad hi wapas chalega. Frontend ko wapas test karne ke liye Vercel env `VITE_API_URL` = Render URL chahiye.
- **Secrets:** `.env`, `server/.env` dono gitignored verified. `server/.env.example` + root `.env.example` committed (no values).
- ⚠️ **TODO awaiting user:** (1) Render par service deploy karna (dashboard steps AGENTS me below), (2) Render URL milne par Vercel env `VITE_API_URL` set + `vercel --prod`.

### [v11 — Vercel deploy LIVE] — 16 Sep 2026
- **Login:** `vercel login` ho gaya (`rachitsharma999088@gmail.com`, scope `rachit-09a3`). Project link: `rachitportfolio`.
- **Project name fix:** directory `RACHIT PORTFOLIO` (space) me `vercel link` fail hua → `vercel link --project rachitportfolio --yes` se link kiya.
- **Env (production, Secret type):** `RESEND_API_KEY` + `CONTACT_EMAIL` set hue (`vercel env add ... --value ... --yes`).
- **Deploy:** `vercel --prod --yes` → **LIVE at `https://rachitportfolio-fawn.vercel.app`** (alias). Direct URL: `https://rachitportfolio-cad161b0c-rachit-09a3.vercel.app`.
- **Verified:** `/` = 200, `/resume` = 200 (SPA rewrite works), `/rachit.jpg` = 200, `/api/send-email` POST = `{"ok":true}` (Resend test mail bheja).
- **GitHub connect nahi hua** (Login Connection nahi hai) — deploy CLI se hota hai ya `vercel git connect` baad me.
- `.vercel` folder pehle se gitignore me; Vercel ka auto `.env*` duplicate .gitignore se hata diya taaki `.env.example` tracked rahe.

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

- [x] Vercel deploy — **LIVE: `https://rachitportfolio-fawn.vercel.app`**
- [x] **Render deploy (backend):** service LIVE via REST API — **API: `https://rachit-api.onrender.com`** (dashboard: `https://dashboard.render.com/web/srv-dal9dd5g1s2s73em6lig`)
- [x] **Vercel env `VITE_API_URL`** = `https://rachit-api.onrender.com` set + `vercel --prod` redeploy (form ab Render se mail bhejta hai)
- [ ] GitHub deploy connect karna (optional, `vercel git connect`) — abhi CLI deploy hota hai
- [ ] LinkedIn real profile link lagana (`src/data.ts`)
- [ ] Instagram real profile link lagana (`src/data.ts`)
- [ ] `VIDEO_SRC` ko real video (HLS/MP4) se replace karna
- [ ] Resend email `from` abhi `onboarding@resend.dev` hai — custom domain verify karne par apna domain use kar sakte ho (`server/index.js`)
- [ ] "Coming soon" project cards ko real projects se replace karna
- [ ] API keys (`RENDER_API_KEY`, `RESEND_API_KEY`) chat me share hue — **optional: rotate karna** (safe side)
- [ ] 3 GitHub PATs (`ghp_`) chat me share hue — active wala `ghp_b9Z...` hai (workflow file usi se bani). **Optional: abhi tokens zinda hain, koi action zaroori nahi; par agar chaho to GitHub → Settings → Tokens se rotate karo.**

## ✅ Render Backend — DONE via REST API (no dashboard clicks)

- **Service (current):** `rachit-api` | ID `srv-dal9dd5g1s2s73em6lig`
- **URL:** `https://rachit-api.onrender.com` | Dashboard: `https://dashboard.render.com/web/srv-dal9dd5g1s2s73em6lig`
- Env (dashboard/API set): `RESEND_API_KEY`, `CONTACT_EMAIL`. autoDeploy=yes (push par auto redeploy).
- ⚠️ **Rationale for name change:** Previous service `rachit-portfolio-api` had persistent `x-render-routing: no-server` after free-tier spin-down (stale edge/DNS issue after service recreation). Fresh name `rachit-api` resolves this.
- ✅ **Keep-alive LIVE (v15):** GitHub Actions cron (`.github/workflows/keep-render-awake.yml`, `*/10 * * * *`) + client-side keepalive + form retry — sab **100% free**.

## 🖥️ GitHub Actions Cron — LIVE (keep-alive)

- **File:** `.github/workflows/keep-render-awake.yml` (v15, Contents API se banayi — git push `workflow` scope block karta hai, API se hota hai)
- **Schedule:** `*/10 * * * *` — har 10 min `https://rachit-api.onrender.com/health` ping
- **Test:** manual dispatch run → SUCCESS (step "Ping Render health endpoint" pass).
- **Run history:** https://github.com/digitalguru99908-dev/rachitportfolio/actions
- 💡 **Gotcha:** YAML upload se pehle `@'...'@` single-quoted here-string use karo — `@"..."@` me `$i/$code` wale variables gayab ho jaate hain. File UPDATE karne par `sha` field required hai.
- ⚠️ **USER RULE:** sab kam **free** — GitHub Actions free, Render free, Vercel free. Paisa maangne wale options (Render cron $1/mo, Vercel Pro) kabhi mat propose karna.

---
*Generated by opencode — har agent is file ko read/update karega.*