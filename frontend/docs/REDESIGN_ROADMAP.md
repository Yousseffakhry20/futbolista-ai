# Futbolista AI — Redesign Implementation Roadmap

> **Status**: Source of Truth for Implementation  
> **Target Alignment**: `docs/PRODUCT.md`, `docs/DESIGN.md`, `docs/PRESET.md`, `docs/UI_CRITERIA.md`, `docs/PAGES/Landing.md`, `docs/PAGES/Chat.md`  
> **Aesthetic Standard**: High-contrast Dark Monochrome (`#000000` canvas, `#0A0A0A` card surface, `#262626` subtle borders) + Precision Tactical Cyan (`#00E3E3`) highlights, Montserrat typography, 12px button radius, 20px card radius, 24px dialog radius.

---

## Phase 1: Environment, Directory Remediation & Design Tokens

### Dependencies
- Node.js environment, Vite build system, Tailwind CSS v4.

### Tasks
- [ ] **Task 1.1: Install Motion & Routing Dependencies**
  - Add `framer-motion` and `react-router-dom` to `package.json`.
  - **Measurable Benchmark**: `npm list framer-motion react-router-dom` returns exit code 0 with both packages listed.
- [ ] **Task 1.2: Remediate Path Aliases & Purge Misplaced Folder**
  - Remove root `frontend/@/` directory.
  - Update `components.json` path aliases (`components` -> `@/components`, `utils` -> `@/lib/utils`, `ui` -> `@/components/ui`).
  - Verify `vite.config.ts` alias resolution (`@` -> `./src`).
  - **Measurable Benchmark**: Zero imports reference root `@/`, and Vite resolves `@/components/ui` cleanly to `src/components/ui`.
- [ ] **Task 1.3: Overhaul Theme & CSS Tokens (`src/index.css`)**
  - Configure OKLCH/HSL CSS variables in `src/index.css` for Light and Dark modes matching `DESIGN.md`:
    - Canvas/Background: `#000000` (Dark) / `#FFFFFF` (Light)
    - Primary Tactical Cyan: `#00E3E3`
    - Secondary Cyan: `#06B6D4`
    - Purple Accent: `#7C3AED`
    - Card Surface: `#0A0A0A`
    - Border: `#262626`
    - Font Family: Montserrat (`--font-sans`), JetBrains Mono (`--font-mono` for data)
    - Radii: `--radius: 0.75rem` (12px buttons), `--radius-card: 1.25rem` (20px cards), `--radius-dialog: 1.5rem` (24px dialogs).
  - Remove hardcoded pitch-green (`#0b1e17`) CSS rules and fixed background grid images.
  - **Measurable Benchmark**: Inspecting `:root` and `.dark` in `index.css` confirms exact hex/OKLCH color mapping with zero pitch-green remnants.

### Phase 1 Completion Criteria
- [ ] Clean directory tree without root `@/` folder.
- [ ] Dependencies installed without peer conflict errors.
- [ ] `src/index.css` exposes all required design tokens matching `DESIGN.md`.

---

## Phase 2: Preset UI Primitives & Command Palette Infrastructure

### Dependencies
- Phase 1 completed.

### Tasks
- [ ] **Task 2.1: Rebuild Core Form & Container Primitives (`src/components/ui/`)**
  - Refactor `button.tsx`: 12px radius (`rounded-xl`), Tactical Cyan primary variant, dark outline variant, focus rings (`focus-visible:ring-2 focus-visible:ring-[#00E3E3]`).
  - Refactor `card.tsx`: 20px radius (`rounded-2xl`), `#0A0A0A` background, `#262626` border, subtle shadow.
  - Refactor `badge.tsx`: Tactical tags (Cyan, Purple, Muted).
  - Refactor `input.tsx` & `textarea.tsx`: High-contrast dark input surfaces with cyan focus glow.
  - **Measurable Benchmark**: All 5 core primitives compile with TypeScript without using hardcoded pitch-green classes.
