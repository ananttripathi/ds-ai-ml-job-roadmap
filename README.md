# ML Career Hub

Personal tracker for DS · ML Engineer · AI Engineer · MLOps roles.

**Features:** Syllabus tracker (500+ topics) · Job application Kanban · 178 India company database · Daily goals with streak heatmap · Study notes · Dark/light mode · Cross-device sync via Supabase

---

## Deploy in 4 steps (~20 minutes)

### Step 1 — Supabase (database + auth)

1. Go to [supabase.com](https://supabase.com) → New project
2. Name it `ml-career-hub`, choose a strong password, pick region **ap-south-1 (Mumbai)**
3. Wait ~2 minutes for project to provision
4. Go to **SQL Editor → New query**
5. Paste the entire contents of `supabase_schema.sql` → click **Run**
6. Go to **Authentication → Providers → Google**
   - Enable Google, add your OAuth credentials from [console.cloud.google.com](https://console.cloud.google.com)
   - Authorized redirect URI: `https://<your-supabase-project-ref>.supabase.co/auth/v1/callback`
7. Go to **Project Settings → API**
   - Copy **Project URL** and **anon/public key** — you'll need these in Step 3

### Step 2 — Push code to GitHub

```bash
# Clone your repo (or cd into it if already cloned)
git clone https://github.com/ananttripathi/ds-ai-ml-job-roadmap.git
cd ds-ai-ml-job-roadmap

# Copy all files from this folder into the repo
# (drag and drop from the downloaded zip, or copy manually)

git add .
git commit -m "feat: add ML Career Hub tracker app"
git push origin main
```

### Step 3 — Vercel (hosting)

1. Go to [vercel.com](https://vercel.com) → Add New Project
2. Import `ananttripathi/ds-ai-ml-job-roadmap` from GitHub
3. Framework: **Vite** (auto-detected)
4. Add environment variables:
   ```
   VITE_SUPABASE_URL       = https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY  = eyJ...
   ```
5. Click **Deploy** — done in ~60 seconds
6. Your app is live at `ds-ai-ml-job-roadmap.vercel.app`

### Step 4 — Add Vercel URL to Supabase auth

1. In Supabase → **Authentication → URL Configuration**
2. Site URL: `https://ds-ai-ml-job-roadmap.vercel.app`
3. Redirect URLs: add `https://ds-ai-ml-job-roadmap.vercel.app/**`

---

## Local development

```bash
# Install dependencies
npm install

# Create .env from example
cp .env.example .env
# Fill in your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY

# Start dev server
npm run dev
# App runs at http://localhost:5173
```

## Tech stack

| Layer    | Technology |
|----------|-----------|
| Frontend | React 18 + Vite + TailwindCSS |
| Auth     | Supabase Auth (Google + Email) |
| Database | Supabase PostgreSQL |
| Hosting  | Vercel (free) |

## Project structure

```
src/
├── components/
│   ├── layout/     # Sidebar, Layout
│   └── ui/         # Modal, Spinner
├── context/        # AuthContext, ThemeContext
├── hooks/          # useSeed (seeds default topics on first login)
├── lib/
│   ├── supabase.js # Supabase client
│   └── constants.js# All syllabus data + 178 companies
└── pages/          # Dashboard, Syllabus, Applications, Goals, Notes, Companies
```
