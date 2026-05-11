import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import Spinner from '@/components/ui/Spinner'

export default function GoalsPage() {
  const { user } = useAuth()
  const [goals, setGoals]         = useState([])
  const [categories, setCategories] = useState([])
  const [streak, setStreak]       = useState([])
  const [loading, setLoading]     = useState(true)
  const [newText, setNewText]     = useState('')
  const [newCat, setNewCat]       = useState('General')
  const [logging, setLogging]     = useState(false)
  const [todayLogged, setTodayLogged] = useState(false)
  const [newCatName, setNewCatName] = useState('')
  const [addingCat, setAddingCat] = useState(false)
  const [weekStats, setWeekStats] = useState({ set: 0, done: 0 })

  const today = new Date().toISOString().slice(0, 10)

  useEffect(() => { loadAll() }, [user])

  async function loadAll() {
    await Promise.all([loadGoals(), loadCategories(), loadStreak()])
    setLoading(false)
  }

  async function loadGoals() {
    const { data } = await supabase
      .from('goals')
      .select('*')
      .eq('user_id', user.id)
      .eq('goal_date', today)
      .order('created_at')
    setGoals(data || [])

    // Week stats
    const weekAgo = new Date(Date.now() - 6 * 86400000).toISOString().slice(0, 10)
    const { data: weekData } = await supabase
      .from('goals')
      .select('done')
      .eq('user_id', user.id)
      .gte('goal_date', weekAgo)
    if (weekData) setWeekStats({ set: weekData.length, done: weekData.filter(g => g.done).length })
  }

  async function loadCategories() {
    const { data } = await supabase
      .from('goal_categories')
      .select('*')
      .eq('user_id', user.id)
      .order('name')
    setCategories(data || [])
    if (data?.length) setNewCat(data[0].name)
  }

  async function loadStreak() {
    const thirtyAgo = new Date(Date.now() - 29 * 86400000).toISOString().slice(0, 10)
    const { data } = await supabase
      .from('streak_log')
      .select('log_date')
      .eq('user_id', user.id)
      .gte('log_date', thirtyAgo)
    const dates = new Set((data || []).map(r => r.log_date))
    setTodayLogged(dates.has(today))
    const cells = []
    for (let i = 29; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10)
      cells.push({ date: d, logged: dates.has(d) })
    }
    setStreak(cells)
  }

  async function addGoal() {
    if (!newText.trim()) return
    const { data } = await supabase.from('goals').insert({
      user_id: user.id, text: newText.trim(), category: newCat, goal_date: today, done: false,
    }).select().single()
    if (data) setGoals(prev => [...prev, data])
    setNewText('')
  }

  async function toggleGoal(id, done) {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, done: !done } : g))
    await supabase.from('goals').update({ done: !done }).eq('id', id)
  }

  async function deleteGoal(id) {
    setGoals(prev => prev.filter(g => g.id !== id))
    await supabase.from('goals').delete().eq('id', id)
  }

  async function logStudy() {
    setLogging(true)
    await supabase.from('streak_log').upsert(
      { user_id: user.id, log_date: today },
      { onConflict: 'user_id,log_date' }
    )
    setTodayLogged(true)
    await loadStreak()
    setLogging(false)
  }

  async function addCategory() {
    if (!newCatName.trim()) return
    const { data } = await supabase.from('goal_categories').insert({
      user_id: user.id, name: newCatName.trim(), color: '#888780',
    }).select().single()
    if (data) { setCategories(prev => [...prev, data]); setNewCat(data.name) }
    setNewCatName(''); setAddingCat(false)
  }

  async function deleteCategory(id, name) {
    if (!confirm(`Delete category "${name}"?`)) return
    await supabase.from('goal_categories').delete().eq('id', id)
    setCategories(prev => prev.filter(c => c.id !== id))
  }

  const doneCnt = goals.filter(g => g.done).length
  const streakCount = (() => {
    let s = 0
    for (let i = streak.length - 1; i >= 0; i--) {
      if (streak[i].logged) s++; else break
    }
    return s
  })()

  if (loading) return <div className="flex items-center justify-center flex-1 min-h-screen"><Spinner size={6} /></div>

  return (
    <div className="flex flex-col min-h-screen">
      <div className="topbar">
        <div className="flex-1">
          <div className="text-sm font-bold text-neutral-900 dark:text-white">Daily Goals</div>
          <div className="text-xs text-neutral-400">
            {new Date().toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long' })}
          </div>
        </div>
        <button
          onClick={logStudy}
          disabled={logging || todayLogged}
          className={`btn-primary disabled:opacity-60 ${todayLogged ? 'bg-green-700 dark:bg-green-700' : ''}`}
        >
          {todayLogged ? '✓ Logged today' : logging ? 'Logging…' : '🔥 Mark studied'}
        </button>
      </div>

      <div className="page-body">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Goals — left column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Add goal */}
            <div className="card p-4">
              <div className="flex gap-2">
                <input
                  className="input flex-1 text-sm"
                  placeholder="Add a goal for today…"
                  value={newText}
                  onChange={e => setNewText(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addGoal()}
                />
                <select
                  className="select w-36 text-xs"
                  value={newCat}
                  onChange={e => setNewCat(e.target.value)}
                >
                  {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
                <button onClick={addGoal} className="btn-primary px-3">+</button>
              </div>
            </div>

            {/* Today's goals */}
            <div className="card overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100 dark:border-neutral-800">
                <div className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-600">Today's tasks</div>
                {goals.length > 0 && (
                  <div className="text-xs text-neutral-400">{doneCnt} / {goals.length} done</div>
                )}
              </div>
              {goals.length === 0 && (
                <div className="px-4 py-8 text-center text-sm text-neutral-400">
                  No goals yet. Add one above.
                </div>
              )}
              <div className="divide-y divide-neutral-50 dark:divide-neutral-800/50">
                {goals.map(g => (
                  <div key={g.id} className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-900/40 transition-colors group">
                    <button
                      onClick={() => toggleGoal(g.id, g.done)}
                      className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border-2 transition-all ${
                        g.done
                          ? 'bg-neutral-900 border-neutral-900 dark:bg-brand-500 dark:border-brand-500 text-white'
                          : 'border-neutral-300 dark:border-neutral-600'
                      }`}
                    >
                      {g.done && <span className="text-[10px] font-black">✓</span>}
                    </button>
                    <span className={`text-sm flex-1 ${g.done ? 'line-through text-neutral-400 dark:text-neutral-600' : 'text-neutral-700 dark:text-neutral-300'}`}>
                      {g.text}
                    </span>
                    {g.category && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                        {g.category}
                      </span>
                    )}
                    <button
                      onClick={() => deleteGoal(g.id)}
                      className="opacity-0 group-hover:opacity-100 text-neutral-300 hover:text-red-400 transition-all text-xs"
                    >✕</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories management */}
            <div className="card p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-600">Categories</div>
                <button onClick={() => setAddingCat(p => !p)} className="text-xs text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300">
                  {addingCat ? 'Cancel' : '+ Add'}
                </button>
              </div>
              {addingCat && (
                <div className="flex gap-2 mb-3">
                  <input
                    className="input flex-1 text-xs h-8"
                    placeholder="Category name…"
                    value={newCatName}
                    onChange={e => setNewCatName(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addCategory()}
                  />
                  <button onClick={addCategory} className="btn-primary text-xs h-8 px-3">Add</button>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {categories.map(c => (
                  <div key={c.id} className="group flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs text-neutral-600 dark:text-neutral-400">
                    {c.name}
                    <button
                      onClick={() => deleteCategory(c.id, c.name)}
                      className="opacity-0 group-hover:opacity-100 text-neutral-400 hover:text-red-400 text-[10px] transition-opacity"
                    >×</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column — streak + stats */}
          <div className="space-y-4">
            {/* Streak heatmap */}
            <div className="card p-4">
              <div className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-600 mb-3">
                Study streak
              </div>
              <div className="text-3xl font-extrabold text-neutral-900 dark:text-white mb-1">{streakCount}</div>
              <div className="text-xs text-neutral-400 mb-3">days in a row</div>
              <div className="flex gap-1 flex-wrap">
                {streak.map(cell => (
                  <div
                    key={cell.date}
                    title={cell.date}
                    className={`w-3.5 h-3.5 rounded-sm ${
                      cell.logged
                        ? 'bg-neutral-900 dark:bg-brand-500'
                        : 'bg-neutral-100 dark:bg-neutral-800'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Weekly stats */}
            <div className="card p-4">
              <div className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-600 mb-3">This week</div>
              <div className="space-y-2">
                {[
                  { label: 'Goals set',    value: weekStats.set },
                  { label: 'Goals done',   value: weekStats.done },
                  { label: 'Completion',   value: weekStats.set ? `${Math.round(weekStats.done/weekStats.set*100)}%` : '—' },
                ].map(s => (
                  <div key={s.label} className="flex justify-between items-center py-1.5 border-b border-neutral-50 dark:border-neutral-800 last:border-0">
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">{s.label}</span>
                    <span className="text-sm font-bold text-neutral-900 dark:text-white">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Today's progress */}
            {goals.length > 0 && (
              <div className="card p-4">
                <div className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-600 mb-3">Today</div>
                <div className="text-2xl font-extrabold text-neutral-900 dark:text-white">{doneCnt} / {goals.length}</div>
                <div className="text-xs text-neutral-400 mb-3">tasks completed</div>
                <div className="prog-track h-2">
                  <div
                    className="prog-fill h-2"
                    style={{ width: goals.length ? `${Math.round(doneCnt/goals.length*100)}%` : '0%' }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
