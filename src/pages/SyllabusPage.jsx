import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import { COURSES, STATUS_LABEL } from '@/lib/constants'
import Modal from '@/components/ui/Modal'
import Spinner from '@/components/ui/Spinner'

const STATUS_DOT = { done:'bg-green-500', in_progress:'bg-amber-400', not_started:'bg-neutral-300 dark:bg-neutral-600' }
const STATUS_BADGE = { done:'badge-done', in_progress:'badge-progress', not_started:'badge-not' }
const STATUSES = ['not_started','in_progress','done']

export default function SyllabusPage() {
  const { user } = useAuth()
  const [topics, setTopics]       = useState([])
  const [loading, setLoading]     = useState(true)
  const [search, setSearch]       = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCourse, setFilterCourse] = useState('all')
  const [openCourses, setOpenCourses]   = useState({})
  const [addModal, setAddModal]   = useState(false)
  const [newTopic, setNewTopic]   = useState({ name:'', course_id: COURSES[0].id, course_name: COURSES[0].name })
  const [saving, setSaving]       = useState(false)

  useEffect(() => { loadTopics() }, [user])

  async function loadTopics() {
    const { data } = await supabase
      .from('topics')
      .select('*')
      .eq('user_id', user.id)
      .order('course_id')
    setTopics(data || [])
    setLoading(false)
  }

  async function updateStatus(id, status) {
    setTopics(prev => prev.map(t => t.id === id ? { ...t, status } : t))
    await supabase.from('topics').update({ status }).eq('id', id)
  }

  async function addTopic() {
    if (!newTopic.name.trim()) return
    setSaving(true)
    const { data, error } = await supabase.from('topics').insert({
      user_id:     user.id,
      name:        newTopic.name.trim(),
      course_id:   newTopic.course_id,
      course_name: newTopic.course_name,
      status:      'not_started',
    }).select().single()
    if (!error) {
      setTopics(prev => [...prev, data])
      setNewTopic({ name:'', course_id: COURSES[0].id, course_name: COURSES[0].name })
      setAddModal(false)
    }
    setSaving(false)
  }

  // Filter topics
  const filtered = topics.filter(t => {
    const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'all' || t.status === filterStatus
    const matchCourse = filterCourse === 'all' || t.course_id === filterCourse
    return matchSearch && matchStatus && matchCourse
  })

  // Group by course
  const grouped = COURSES.map(c => ({
    ...c,
    topics: filtered.filter(t => t.course_id === c.id),
    allTopics: topics.filter(t => t.course_id === c.id),
  })).filter(c => c.topics.length > 0)

  // Overall stats
  const total = topics.length
  const done  = topics.filter(t => t.status === 'done').length
  const pct   = total ? Math.round(done / total * 100) : 0

  function toggleCourse(id) {
    setOpenCourses(prev => ({ ...prev, [id]: !prev[id] }))
  }

  if (loading) return (
    <div className="flex items-center justify-center flex-1 min-h-screen"><Spinner size={6} /></div>
  )

  return (
    <div className="flex flex-col min-h-screen">
      {/* Topbar */}
      <div className="topbar gap-3 flex-wrap py-2">
        <div>
          <div className="text-sm font-bold text-neutral-900 dark:text-white">Syllabus</div>
          <div className="text-xs text-neutral-400">{done}/{total} topics done · {pct}% complete</div>
        </div>
        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400 text-xs">🔍</span>
          <input
            className="input pl-7 text-xs h-8"
            placeholder="Search topics…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        {/* Course filter */}
        <select
          className="select text-xs h-8 w-auto"
          value={filterCourse}
          onChange={e => setFilterCourse(e.target.value)}
        >
          <option value="all">All courses</option>
          {COURSES.map(c => <option key={c.id} value={c.id}>{c.number}. {c.name}</option>)}
        </select>
        {/* Status pills */}
        <div className="flex gap-1.5">
          {['all','not_started','in_progress','done'].map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors border ${
                filterStatus === s
                  ? 'bg-neutral-900 text-white border-neutral-900 dark:bg-brand-500 dark:border-brand-500'
                  : 'bg-transparent text-neutral-500 border-neutral-200 dark:border-neutral-700 hover:border-neutral-400'
              }`}
            >
              {s === 'all' ? 'All' : STATUS_LABEL[s]}
            </button>
          ))}
        </div>
        <button onClick={() => setAddModal(true)} className="btn-primary text-xs h-8 px-3">
          + Add topic
        </button>
      </div>

      {/* Body */}
      <div className="page-body space-y-2">
        {grouped.length === 0 && (
          <div className="text-center py-16 text-neutral-400 text-sm">
            No topics match your filters.
          </div>
        )}
        {grouped.map(course => {
          const isOpen = openCourses[course.id] !== false // default open
          const courseDone = course.allTopics.filter(t => t.status === 'done').length
          const coursePct  = course.allTopics.length ? Math.round(courseDone / course.allTopics.length * 100) : 0
          return (
            <div key={course.id} className="card overflow-hidden">
              {/* Course header */}
              <button
                onClick={() => toggleCourse(course.id)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left
                           bg-neutral-50 dark:bg-neutral-900
                           hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <span className="text-xs font-bold text-neutral-500 dark:text-neutral-500 w-5">{course.number}.</span>
                <span className="text-sm font-semibold text-neutral-900 dark:text-white flex-1">{course.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-neutral-900 dark:bg-brand-500"
                      style={{ width: `${coursePct}%` }}
                    />
                  </div>
                  <span className="text-xs text-neutral-400 w-8 text-right">{coursePct}%</span>
                  <span className={`text-xs text-neutral-400 transition-transform ${isOpen ? 'rotate-90' : ''}`}>›</span>
                </div>
              </button>

              {/* Topic rows */}
              {isOpen && (
                <div className="divide-y divide-neutral-50 dark:divide-neutral-800/60">
                  {course.topics.map(t => (
                    <div key={t.id} className="flex items-center gap-3 px-4 py-2.5 hover:bg-neutral-50 dark:hover:bg-neutral-900/40 transition-colors">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${STATUS_DOT[t.status]}`} />
                      <span className="text-xs text-neutral-700 dark:text-neutral-300 flex-1">{t.name}</span>
                      <select
                        value={t.status}
                        onChange={e => updateStatus(t.id, e.target.value)}
                        className="text-[11px] px-2 py-0.5 rounded-lg border border-neutral-200 dark:border-neutral-700
                                   bg-transparent text-neutral-600 dark:text-neutral-400 cursor-pointer"
                      >
                        {STATUSES.map(s => (
                          <option key={s} value={s}>{STATUS_LABEL[s]}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Add topic modal */}
      <Modal open={addModal} onClose={() => setAddModal(false)} title="Add topic">
        <div className="space-y-3">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Topic name *</label>
            <input
              className="input"
              placeholder="e.g. Flash Attention mechanism"
              value={newTopic.name}
              onChange={e => setNewTopic(p => ({ ...p, name: e.target.value }))}
              onKeyDown={e => e.key === 'Enter' && addTopic()}
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Course</label>
            <select
              className="select"
              value={newTopic.course_id}
              onChange={e => {
                const c = COURSES.find(c => c.id === e.target.value)
                setNewTopic(p => ({ ...p, course_id: c.id, course_name: c.name }))
              }}
            >
              {COURSES.map(c => <option key={c.id} value={c.id}>{c.number}. {c.name}</option>)}
            </select>
          </div>
          <div className="flex gap-2 justify-end pt-1">
            <button className="btn-secondary" onClick={() => setAddModal(false)}>Cancel</button>
            <button className="btn-primary" onClick={addTopic} disabled={saving}>
              {saving ? 'Saving…' : 'Add topic'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
