# Understat MVP — chat-driven player stats

A minimal full-stack app: ask a football stats question in plain English, get a
grounded answer + chart pulled straight from your Supabase data (scraped from
Understat). Built as discussed:

```
React (Vite + Tailwind + shadcn-style UI + Recharts)
        │  POST /api/chat  { message, history }
        ▼
Express backend (TypeScript)
        │  Groq (Llama 3.3 70B) — tool calling
        ├─ getTopPlayers(stat, limit, season, position, team, min_minutes)
        │      → queries Postgres via Prisma, returns real rows
        └─ renderChart(chart_type, title, x_key, y_key)
               → just declares HOW to draw it
        ▼
Response: { text, chartSpec, data }
        │  text  = LLM's natural-language summary
        │  data  = raw DB rows (ground truth)
        │  chartSpec = LLM's chart intent
        ▼
Frontend renders text + a Recharts chart from `data` — never from `text`.
```

**Why this shape:** the LLM never sees your database credentials and never
invents the numbers that end up in the chart. It only ever chooses *which*
tool to call and *how* to phrase the summary. The actual stat values always
come straight from `getTopPlayers`'s Prisma query.

## Project structure

```
backend/    Express API (TypeScript), Groq tool-calling orchestration, Prisma queries
frontend/   Vite + React + TS, Tailwind v4, shadcn-style components, Recharts
```

## 1. Backend setup

```bash
cd backend
cp .env.example .env
# fill in DATABASE_URL, DIRECT_URL, GROQ_API_KEY
npm install   # already run for you if you got this from the assistant
npm run prisma:generate   # generates the Prisma client into src/generated/prisma
npm run dev   # http://localhost:8787
```

### ⚠️ Match this to your actual schema
Everything about your DB is in **one file**: `backend/src/statMap.ts`. The
backend reads stats from the `PlayerSeasonStats` model in
`backend/prisma/schema.prisma` (one row per player per team per season, scraped
from Understat), joined to `Player`, `Team` and `Season`. Open `statMap.ts` and
update `STAT_COLUMNS` (friendly stat name → Prisma field name) to match your
real model/column names — nothing else in the backend needs to change.

Also confirm in Supabase that the tables exist and that `DATABASE_URL` points
at a role with read access.

## 2. Frontend setup

```bash
cd frontend
cp .env.example .env   # VITE_API_BASE_URL=http://localhost:8787
npm install             # already run for you if you got this from the assistant
npm run dev              # http://localhost:5173
```

## Try it
With both servers running, ask things like:
- "Top 10 players by xG this season"
- "Best xA midfielders at Arsenal"
- "Who leads in non-penalty goals, minimum 900 minutes?"

## Extending this MVP
- **Add more tools**: e.g. `getPlayerTimeline(player, stat)` for a season-by-season
  line chart, or `comparePlayers([names], stat)` for a grouped bar chart.
- **Add caching**: identical `getTopPlayers` calls (same stat/filters) are pure
  reads — cache them for a few minutes to cut down on database calls.
- **Streaming**: Groq supports streaming completions; swapping the final
  summary call to stream would make the UI feel snappier for longer answers.
- **Auth**: this MVP has no auth on `/api/chat` — fine for a personal project,
  but add a simple API key or Supabase auth check before deploying publicly.
