import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import { PRESET_COMPANIES, TIERS, INDIA_CITIES, DIFFICULTY_EMOJI } from '@/lib/constants'
import Modal from '@/components/ui/Modal'
import Spinner from '@/components/ui/Spinner'

const WORK_MODES  = ['Hybrid','Remote','WFO']
const DIFFICULTIES = ['Hard','Medium-Hard','Medium','Approachable']

const EMPTY_FORM = {
  name:'', tier:'Big Tech', tier_number:1, work_mode:'Hybrid',
  india_cities:'', salary_range:'', difficulty:'Medium',
  roles:'', total_rounds:'', coding_rounds:'', ml_rounds:'',
  sys_design:'', bq_rounds:'', take_home: false,
  timeline_weeks:'', interview_tips:'', careers_url:'',
}

export default function CompaniesPage() {
  const { user } = useAuth()
  const [companies, setCompanies]   = useState([])
  const [loading, setLoading]       = useState(true)
  const [seeding, setSeeding]       = useState(false)
  const [search, setSearch]         = useState('')
  const [filterTier, setFilterTier] = useState('all')
  const [filterMode, setFilterMode] = useState('all')
  const [filterCity, setFilterCity] = useState('all')
  const [modal, setModal]           = useState(false)
  const [editing, setEditing]       = useState(null)
  const [form, setForm]             = useState(EMPTY_FORM)
  const [saving, setSaving]         = useState(false)
  const [sortBy, setSortBy]         = useState('name')
  const [sortDir, setSortDir]       = useState('asc')

  useEffect(() => { loadCompanies() }, [user])

  async function loadCompanies() {
    const { data } = await supabase
      .from('companies')
      .select('*')
      .eq('user_id', user.id)
      .order('tier_number')
    setCompanies(data || [])
    setLoading(false)
  }

  async function seedPreset() {
    setSeeding(true)
    const rows = PRESET_COMPANIES.map(c => ({ ...c, user_id: user.id }))
    // Insert in batches of 50
    for (let i = 0; i < rows.length; i += 50) {
      await supabase.from('companies').insert(rows.slice(i, i + 50))
    }
    await loadCompanies()
    setSeeding(false)
  }

  function openAdd() {
    setEditing(null); setForm(EMPTY_FORM); setModal(true)
  }

  function openEdit(c) {
    setEditing(c)
    setForm({
      name: c.name, tier: c.tier, tier_number: c.tier_number || 1,
      work_mode: c.work_mode, india_cities: c.india_cities || '',
      salary_range: c.salary_range || '', difficulty: c.difficulty || 'Medium',
      roles: c.roles || '', total_rounds: c.total_rounds || '',
      coding_rounds: c.coding_rounds || '', ml_rounds: c.ml_rounds || '',
      sys_design: c.sys_design || '', bq_rounds: c.bq_rounds || '',
      take_home: c.take_home || false, timeline_weeks: c.timeline_weeks || '',
      interview_tips: c.interview_tips || '', careers_url: c.careers_url || '',
    })
    setModal(true)
  }

  async function saveCompany() {
    if (!form.name.trim()) return
    setSaving(true)
    const payload = { ...form, user_id: user.id }
    if (editing) {
      const { data } = await supabase.from('companies').update(payload).eq('id', editing.id).select().single()
      setCompanies(prev => prev.map(c => c.id === editing.id ? data : c))
    } else {
      const { data } = await supabase.from('companies').insert(payload).select().single()
      setCompanies(prev => [...prev, data])
    }
    setSaving(false); setModal(false)
  }

  async function deleteCompany(id) {
    if (!confirm('Remove this company?')) return
    setCompanies(prev => prev.filter(c => c.id !== id))
    await supabase.from('companies').delete().eq('id', id)
  }

  async function addToApplications(company) {
    await supabase.from('applications').insert({
      user_id:      user.id,
      company_name: company.name,
      role:         company.roles?.split(',')[0]?.trim() || '',
      status:       'watchlist',
      tier:         company.tier,
    })
    alert(`${company.name} added to Applications as Watchlist!`)
  }

  function handleSort(col) {
    if (sortBy === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortBy(col); setSortDir('asc') }
  }

  // Filter & sort
  const filtered = companies
    .filter(c => {
      const ms = search.toLowerCase()
      const matchSearch = !search || c.name.toLowerCase().includes(ms) || (c.india_cities||'').toLowerCase().includes(ms) || (c.roles||'').toLowerCase().includes(ms)
      const matchTier = filterTier === 'all' || c.tier === filterTier
      const matchMode = filterMode === 'all' || c.work_mode === filterMode
      const matchCity = filterCity === 'all' || (c.india_cities||'').includes(filterCity)
      return matchSearch && matchTier && matchMode && matchCity
    })
    .sort((a, b) => {
      let av = a[sortBy] || '', bv = b[sortBy] || ''
      if (sortBy === 'tier_number') { av = a.tier_number || 99; bv = b.tier_number || 99; return sortDir === 'asc' ? av - bv : bv - av }
      return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
    })

  const uniqueTiers = [...new Set(companies.map(c => c.tier))].sort()

  const DIFF_BADGE = {
    'Hard':         'text-red-600 dark:text-red-400',
    'Medium-Hard':  'text-orange-500 dark:text-orange-400',
    'Medium':       'text-yellow-500 dark:text-yellow-400',
    'Approachable': 'text-green-600 dark:text-green-400',
  }

  if (loading) return <div className="flex items-center justify-center flex-1 min-h-screen"><Spinner size={6} /></div>

  return (
    <div className="flex flex-col min-h-screen">
      {/* Topbar */}
      <div className="topbar gap-3 flex-wrap py-2">
        <div>
          <div className="text-sm font-bold text-neutral-900 dark:text-white">Companies</div>
          <div className="text-xs text-neutral-400">{companies.length} companies tracked</div>
        </div>
        <div className="relative flex-1 max-w-xs">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400">🔍</span>
          <input className="input pl-7 text-xs h-8" placeholder="Search name, city, role…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {companies.length === 0 && (
          <button onClick={seedPreset} disabled={seeding} className="btn-secondary text-xs h-8 px-3">
            {seeding ? 'Loading 178 companies…' : '📥 Load 178 preset companies'}
          </button>
        )}
        <button onClick={openAdd} className="btn-primary text-xs h-8 px-3">+ Add company</button>
      </div>

      {/* Filter bar */}
      <div className="flex gap-3 px-6 py-2 flex-wrap border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Tier</span>
          <select className="select text-xs h-7 w-auto" value={filterTier} onChange={e => setFilterTier(e.target.value)}>
            <option value="all">All</option>
            {uniqueTiers.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Mode</span>
          <select className="select text-xs h-7 w-auto" value={filterMode} onChange={e => setFilterMode(e.target.value)}>
            <option value="all">All</option>
            {WORK_MODES.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">City</span>
          <select className="select text-xs h-7 w-auto" value={filterCity} onChange={e => setFilterCity(e.target.value)}>
            <option value="all">All</option>
            {INDIA_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="ml-auto text-xs text-neutral-400">{filtered.length} shown</div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        {companies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-neutral-400">
            <div className="text-4xl">🏢</div>
            <div className="text-sm">No companies yet.</div>
            <div className="flex gap-3">
              <button onClick={seedPreset} disabled={seeding} className="btn-primary">
                {seeding ? 'Loading…' : '📥 Load 178 preset companies'}
              </button>
              <button onClick={openAdd} className="btn-secondary">+ Add manually</button>
            </div>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 z-10">
              <tr className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800">
                {[
                  { key:'name',        label:'Company' },
                  { key:'tier',        label:'Tier' },
                  { key:'india_cities',label:'City' },
                  { key:'work_mode',   label:'Mode' },
                  { key:'salary_range',label:'Salary (3–7yr)' },
                  { key:'difficulty',  label:'Difficulty' },
                  { key:'roles',       label:'Roles' },
                ].map(col => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-600 cursor-pointer select-none whitespace-nowrap hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors"
                  >
                    {col.label}
                    {sortBy === col.key && <span className="ml-1">{sortDir === 'asc' ? '↑' : '↓'}</span>}
                  </th>
                ))}
                <th className="px-4 py-2.5" />
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr
                  key={c.id}
                  className="border-b border-neutral-50 dark:border-neutral-800/60 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors group cursor-pointer"
                  onClick={() => openEdit(c)}
                >
                  <td className="px-4 py-2.5">
                    <div className="text-sm font-semibold text-neutral-900 dark:text-white">{c.name}</div>
                    {c.is_preset && <div className="text-[9px] text-neutral-400">preset</div>}
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
                      {c.tier}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-xs text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
                    {c.india_cities?.split(',')[0] || '—'}
                  </td>
                  <td className="px-4 py-2.5">
                    <span className={`text-xs font-medium ${
                      c.work_mode === 'Remote' ? 'badge-remote'
                      : c.work_mode === 'WFO' ? 'badge-wfo'
                      : 'badge-hybrid'
                    }`}>
                      {c.work_mode}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300 whitespace-nowrap">
                    {c.salary_range || '—'}
                  </td>
                  <td className="px-4 py-2.5 text-sm">
                    <span className={DIFF_BADGE[c.difficulty]}>
                      {DIFFICULTY_EMOJI[c.difficulty]} {c.difficulty}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-xs text-neutral-400 max-w-40 truncate">{c.roles || '—'}</td>
                  <td className="px-4 py-2.5" onClick={e => e.stopPropagation()}>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => addToApplications(c)}
                        className="text-[10px] px-2 py-1 rounded border border-neutral-200 dark:border-neutral-700 text-neutral-500 hover:bg-neutral-900 hover:text-white dark:hover:bg-brand-500 dark:hover:text-white transition-colors whitespace-nowrap"
                      >
                        + Track
                      </button>
                      <button
                        onClick={() => deleteCompany(c.id)}
                        className="text-[10px] px-2 py-1 rounded text-neutral-400 hover:text-red-500 transition-colors"
                      >✕</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add / edit modal */}
      <Modal open={modal} onClose={() => setModal(false)} title={editing ? `Edit — ${editing.name}` : 'Add company'}>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="field-label">Company name *</label>
              <input className="input mt-1" placeholder="e.g. Razorpay" value={form.name} onChange={e => setForm(p=>({...p,name:e.target.value}))} />
            </div>
            <div>
              <label className="field-label">Tier / Category</label>
              <select className="select mt-1" value={form.tier} onChange={e => setForm(p=>({...p,tier:e.target.value}))}>
                {TIERS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="field-label">Work mode</label>
              <select className="select mt-1" value={form.work_mode} onChange={e => setForm(p=>({...p,work_mode:e.target.value}))}>
                {WORK_MODES.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className="field-label">India office cities</label>
              <input className="input mt-1" placeholder="e.g. Bangalore, Pune" value={form.india_cities} onChange={e => setForm(p=>({...p,india_cities:e.target.value}))} />
            </div>
            <div>
              <label className="field-label">Salary range (INR)</label>
              <input className="input mt-1" placeholder="e.g. ₹25–60 LPA" value={form.salary_range} onChange={e => setForm(p=>({...p,salary_range:e.target.value}))} />
            </div>
            <div>
              <label className="field-label">Difficulty</label>
              <select className="select mt-1" value={form.difficulty} onChange={e => setForm(p=>({...p,difficulty:e.target.value}))}>
                {DIFFICULTIES.map(d => <option key={d} value={d}>{DIFFICULTY_EMOJI[d]} {d}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className="field-label">Roles hiring for</label>
              <input className="input mt-1" placeholder="e.g. MLE, DS, MLOps" value={form.roles} onChange={e => setForm(p=>({...p,roles:e.target.value}))} />
            </div>
            <div>
              <label className="field-label">Total rounds</label>
              <input className="input mt-1" placeholder="e.g. 4–5" value={form.total_rounds} onChange={e => setForm(p=>({...p,total_rounds:e.target.value}))} />
            </div>
            <div>
              <label className="field-label">Coding rounds</label>
              <input className="input mt-1" placeholder="e.g. 1–2" value={form.coding_rounds} onChange={e => setForm(p=>({...p,coding_rounds:e.target.value}))} />
            </div>
            <div>
              <label className="field-label">ML/AI rounds</label>
              <input className="input mt-1" placeholder="e.g. 2" value={form.ml_rounds} onChange={e => setForm(p=>({...p,ml_rounds:e.target.value}))} />
            </div>
            <div>
              <label className="field-label">System design</label>
              <input className="input mt-1" placeholder="e.g. 1" value={form.sys_design} onChange={e => setForm(p=>({...p,sys_design:e.target.value}))} />
            </div>
            <div>
              <label className="field-label">BQ rounds</label>
              <input className="input mt-1" placeholder="e.g. 1" value={form.bq_rounds} onChange={e => setForm(p=>({...p,bq_rounds:e.target.value}))} />
            </div>
            <div>
              <label className="field-label">Timeline (weeks)</label>
              <input className="input mt-1" placeholder="e.g. 4–6 wks" value={form.timeline_weeks} onChange={e => setForm(p=>({...p,timeline_weeks:e.target.value}))} />
            </div>
            <div className="flex items-center gap-2 mt-1">
              <input type="checkbox" id="takehome" checked={form.take_home} onChange={e => setForm(p=>({...p,take_home:e.target.checked}))} className="accent-brand-500" />
              <label htmlFor="takehome" className="field-label cursor-pointer">Take-home assignment</label>
            </div>
            <div className="col-span-2">
              <label className="field-label">Careers page URL</label>
              <input className="input mt-1" placeholder="https://…" value={form.careers_url} onChange={e => setForm(p=>({...p,careers_url:e.target.value}))} />
            </div>
            <div className="col-span-2">
              <label className="field-label">Interview tips / notes</label>
              <textarea className="input mt-1 h-20 resize-none" placeholder="Any tips, referral contact, interview style notes…" value={form.interview_tips} onChange={e => setForm(p=>({...p,interview_tips:e.target.value}))} />
            </div>
          </div>
          <div className="flex justify-between items-center pt-1">
            {editing && (
              <button onClick={() => { deleteCompany(editing.id); setModal(false) }} className="text-xs text-red-400 hover:text-red-600">
                Delete company
              </button>
            )}
            <div className="flex gap-2 ml-auto">
              <button className="btn-secondary" onClick={() => setModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={saveCompany} disabled={saving}>{saving ? 'Saving…' : editing ? 'Save changes' : 'Add company'}</button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
