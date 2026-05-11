# CLAUDE.md — ML Career Hub · Project Intelligence File

> **This file is the single source of truth for any AI agent (Claude Code, Copilot, Cursor, etc.) working on this repository.**
> Read this entire file before making any change. Do not skip sections.

---

## 1. Project Overview

**ML Career Hub** is a personal career & learning tracker built for a single user (Anant Tripathi) targeting DS / ML Engineer / AI Engineer / MLOps roles in India.

| Property | Value |
|---|---|
| App type | Single-page React application (SPA) |
| Primary user | Anant Tripathi — Project Leader at Axtria, BITS Pilani EE, UT Austin PGP |
| Target roles | Data Scientist, ML Engineer, AI Engineer, MLOps Engineer |
| Geography focus | India job market (Bangalore, Hyderabad, Pune, Gurugram, Mumbai, Chennai) |
| Live URL | `https://ds-ai-ml-job-roadmap.vercel.app` |
| Repository | `https://github.com/ananttripathi/ds-ai-ml-job-roadmap` |

---

## 2. Tech Stack

| Layer | Technology | Version | Notes |
|---|---|---|---|
| Frontend framework | React | 18.3.x | Functional components + hooks only. No class components. |
| Build tool | Vite | 5.x | Config in `vite.config.js`. Alias `@` → `src/` |
| Styling | TailwindCSS | 3.4.x | Dark mode via `class` strategy. Custom classes in `src/index.css` |
| Routing | React Router DOM | 6.x | `BrowserRouter` + `Routes`. SPA rewrites handled via `vercel.json` |
| Database | Supabase PostgreSQL | — | All data operations go through `@supabase/supabase-js` v2 |
| Auth | Supabase Auth | — | Google OAuth + email/password. Session managed via `AuthContext` |
| State | React Context + useState | — | No Redux, no Zustand. Keep it simple. |
| Hosting | Vercel | — | Auto-deploy on push to `main` |

---

## 3. Environment Variables

These are **never committed** — they live in `.env` locally and in Vercel dashboard for production.

```
VITE_SUPABASE_URL       = https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY  = eyJ...
```

**Rules:**
- Never hardcode these values anywhere in source code
- Never log them to console
- Always access via `import.meta.env.VITE_*`
- The Supabase client is instantiated once in `src/lib/supabase.js` — import from there everywhere

---

## 4. Project Structure

```
ds-ai-ml-job-roadmap/
├── CLAUDE.md                      ← YOU ARE HERE
├── README.md                      ← User-facing deploy instructions
├── supabase_schema.sql            ← Full DB schema (run once in Supabase SQL editor)
├── .env.example                   ← Template for env vars
├── .env                           ← Local secrets (gitignored)
├── .gitignore
├── vercel.json                    ← SPA rewrite rule {"rewrites":[{"source":"/(.*)","destination":"/index.html"}]}
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── index.html
└── src/
    ├── main.jsx                   ← ReactDOM.createRoot entry
    ├── App.jsx                    ← Router, AuthGate, ProtectedRoutes
    ├── index.css                  ← Tailwind directives + custom utility classes
    ├── lib/
    │   ├── supabase.js            ← Single Supabase client instance
    │   └── constants.js           ← ALL static data (courses, topics, companies, categories)
    ├── context/
    │   ├── AuthContext.jsx        ← useAuth hook — user, profile, signIn, signOut
    │   └── ThemeContext.jsx       ← useTheme hook — dark/light toggle
    ├── hooks/
    │   └── useSeed.js             ← Seeds default topics + goal categories on first login
    ├── components/
    │   ├── layout/
    │   │   ├── Layout.jsx         ← Wraps pages with Sidebar
    │   │   └── Sidebar.jsx        ← Nav, theme toggle, user avatar, sign out
    │   └── ui/
    │       ├── Modal.jsx          ← Reusable modal (ESC to close, click-outside to close)
    │       └── Spinner.jsx        ← Loading spinner
    └── pages/
        ├── AuthPage.jsx           ← Login + Register (Google OAuth + email/password)
        ├── DashboardPage.jsx      ← Overview metrics, progress bars, streak heatmap
        ├── SyllabusPage.jsx       ← Course accordion, topic status toggle, search/filter
        ├── ApplicationsPage.jsx   ← Kanban board + list view, add/edit/delete applications
        ├── GoalsPage.jsx          ← Daily goals, categories, streak log, weekly stats
        ├── NotesPage.jsx          ← Note cards grid, tags, note viewer panel
        └── CompaniesPage.jsx      ← Sortable/filterable table, add company modal, "Track" button
```

