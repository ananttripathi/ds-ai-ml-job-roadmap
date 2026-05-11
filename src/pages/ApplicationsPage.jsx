import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import { APP_STATUS_LABEL, TIERS } from '@/lib/constants'
import Modal from '@/components/ui/Modal'
import Spinner from '@/components/ui/Spinner'

const STATUSES = ['watchlist','applied','interviewing','offered','rejected']
const BADGE    = { watchlist:'badge-watchlist', applied:'badge-applied', interviewing:'badge-interviewing', offered:'badge-offered', rejected:'badge-rejected' }

const EMPTY_FORM = {
  company_name:'', role:'', status:'watchlist', applied_date:'',
  tier:'', notes:'', job_url:'', salary_offered:'', interview_round:0,
}

export default function ApplicationsPage() {
  const { user } = useAuth()
  const [apps, setApps]       = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter]   = useState('all')
  const [modal, setModal]     = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm]       = useState(EMPTY_FORM)
  const [saving, setSaving]   = useState(false)
  const [view, setView]       = useState('kanban') // 'kanban' | 'list'

  useEffect(() => { loadApps() }, [user])

  async function loadApps() {
    const { data } = await supabase
      .from('applications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    setApps(data || [])
    setLoading(false)
  }

  function openAdd() {
    setEditing(null)
    setForm(EMPTY_FORM)
    setModal(true)
  }

  function openEdit(app) {
    setEditing(app)
    setForm({
      company_name:    app.company_name,
      role:            app.role,
      status:          app.status,
      applied_date:    app.applied_date || '',
      tier:            app.tier || '',
      notes:           app.notes || '',
      job_url:         app.job_url || '',
      salary_offered:  app.salary_offered || '',
      interview_round: app.interview_round || 0,
    })
    setModal(true)
  }

  async function saveApp() {
    if (!form.company_name.trim() || !form.role.trim()) return
    setSaving(true)
    const payload = { ...form, user_id: user.id }
    if (editing) {
      const { data } = await supabase.from('applications').update(payload).eq('id', editing.id).select().single()
      setApps(prev => prev.map(a => a.id === editing.id ? data : a))
    } else {
      const { data } = await supabase.from('applications').insert(payload).select().single()
      setApps(prev => [data, ...prev])
    }
    setSaving(false)
    setModal(false)
  }

  async function updateStatus(id, status) {
    setApps(prev => prev.map(a => a.id === id ? { ...a, status } : a))
    await supabase.from('applications').update({ status }).eq('id', id)
  }

  async function deleteApp(id) {
    if (!confirm('Remove this application?')) return
    setApps(prev => prev.filter(a => a.id !== id))
    await supabase.from('applications').delete().eq('id', id)
  }

  const filtered = filter === 'all' ? apps : apps.filter(a => a.status === filter)

  if (loading) return <div className="flex items-center justify-center flex-1 min-h-screen"><Spinner size={6} /></div>

  return (
    <div className="flex flex-col min-h-screen">
      {/* Topbar */}
      <div className="topbar gap-3 flex-wrap py-2">
        <div>
          <div className="text-sm font-bold text-neutral-900 dark:text-white">Applications</div>
          <div className="text-xs text-neutral-400">{apps.length} total</div>
        </div>
        {/* View toggle */}
        <div className="flex gap-1 p-0.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
          {['kanban','list'].map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors capitalize ${
                view === v ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm' : 'text-neutral-500'
              }`}
            >
              {v === 'kanban' ? '⊞ Kanban' : '≡ List'}
            </button>
          ))}
        </div>
        {/* Status filter (list view) */}
        {view === 'list' && (
          <div className="flex gap-1.5 flex-wrap">
            {['all', ...STATUSES].map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors border ${
                  filter === s
                    ? 'bg-neutral-900 text-white border-neutral-900 dark:bg-brand-500 dark:border-brand-500'
                    : 'text-neutral-500 border-neutral-200 dark:border-neutral-700'
                }`}
              >
                {s === 'all' ? 'All' : APP_STATUS_LABEL[s]}
              </button>
            ))}
          </div>
        )}
        <button onClick={openAdd} className="btn-primary text-xs h-8 px-3 ml-auto">+ Add application</button>
      </div>

      {/* Kanban view */}
      {view === 'kanban' && (
        <div className="flex gap-3 px-6 py-5 overflow-x-auto flex-1">
          {STATUSES.map(status => {
            const col = apps.filter(a => a.status === status)
            return (
              <div key={status} className="flex-shrink-0 w-52">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${
                    status==='offered' ? 'text-green-600 dark:text-green-400'
                    : status==='rejected' ? 'text-red-500 dark:text-red-400'
                    : status==='interviewing' ? 'text-violet-600 dark:text-violet-400'
                    : status==='applied' ? 'text-blue-600 dark:text-blue-400'
                    : 'text-neutral-500'
                  }`}>{APP_STATUS_LABEL[status]}</span>
                  <span className="text-xs text-neutral-400 font-bold">{col.length}</span>
                </div>
                <div className="space-y-2 min-h-16">
                  {col.map(app => (
                    <KanbanCard key={app.id} app={app} onEdit={openEdit} onDelete={deleteApp} onStatus={updateStatus} />
                  ))}
                  {col.length === 0 && (
                    <div className="border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl h-16 flex items-center justify-center">
                      <span className="text-xs text-neutral-300 dark:text-neutral-700">Empty</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* List view */}
      {view === 'list' && (
        <div className="page-body">
          {filtered.length === 0 && (
            <div className="text-center py-16 text-neutral-400 text-sm">
              {filter === 'all' ? 'No applications yet. Add one above.' : `No ${APP_STATUS_LABEL[filter]} applications.`}
            </div>
          )}
          <div className="space-y-2">
            {filtered.map(app => (
              <div key={app.id} className="card px-4 py-3 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-neutral-900 dark:text-white">{app.company_name}</div>
                  <div className="text-xs text-neutral-400">{app.role} {app.tier ? `· ${app.tier}` : ''}</div>
                </div>
                {app.applied_date && (
                  <div className="text-xs text-neutral-400 hidden sm:block">{app.applied_date}</div>
                )}
                <select
                  value={app.status}
                  onChange={e => updateStatus(app.id, e.target.value)}
                  className="text-xs px-2 py-1 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-transparent cursor-pointer text-neutral-600 dark:text-neutral-400"
                >
                  {STATUSES.map(s => <option key={s} value={s}>{APP_STATUS_LABEL[s]}</option>)}
                </select>
                <button onClick={() => openEdit(app)} className="btn-ghost text-xs px-2 py-1">Edit</button>
                <button onClick={() => deleteApp(app.id)} className="btn-ghost text-xs px-2 py-1 text-red-400 hover:text-red-600">✕</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add / Edit modal */}
      <Modal open={modal} onClose={() => setModal(false)} title={editing ? 'Edit application' : 'Add application'}>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="field-label">Company name *</label>
              <input className="input mt-1" placeholder="e.g. Flipkart" value={form.company_name} onChange={e => setForm(p=>({...p,company_name:e.target.value}))} />
            </div>
            <div>
              <label className="field-label">Role *</label>
              <input className="input mt-1" placeholder="e.g. ML Engineer" value={form.role} onChange={e => setForm(p=>({...p,role:e.target.value}))} />
            </div>
            <div>
              <label className="field-label">Status</label>
              <select className="select mt-1" value={form.status} onChange={e => setForm(p=>({...p,status:e.target.value}))}>
                {STATUSES.map(s => <option key={s} value={s}>{APP_STATUS_LABEL[s]}</option>)}
              </select>
            </div>
            <div>
              <label className="field-label">Applied date</label>
              <input className="input mt-1" type="date" value={form.applied_date} onChange={e => setForm(p=>({...p,applied_date:e.target.value}))} />
            </div>
            <div>
              <label className="field-label">Tier / Category</label>
              <select className="select mt-1" value={form.tier} onChange={e => setForm(p=>({...p,tier:e.target.value}))}>
                <option value="">Select tier</option>
                {TIERS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="field-label">Interview round</label>
              <input className="input mt-1" type="number" min="0" value={form.interview_round} onChange={e => setForm(p=>({...p,interview_round:+e.target.value}))} />
            </div>
            <div>
              <label className="field-label">Salary offered</label>
              <input className="input mt-1" placeholder="e.g. ₹45 LPA" value={form.salary_offered} onChange={e => setForm(p=>({...p,salary_offered:e.target.value}))} />
            </div>
            <div className="col-span-2">
              <label className="field-label">Job URL</label>
              <input className="input mt-1" placeholder="https://…" value={form.job_url} onChange={e => setForm(p=>({...p,job_url:e.target.value}))} />
            </div>
            <div className="col-span-2">
              <label className="field-label">Notes</label>
              <textarea className="input mt-1 h-20 resize-none" placeholder="Referral contact, interview tips, next steps…" value={form.notes} onChange={e => setForm(p=>({...p,notes:e.target.value}))} />
            </div>
          </div>
          <div className="flex gap-2 justify-end pt-1">
            <button className="btn-secondary" onClick={() => setModal(false)}>Cancel</button>
            <button className="btn-primary" onClick={saveApp} disabled={saving}>{saving ? 'Saving…' : editing ? 'Save changes' : 'Add application'}</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

function KanbanCard({ app, onEdit, onDelete, onStatus }) {
  return (
    <div
      className="card p-3 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onEdit(app)}
      style={{ borderLeft: app.status==='interviewing' ? '3px solid #7c3aed' : app.status==='offered' ? '3px solid #16a34a' : undefined }}
    >
      <div className="text-xs font-bold text-neutral-900 dark:text-white mb-0.5">{app.company_name}</div>
      <div className="text-[10px] text-neutral-400 mb-2">{app.role}</div>
      {app.tier && <div className="text-[9px] bg-neutral-100 dark:bg-neutral-800 text-neutral-500 px-1.5 py-0.5 rounded mb-1.5 inline-block">{app.tier}</div>}
      {app.applied_date && <div className="text-[10px] text-neutral-400">📅 {app.applied_date}</div>}
      {app.interview_round > 0 && <div className="text-[10px] text-violet-500 dark:text-violet-400 mt-0.5">Round {app.interview_round}</div>}
      <div className="flex justify-between items-center mt-2" onClick={e => e.stopPropagation()}>
        <select
          value={app.status}
          onChange={e => onStatus(app.id, e.target.value)}
          className="text-[9px] px-1.5 py-0.5 rounded border border-neutral-200 dark:border-neutral-700 bg-transparent cursor-pointer text-neutral-500"
        >
          {['watchlist','applied','interviewing','offered','rejected'].map(s => (
            <option key={s} value={s}>{APP_STATUS_LABEL[s]}</option>
          ))}
        </select>
        <button onClick={() => onDelete(app.id)} className="text-neutral-300 dark:text-neutral-700 hover:text-red-400 text-xs">✕</button>
      </div>
    </div>
  )
}