- [ ] **Task 2.2: Build Structural & Accessible Primitives**
  - Add `sheet.tsx`: Slide-over drawer for mobile navigation and mobile chat sidebar.
  - Add `scroll-area.tsx`: Styled scrollbars for chat feeds and sidebar history.
  - Add `separator.tsx`: Subtle divider line (`#262626`).
  - Add `table.tsx`: Accessible HTML table primitives (`table`, `thead`, `tbody`, `tr`, `th`, `td`).
  - Add `dropdown-menu.tsx`: Export & settings dropdowns.
  - Add `tooltip.tsx`: Icon micro-interaction tooltips.
  - Add `skeleton.tsx`: Pulse loading blocks.
  - **Measurable Benchmark**: Every primitive exported from `src/components/ui/` passes oxlint checks cleanly.
- [ ] **Task 2.3: Build Global `⌘K` Command Palette Dialog (`src/components/ui/command.tsx` & `src/components/CommandMenu.tsx`)**
  - Implement accessible `Command` modal triggered by `⌘K` or `Ctrl+K`.
  - Include quick links to: Launch Chat, Compare Players, View Top xG Leaders, Toggle Theme, Keyboard Shortcuts.
  - **Measurable Benchmark**: Pressing `⌘K` anywhere in the app opens the Command Menu with keyboard focus inside the search input.

### Phase 2 Completion Criteria
- [ ] All 12 preset UI primitives implemented in `src/components/ui/`.
- [ ] `CommandMenu` opens reliably via `⌘K` keyboard event listener.

---

## Phase 3: Landing Page & Interactive Sandbox Implementation

### Dependencies
- Phase 2 completed.

### Tasks
- [ ] **Task 3.1: Build Navigation Header (`src/components/landing/Navbar.tsx`)**
  - Sticky glassmorphism container (`backdrop-blur-md bg-black/80 border-b border-border/40`).
  - Logo ("Futbolista AI"), navigation links (Features, Pricing, About), `⌘K` Quick Search trigger button, Sign Up CTA.
  - Mobile responsive hamburger button triggering `Sheet` drawer.
  - **Measurable Benchmark**: Header stays fixed on scroll; mobile hamburger opens drawer on viewports <640px.
- [ ] **Task 3.2: Build Hero Section with Interactive Sandbox (`src/components/landing/Hero.tsx`)**
  - Headline: "AI-Powered Football Intelligence".
  - Subheadline: "Analyze players, compare performances, scout talents, and discover football insights using natural language."
  - Primary CTA ("Start Free" -> `/app`) and Secondary CTA ("Watch Demo").
  - **Interactive Live Query Sandbox**: Interactive card widget allowing visitors to type queries or click prompt chips ("Compare Vinicius vs Mbappé") to render live simulated chart outputs.
  - **Measurable Benchmark**: Clicking any prompt chip in the Hero sandbox updates the preview chart within 150ms.
- [ ] **Task 3.3: Build Benefits Grid (`src/components/landing/BenefitsGrid.tsx`)**
  - 3-column responsive card grid: Player Analysis, Team Insights, Talent Discovery.
  - Uses 20px card radius (`rounded-2xl`), subtle hover scale (`1.015`), and Lucide icons.
  - **Measurable Benchmark**: Grid displays 3 columns on desktop (>1024px), 2 on tablet, and 1 on mobile (<640px).
- [ ] **Task 3.4: Build Example Prompts Playground (`src/components/landing/ExamplePrompts.tsx`)**
  - 4 chat-inspired prompt cards featuring real tactical queries.
  - Includes "Copy Query" and "Try in Chat ↗" interactive buttons.
  - **Measurable Benchmark**: Clicking "Try in Chat" redirects to `/app` with the pre-filled prompt.
- [ ] **Task 3.5: Build Feature Showcase Terminal (`src/components/landing/FeatureShowcase.tsx`)**
  - Tabbed terminal interface switching between 4 analytical modules: AI Tactical Chat, Radar Visualizations, Scouting Reports, Raw Data Export.
  - Uses Shadcn `Tabs` primitive with smooth tab transitions.
  - **Measurable Benchmark**: Switching tabs renders corresponding live interactive UI preview without layout shifting.