---

## 5. Database Schema

All tables have **Row Level Security (RLS)** enabled. Every table has a `user_id` FK to `profiles.id`.
Users can only read/write their own rows. Never bypass RLS.

### Tables

#### `profiles`
Auto-created by trigger on `auth.users` insert.
```sql
id          uuid  PK (= auth.users.id)
full_name   text
email       text
avatar_url  text
created_at  timestamptz
```

#### `topics`
Syllabus tracker. 80 rows seeded on first login via `useSeed.js`.
```sql
id          uuid  PK
user_id     uuid  FK → profiles
name        text
course_id   text        -- matches COURSES[].id in constants.js
course_name text
status      text        -- 'not_started' | 'in_progress' | 'done'
notes       text
created_at  timestamptz
updated_at  timestamptz (auto-updated by trigger)
```

#### `companies`
178 preset companies loaded on demand + user-added companies.
```sql
id              uuid  PK
user_id         uuid  FK → profiles
name            text
tier            text        -- e.g. 'Big Tech', 'Unicorn', 'Finance'
tier_number     integer     -- 1–14 for sorting
work_mode       text        -- 'Hybrid' | 'Remote' | 'WFO'
india_cities    text
salary_range    text        -- e.g. '₹30–75 LPA'
difficulty      text        -- 'Hard' | 'Medium-Hard' | 'Medium' | 'Approachable'
roles           text
total_rounds    text
coding_rounds   text
ml_rounds       text
sys_design      text
bq_rounds       text
take_home       boolean
timeline_weeks  text
interview_tips  text
careers_url     text
is_preset       boolean     -- true = from the 178 preset list
created_at      timestamptz
updated_at      timestamptz
```

#### `applications`
Job application pipeline (Kanban).
```sql
id              uuid  PK
user_id         uuid  FK → profiles
company_name    text
role            text
status          text  -- 'watchlist'|'applied'|'interviewing'|'offered'|'rejected'
applied_date    date
interview_round integer
notes           text
job_url         text
salary_offered  text
tier            text
created_at      timestamptz
updated_at      timestamptz
```

#### `goals`
Daily goals. Scoped by `goal_date` (ISO date string).
```sql
id          uuid  PK
user_id     uuid  FK → profiles
text        text
category    text
done        boolean
goal_date   date
created_at  timestamptz
```

#### `streak_log`
One row per user per day they log study. Unique constraint on `(user_id, log_date)`.
```sql
id          uuid  PK
user_id     uuid  FK → profiles
log_date    date
created_at  timestamptz
```

#### `notes`
Freeform study notes with tags array.
```sql
id          uuid  PK
user_id     uuid  FK → profiles
title       text
body        text
tags        text[]
created_at  timestamptz
updated_at  timestamptz
```

#### `goal_categories`
Per-user customizable goal categories. 9 seeded on first login.
```sql
id          uuid  PK
user_id     uuid  FK → profiles
name        text
color       text  -- hex color
created_at  timestamptz
UNIQUE (user_id, name)
```

---

## 6. Routing Map

| Path | Page | Auth required |
|---|---|---|
| `/auth` | AuthPage | No (redirects to `/` if already logged in) |
| `/` | DashboardPage | Yes |
| `/syllabus` | SyllabusPage | Yes |
| `/applications` | ApplicationsPage | Yes |
| `/goals` | GoalsPage | Yes |
| `/notes` | NotesPage | Yes |
| `/companies` | CompaniesPage | Yes |

`App.jsx` handles the auth gate. Any unauthenticated request to a protected route redirects to `/auth`.

---

## 7. Design System

### Color tokens (Tailwind classes used throughout)

