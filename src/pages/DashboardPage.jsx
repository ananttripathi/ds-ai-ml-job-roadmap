import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import { COURSES, APP_STATUS_LABEL } from '@/lib/constants'
import Spinner from '@/components/ui/Spinner'

export default function DashboardPage() {
  const { user, profile } = useAuth()
  const [stats, setStats]   = useState(null)
  const [streak, setStreak] = useState([])
  const [apps, setApps]     = useState([])
  const [courseProgress, setCourseProgress] = useState([])
  const [loading, setLoading] = useState(true)
  const [logging, setLogging] = useState(false)

  const today = new Date().toISOString().slice(0, 10)

  useEffect(() => { if (user) loadAll() }, [user])

  async function loadAll() {
    setLoading(true)
    await Promise.all([loadTopics(), loadStreak(), loadApps()])
    setLoading(false)
  }

  async function loadTopics() {
    const { data } = await supabase
      .from('topics')
      .select('status, course_id')
      .eq('user_id', user.id)
    if (!data) return
    const total    = data.length
    const done     = data.filter(t => t.status === 'done').length
    const progress = data.filter(t => t.status === 'in_progress').length
    setStats({ total, done, progress, pct: total ? Math.round(done / total * 100) : 0 })

    // Per-course breakdown
    const byC = COURSES.map(c => {
      const ct = data.filter(t => t.course_id === c.id)
      if (!ct.length) return null
      const d = ct.filter(t => t.status === 'done').length
      return { name: c.name, pct: Math.round(d / ct.length * 100), done: d, total: ct.length }
    }).filter(Boolean)
    setCourseProgress(byC)
  }

  async function loadStreak() {
    const thirtyDaysAgo = new Date(Date.now() - 29 * 86400000).toISOString().slice(0, 10)
    const { data } = await supabase
      .from('streak_log')
      .select('log_date')
      .eq('user_id', user.id)
      .gte('log_date', thirtyDaysAgo)
    const dates = new Set((data || []).map(r => r.log_date))
    const cells = []
    for (let i = 29; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10)
      cells.push({ date: d, logged: dates.has(d) })
    }
    setStreak(cells)
  }

  async function loadApps() {
    const { data } = await supabase
      .from('applications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(6)
    setApps(data || [])
  }

  async function logStudy() {
    setLogging(true)
    await supabase.from('streak_log').upsert(
      { user_id: user.id, log_date: today },
      { onConflict: 'user_id,log_date' }
    )
    await loadStreak()
    setLogging(false)
  }

  const streakCount = (() => {
    let s = 0
    for (let i = streak.length - 1; i >= 0; i--) {
      if (streak[i].logged) s++; else break
    }
    return s
  })()

  const todayLogged = streak[streak.length - 1]?.logged

  const greetingHour = new Date().getHours()
  const greeting = greetingHour < 12 ? 'Good morning' : greetingHour < 17 ? 'Good afternoon' : 'Good evening'
  const firstName = profile?.full_name?.split(' ')[0] ?? 'there'

  const appPipeline = ['watchlist','applied','interviewing','offered','rejected'].map(s => ({
    status: s,
    label: APP_STATUS_LABEL[s],
    count: apps.filter(a => a.status === s).length,
  }))

  const STATUS_COLORS = {
    watchlist:    'bg-neutral-200 dark:bg-neutral-700',
    applied:      'bg-blue-400 dark:bg-blue-500',
    interviewing: 'bg-violet-400 dark:bg-violet-500',
    offered:      'bg-green-400 dark:bg-green-500',
    rejected:     'bg-red-300 dark:bg-red-600',
  }

  if (loading) return (
    <div className="flex items-center justify-center flex-1 min-h-screen">
      <Spinner size={6} />
    </div>
  )

  return (
    <div className="flex flex-col min-h-screen">
      {/* Topbar */}
      <div className="topbar">
        <div className="flex-1">
          <div className="text-sm font-bold text-neutral-900 dark:text-white">
            {greeting}, {firstName} 👋
          </div>
          <div className="text-xs text-neutral-400 dark:text-neutral-500">
            {new Date().toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long', year:'numeric' })}
          </div>
        </div>
        <button
          onClick={logStudy}
          disabled={logging || todayLogged}
          className={`btn-primary disabled:opacity-60 ${todayLogged ? 'bg-green-700 dark:bg-green-700' : ''}`}
        >
          {todayLogged ? '✓ Logged today' : logging ? 'Logging…' : '🔥 Log study'}
        </button>
      </div>

      <div className="page-body space-y-5">
        {/* Metric cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Syllabus done',  value: `${stats?.pct ?? 0}%`,   sub: `${stats?.done ?? 0} / ${stats?.total ?? 0} topics` },
            { label: 'In progress',    value: stats?.progress ?? 0,     sub: 'topics active' },
            { label: 'Applications',   value: apps.length,              sub: `${apps.filter(a=>a.status==='interviewing').length} interviewing` },
            { label: 'Study streak',   value: streakCount,              sub: 'days in a row' },
          ].map(m => (
            <div key={m.label} className="metric-card">
              <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-600 mb-1">{m.label}</div>
              <div className="text-2xl font-extrabold text-neutral-900 dark:text-white">{m.value}</div>
              <div className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">{m.sub}</div>
            </div>
          ))}
        </div>

        {/* Two-column section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Syllabus progress */}
          <div className="card p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-600">Syllabus progress</div>
              <Link to="/syllabus" className="text-xs text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300">View all →</Link>
            </div>
            <div className="space-y-2.5">
              {courseProgress.slice(0, 8).map(c => (
                <div key={c.name} className="flex items-center gap-2">
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 w-40 truncate flex-shrink-0">{c.name}</div>
                  <div className="prog-track">
                    <div
                      className="prog-fill"
                      style={{ width: `${c.pct}%` }}
                    />
                  </div>
                  <div className="text-xs text-neutral-400 dark:text-neutral-600 w-8 text-right">{c.pct}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* Application pipeline */}
          <div className="card p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-600">Application pipeline</div>
              <Link to="/applications" className="text-xs text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300">View all →</Link>
            </div>
            <div className="space-y-2.5">
              {appPipeline.map(p => (
                <div key={p.status} className="flex items-center gap-2">
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 w-24 flex-shrink-0">{p.label}</div>
                  <div className="prog-track">
                    <div
                      className={`h-full rounded-full transition-all ${STATUS_COLORS[p.status]}`}
                      style={{ width: `${Math.min(p.count * 15, 100)}%` }}
                    />
                  </div>
                  <div className="text-xs text-neutral-400 dark:text-neutral-600 w-6 text-right font-bold">{p.count}</div>
                </div>
              ))}
            </div>
            {apps.length === 0 && (
              <div className="mt-4 text-center text-xs text-neutral-400">
                No applications yet. <Link to="/applications" className="underline">Add one →</Link>
              </div>
            )}
          </div>
        </div>

        {/* Streak heatmap */}
        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-600">
              Study streak — last 30 days
            </div>
            <div className="text-xs text-neutral-400">{streakCount} day{streakCount !== 1 ? 's' : ''} in a row</div>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {streak.map(cell => (
              <div
                key={cell.date}
                title={cell.date}
                className={`w-4 h-4 rounded-sm transition-colors ${
                  cell.logged
                    ? 'bg-neutral-900 dark:bg-brand-500'
                    : 'bg-neutral-100 dark:bg-neutral-800'
                }`}
              />
            ))}
          </div>
          <div className="flex gap-4 mt-2">
            <span className="flex items-center gap-1.5 text-[10px] text-neutral-400">
              <span className="w-3 h-3 rounded-sm bg-neutral-900 dark:bg-brand-500 inline-block" />Studied
            </span>
            <span className="flex items-center gap-1.5 text-[10px] text-neutral-400">
              <span className="w-3 h-3 rounded-sm bg-neutral-100 dark:bg-neutral-800 inline-block" />Not logged
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