- [ ] **Task 3.6: Build Social Proof & Transparency Bar (`src/components/landing/SocialProof.tsx`)**
  - Metric counters: 100k+ Seasons Indexed, Sub-500ms Query Latency, 100% Understat Data Fidelity.
  - Clean high-contrast typography.
  - **Measurable Benchmark**: Text contrast satisfies WCAG AA (>= 4.5:1 ratio).
- [ ] **Task 3.7: Build Final CTA & Footer (`src/components/landing/FinalCTA.tsx`, `Footer.tsx`)**
  - High-impact banner with Tactical Cyan primary CTA.
  - Footer with legal links, logo, and keyboard shortcut guide (`⌘K` to search, `⌘N` for new chat).
  - **Measurable Benchmark**: Footer links render correctly and align on desktop and mobile.
- [ ] **Task 3.8: Assemble Landing Page View (`src/pages/LandingPage.tsx`)**
  - Combine all 7 sections into a seamless full-page layout.
  - Configure route `/` in `react-router-dom`.
  - **Measurable Benchmark**: Landing page loads cleanly at `/` with zero console warnings or layout bugs.

### Phase 3 Completion Criteria
- [ ] All 8 PRD-required Landing Page sections implemented and visually verified.
- [ ] Interactive Sandbox in Hero functioning correctly.
- [ ] Responsive navigation working across mobile, tablet, and desktop viewports.

---

## Phase 4: Chat Application & Dual-View Analytics Overhaul

### Dependencies
- Phase 3 completed.

### Tasks
- [ ] **Task 4.1: Build Collapsible Chat Sidebar (`src/components/chat/ChatSidebar.tsx`)**
  - 260px desktop sidebar and mobile `Sheet` drawer.
  - `⌘N` New Chat primary button.
  - Chat history grouped by Today, Yesterday, Previous 7 Days.
  - Search filter input for past queries.
  - User Settings & API key drawer trigger at bottom.
  - **Measurable Benchmark**: Pressing `⌘B` or clicking toggle button collapses/expands the desktop sidebar cleanly over 200ms.
- [ ] **Task 4.2: Build Workspace Header (`src/components/chat/ChatHeader.tsx`)**
  - Sidebar toggle button with hotkey indicator.
  - Editable active conversation title.
  - "Live Understat DB ⚡" dataset badge.
  - Export Dropdown Menu (Export as CSV, Copy Markdown, Download PNG Chart).
  - **Measurable Benchmark**: Selecting "Export CSV" formats current message dataset into a downloadable `.csv` file.
- [ ] **Task 4.3: Build Interactive Empty State (`src/components/chat/EmptyState.tsx`)**
  - Welcome hero banner with Futbolista AI branding.
  - Categorized 2x2 grid of prompt suggestions (Player Comparison, Scouting, Tactical Analytics, Season Trends) with hotkey indicators (`1`, `2`, `3`, `4`).
  - **Measurable Benchmark**: Pressing `1` or clicking the first card submits "Compare Vinicius Jr. and Kylian Mbappé".
- [ ] **Task 4.4: Build Dual-View Message Stream (`src/components/chat/MessageItem.tsx`, `MarkdownRenderer.tsx`)**
  - User message: Right-aligned dark slate bubble.
  - Assistant message: Markdown renderer (supporting bolding, lists, code blocks), collapsible SQL/thought log, and **Dual-View Chart & Accessible Data Table**:
    - Chart View: High-contrast Recharts graph.
    - Table View: Accessible HTML table (`role="table"`) listing exact player names, teams, minutes, xG, xA.
  - Action bar: Copy response, Toggle Chart/Table, Download CSV, Retry Query.
  - **Measurable Benchmark**: Toggling between Chart and Table views switches rendering instantly without state loss.