| Semantic | Light mode | Dark mode |
|---|---|---|
| App background | `bg-neutral-50` | `bg-neutral-950` |
| Card background | `bg-white` | `bg-neutral-900` |
| Sidebar background | `bg-neutral-50` | `bg-neutral-900` |
| Border | `border-neutral-100` | `border-neutral-800` |
| Primary text | `text-neutral-900` | `text-white` |
| Secondary text | `text-neutral-500` | `text-neutral-400` |
| Muted text | `text-neutral-400` | `text-neutral-600` |
| Primary accent (light) | `bg-neutral-900` | — |
| Primary accent (dark) | — | `bg-brand-500` (#6366f1 indigo) |
| Progress bar fill | `bg-neutral-900` | `bg-brand-500` |

### Dark mode strategy
- Controlled by `ThemeContext` — adds/removes `dark` class on `<html>`
- Persisted to `localStorage` under key `theme`
- Always write both `bg-X` and `dark:bg-Y` classes when styling

### Typography
- Font: Inter (Google Fonts, loaded in `index.html`)
- Antialiased via `body { -webkit-font-smoothing: antialiased }`

### Custom CSS classes (defined in `src/index.css`)
These are pre-built component classes — always prefer these over raw Tailwind when available:

```
.sidebar          Sidebar container
.main-content     Main area (margin-left: 200px)
.topbar           Sticky top bar (height: 52px)
.page-body        Main scrollable content area (p-6)
.card             White/dark card with border and radius
.metric-card      Lighter metric card (used on dashboard)
.btn-primary      Primary action button (black/indigo)
.btn-secondary    Secondary button (neutral)
.btn-ghost        Ghost/text button
.nav-item         Sidebar nav link
.nav-item.active  Active nav state
.input            Form text input
.select           Form select dropdown
.modal-overlay    Full-screen modal backdrop
.modal-box        Modal container
.prog-track       Progress bar track
.prog-fill        Progress bar fill
.divider          Horizontal rule

Status badges:
.badge-done         Green — topic done
.badge-progress     Amber — topic in progress
.badge-not          Grey — not started
.badge-watchlist    Grey — job watchlist
.badge-applied      Blue — applied
.badge-interviewing Violet — interviewing
.badge-offered      Green — offered
.badge-rejected     Red — rejected
.badge-hybrid       Amber — hybrid work mode
.badge-remote       Green — remote
.badge-wfo          Red — work from office
```

---

## 8. Key Constants (src/lib/constants.js)

All static data lives here. **Never duplicate this data elsewhere in the codebase.**

| Export | Description |
|---|---|
| `COURSES` | Array of 29 courses — `{id, name, number}` |
| `DEFAULT_TOPICS` | 80 topics seeded on first login |
| `PRESET_COMPANIES` | 178 India-market companies with full details |
| `DEFAULT_CATEGORIES` | 9 goal categories seeded on first login |
| `STATUS_LABEL` | Maps topic status keys → display strings |
| `APP_STATUS_LABEL` | Maps application status keys → display strings |
| `DIFFICULTY_EMOJI` | Maps difficulty → emoji (🔴🟠🟡🟢) |
| `TIERS` | All company tier strings |
| `INDIA_CITIES` | City filter options |

---

## 9. Data Flow Patterns

### Reading data
Always use `useEffect` + `supabase.from().select()`. Filter by `user_id` = `user.id` from `useAuth()`.

```jsx
const { user } = useAuth()

useEffect(() => {
  async function load() {
    const { data, error } = await supabase
      .from('topics')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    if (!error) setTopics(data)
  }
  if (user) load()
}, [user])
```

### Writing data
Always include `user_id` in insert payloads. Use optimistic UI updates for status changes.

```jsx
// Optimistic update pattern (used in SyllabusPage, ApplicationsPage)
setTopics(prev => prev.map(t => t.id === id ? { ...t, status } : t))
await supabase.from('topics').update({ status }).eq('id', id)
```

### Upsert (streak_log)
```jsx
await supabase.from('streak_log').upsert(
  { user_id: user.id, log_date: today },
  { onConflict: 'user_id,log_date' }
)
```

---

## 10. Feature Specifications

### Dashboard (`/`)
- 4 metric cards: syllabus %, in-progress topics count, applications count, streak days
- Syllabus progress: bar chart per course (top 8 by topic count)
- Application pipeline: horizontal bars per status (watchlist→offered→rejected)
- Streak heatmap: 30 days, filled = `streak_log` row exists for that date
- "Log study" button → upserts today's date to `streak_log`
- Greeting changes by time of day (morning/afternoon/evening)

### Syllabus (`/syllabus`)
- Groups topics by course using `COURSES` order
- Each course row shows: course number, name, progress bar, expand/collapse chevron
- Topic row: status dot, name, status dropdown (inline update), course label
- Filters: search (name match), course dropdown, status pills (All / Not started / In progress / Done)
- "Add topic" modal: name + course selector
- Default: all courses expanded (controlled by `openCourses` state object, default `true`)

### Applications (`/applications`)
- Kanban view (default): 5 columns — Watchlist / Applied / Interviewing / Offered / Rejected
- List view: flat list with status filter pills
- Each card: company, role, tier badge, applied date, interview round, status dropdown, delete
- Cards with `status === 'interviewing'` get left violet border
- Cards with `status === 'offered'` get left green border
- "Add application" modal: all fields in `applications` table
- "+ Track" button on Companies page → inserts a `watchlist` application

### Goals (`/goals`)
- Goals are scoped to `goal_date = today` (ISO string)
- Toggle done: optimistic update + Supabase update
- Categories: per-user, seeded with 9 defaults, user can add/delete
- Streak grid: 30 cells, dark = studied, light = not
- Weekly stats: count goals set + done + % completion for last 7 days
- "Mark studied" button → same `streak_log` upsert as Dashboard

### Notes (`/notes`)
- Grid of cards (3 columns on large screens)
- Click card → opens viewer panel on the right
- Tags: color-coded using `TAG_COLORS` array (10 colors, cycled by index)
- Add/edit modal: title, body (textarea), tags (add via input + Enter key)
- Search: filters across title, body, and tags

### Companies (`/companies`)
- First load: empty state with two CTAs — "Load 178 preset companies" + "Add manually"
- "Load 178 preset companies" button → calls `seedPreset()` which inserts `PRESET_COMPANIES` in batches of 50
- Table columns: Company, Tier, City (first city only), Mode, Salary, Difficulty, Roles, Actions
- Actions (visible on row hover): "+ Track" (→ creates watchlist application) + "✕" (delete)
- Click row → opens edit modal with all company fields
- Filters: Tier dropdown, Mode dropdown, City dropdown, search input
- Sort: click column header to sort asc/desc

### Auth (`/auth`)
- Split layout: left = brand panel (dark), right = auth form
- Tab toggle between Login and Register
- Google OAuth: calls `supabase.auth.signInWithOAuth({ provider: 'google' })`
- Email auth: `signInWithPassword` (login) or `signUp` (register)
- After login, `useSeed` hook fires once per user to seed topics + categories
- `AuthContext` provides: `user`, `profile`, `loading`, `signInWithGoogle`, `signInWithEmail`, `signUpWithEmail`, `signOut`

---

## 11. Coding Rules — MUST FOLLOW

### General
- **No class components.** Functional components + hooks only.
- **No prop drilling beyond 2 levels.** Use context or pass through component composition.
- **No inline styles** except for dynamic values (e.g. `style={{ width: \`${pct}%\` }}`).
- **No console.log** in committed code.
- **No hardcoded user IDs, emails, or secrets** anywhere.
- Always handle loading and error states — never leave a blank screen.
- Use `async/await` not `.then()` chains.

### Supabase
- Always filter by `user_id` — never fetch all rows from any table.
- Always destructure `{ data, error }` and check `error` before using `data`.
- Always include `user_id` in insert payloads.
- Use optimistic UI updates for status toggles (topic status, app status, goal done toggle).
- For streak, use `.upsert()` with `onConflict: 'user_id,log_date'`.

### Styling
- Use custom classes from `index.css` first (`.btn-primary`, `.card`, `.input`, etc.).
- Dark mode: always write `dark:` variants alongside light variants.
- Never use `!important`.
- Never hardcode colors — use Tailwind tokens or CSS variables.

### Components
- Keep pages self-contained — data fetching, state, and render all in the page file.
- `Modal.jsx` handles ESC key and backdrop click — always use it for overlays.
- `Spinner.jsx` for loading states inside pages.

### File naming
- Pages: `PascalCase` + `Page` suffix → `DashboardPage.jsx`
- Components: `PascalCase` → `Sidebar.jsx`, `Modal.jsx`
- Hooks: `camelCase` + `use` prefix → `useSeed.js`
- Utils/lib: `camelCase` → `supabase.js`, `constants.js`

---

## 12. Common Tasks for Claude Code

### Add a new page
1. Create `src/pages/NewPage.jsx`
2. Add route in `src/App.jsx` inside `<ProtectedRoutes>`
3. Add nav item in `src/components/layout/Sidebar.jsx` `NAV` array
4. Add DB table in `supabase_schema.sql` if needed (and run in Supabase)

### Add a new field to an existing table
1. Run `ALTER TABLE` in Supabase SQL editor
2. Update the form state + modal in the relevant page file
3. Update the insert/update payload
4. No migration files needed — Supabase handles schema via dashboard

### Add a new company tier
1. Add to `TIERS` array in `src/lib/constants.js`
2. No other changes needed — dropdowns pull from `TIERS`

### Add a new goal category for all new users
1. Add to `DEFAULT_CATEGORIES` in `src/lib/constants.js`
2. `useSeed.js` will insert it for any new user on first login
3. Existing users won't get it automatically (they manage categories themselves)

### Add a new syllabus course
1. Add to `COURSES` array in `src/lib/constants.js` with next `number`
2. Add default topics to `DEFAULT_TOPICS` with matching `course_id`
3. New users get these automatically; existing users can add topics manually

### Fix a Supabase permission error
- Check that the table has RLS enabled
- Check that the policy uses `auth.uid() = user_id`
- Check that the insert payload includes `user_id: user.id`

### Deploy a change
```bash
git add .
git commit -m "type: description"
git push origin main
# Vercel auto-deploys from main — live in ~60 seconds
```

---

## 13. What NOT to Do

- ❌ Don't add Redux, MobX, Zustand, or any other state library — Context + useState is intentional
- ❌ Don't add a custom backend / Express server — Supabase handles everything
- ❌ Don't install UI component libraries (MUI, shadcn, Ant Design) — custom Tailwind design system is intentional
- ❌ Don't change the Tailwind dark mode strategy from `class` to `media`
- ❌ Don't add authentication providers other than Google + email without updating Supabase dashboard first
- ❌ Don't modify `supabase_schema.sql` retroactively — it's a one-time setup file. Write new `ALTER TABLE` statements separately
- ❌ Don't fetch data without `user_id` filter — will expose other users' data
- ❌ Don't commit `.env` — it's gitignored for a reason
- ❌ Don't rename the `VITE_` prefix on env vars — Vite requires it for browser exposure
- ❌ Don't use `localStorage` for app data — Supabase is the source of truth for everything except theme preference

---

## 14. Commit Message Convention

```
feat: add interview notes field to companies
fix: streak heatmap not showing today's log
style: adjust sidebar nav active state for dark mode
refactor: extract streak logic into useStreak hook
chore: update supabase-js to latest
docs: update CLAUDE.md with new companies schema
```

Format: `type: short description` (no capital, no period)
Types: `feat` `fix` `style` `refactor` `chore` `docs` `perf`

---

## 15. Current Known Limitations / Future Work

| Item | Status | Notes |
|---|---|---|
| Mobile responsive layout | Not yet done | Sidebar collapses on mobile needed |
| Export data to CSV/JSON | Not yet done | Useful for syllabus progress export |
| Email reminders | Not yet done | Would need Supabase Edge Functions + Resend |
| Public progress page | Not yet done | Share `/u/anant` style public dashboard |
| 178 companies pre-seeded | Manual trigger | User clicks "Load 178 preset companies" on Companies page |
| LeetCode problem tracker | Not yet done | Could be a sub-page under Syllabus |
| Interview prep notes per company | Not yet done | Link notes to a specific company |
| Offline support | Not yet done | PWA + service worker |

---

*Last updated: May 2026 · Owner: Anant Tripathi · Repo: ananttripathi/ds-ai-ml-job-roadmap*