- [ ] **Task 4.5: Build Sticky Input Bar with Smart Autoscroll (`src/components/chat/ChatInputBar.tsx`)**
  - Sticky glassmorphism container (`backdrop-blur-md bg-black/80`).
  - Auto-resizing `Textarea` with `⌘ + Enter` submit handler.
  - Optional Voice Input toggle button.
  - **Smart Autoscroll Pause**: If user scrolls up while AI streams, autoscroll pauses and displays floating badge `"New data below ↓"`.
  - **Measurable Benchmark**: User scrolling up during message generation displays floating badge; clicking badge smooth-scrolls to bottom.
- [ ] **Task 4.6: Assemble Chat App View & Route (`src/pages/ChatPage.tsx`)**
  - Assemble Sidebar, Workspace Header, Message Feed, and Sticky Input into complete workspace layout.
  - Configure route `/app` in `react-router-dom`.
  - **Measurable Benchmark**: Chat App operates seamlessly at `/app` with message history persistence in `localStorage`.

### Phase 4 Completion Criteria
- [ ] Full Chat App workflow functional at `/app`.
- [ ] Dual-view (Chart vs Data Table) rendering operational on all assistant responses.
- [ ] Smart autoscroll pause working reliably during text streaming.

---

## Phase 5: Motion Polish, Responsiveness & Accessibility Verification

### Dependencies
- Phase 4 completed.

### Tasks
- [ ] **Task 5.1: Integrate Framer Motion Animations**
  - Staggered scroll entrance reveals for Landing page sections (`y: 16 -> 0`, `opacity: 0 -> 1` over 200ms).
  - Smooth message entrance animation in chat thread.
  - **Measurable Benchmark**: All transitions execute within 150ms–300ms without dropped frames (60fps animation).
- [ ] **Task 5.2: Mobile Ergonomics & Viewport Resilience Tuning**
  - Enforce `h-[100dvh]` on layout containers to prevent mobile address bar jumping.
  - Apply `pb-safe` (`env(safe-area-inset-bottom)`) to fixed bottom inputs.
  - Verify all touch targets meet 44x44px minimum sizing.
  - **Measurable Benchmark**: Zero horizontal scrollbars on viewports down to 320px width.
- [ ] **Task 5.3: Accessible WCAG 2.1 AA & Screen Reader Verification**
  - Verify contrast ratios across all text elements (>= 4.5:1 ratio).
  - Ensure Chat message feed includes `role="log"` and `aria-live="polite"`.
  - Confirm keyboard focus ring (`focus-visible:ring-2 focus-visible:ring-[#00E3E3]`) on all interactive controls.
  - **Measurable Benchmark**: Automated a11y audit tools return zero critical contrast or ARIA violations.
- [ ] **Task 5.4: End-to-End Build & Syntax Verification**
  - Execute `npm run build` to verify TypeScript compilation and Vite bundling.
  - Execute `npm run lint` (`oxlint`) to ensure zero syntax errors.
  - **Measurable Benchmark**: `npm run build` completes with exit code 0 and produces clean production build output.

### Phase 5 Completion Criteria
- [ ] Production build succeeds without errors.
- [ ] Mobile responsive layout verified across mobile, tablet, and desktop viewports.
- [ ] Accessibility criteria fully satisfied.

---

## Summary Matrix

| Phase | Core Deliverable | Target Route | Measurable Success Metric |
| :--- | :--- | :--- | :--- |
| **Phase 1** | Architecture, Dependencies & Theme Tokens | N/A | Clean directory, zero pitch-green CSS, OKLCH tokens set |
| **Phase 2** | Preset UI Primitives & ⌘K Menu | Global | 12 primitives in `src/components/ui/`, ⌘K opens palette |
| **Phase 3** | Landing Page & Interactive Hero Sandbox | `/` | 8 PRD sections built, interactive sandbox updating in <150ms |
| **Phase 4** | Chat App, Dual-View & Smart Autoscroll | `/app` | Collapsible sidebar, Markdown + Chart/Table dual view working |
| **Phase 5** | Motion Polish, A11y & Build Verification | All | `npm run build` succeeds cleanly with 0 errors |
