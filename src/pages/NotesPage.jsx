import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import Modal from '@/components/ui/Modal'
import Spinner from '@/components/ui/Spinner'

const TAG_COLORS = [
  '#7F77DD','#0C447C','#27500A','#633806','#D4537E',
  '#1D9E75','#D85A30','#888780','#639922','#3C3489',
]

export default function NotesPage() {
  const { user } = useAuth()
  const [notes, setNotes]   = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [modal, setModal]   = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm]     = useState({ title:'', body:'', tags:[] })
  const [tagInput, setTagInput] = useState('')
  const [saving, setSaving] = useState(false)
  const [viewNote, setViewNote] = useState(null)

  useEffect(() => { loadNotes() }, [user])

  async function loadNotes() {
    const { data } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    setNotes(data || [])
    setLoading(false)
  }

  function openAdd() {
    setEditing(null); setForm({ title:'', body:'', tags:[] }); setTagInput(''); setModal(true)
  }

  function openEdit(note) {
    setEditing(note); setForm({ title: note.title, body: note.body || '', tags: note.tags || [] }); setTagInput(''); setModal(true)
  }

  async function saveNote() {
    if (!form.title.trim() && !form.body.trim()) return
    setSaving(true)
    const payload = { title: form.title || 'Untitled', body: form.body, tags: form.tags, user_id: user.id }
    if (editing) {
      const { data } = await supabase.from('notes').update(payload).eq('id', editing.id).select().single()
      setNotes(prev => prev.map(n => n.id === editing.id ? data : n))
    } else {
      const { data } = await supabase.from('notes').insert(payload).select().single()
      setNotes(prev => [data, ...prev])
    }
    setSaving(false); setModal(false)
  }

  async function deleteNote(id) {
    if (!confirm('Delete this note?')) return
    setNotes(prev => prev.filter(n => n.id !== id))
    await supabase.from('notes').delete().eq('id', id)
    if (viewNote?.id === id) setViewNote(null)
  }

  function addTag() {
    const t = tagInput.trim()
    if (!t || form.tags.includes(t)) return
    setForm(p => ({ ...p, tags: [...p.tags, t] }))
    setTagInput('')
  }

  function removeTag(t) {
    setForm(p => ({ ...p, tags: p.tags.filter(x => x !== t) }))
  }

  const filtered = notes.filter(n =>
    !search ||
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    (n.body || '').toLowerCase().includes(search.toLowerCase()) ||
    (n.tags || []).some(t => t.toLowerCase().includes(search.toLowerCase()))
  )

  if (loading) return <div className="flex items-center justify-center flex-1 min-h-screen"><Spinner size={6} /></div>

  return (
    <div className="flex flex-col min-h-screen">
      {/* Topbar */}
      <div className="topbar gap-3">
        <div className="text-sm font-bold text-neutral-900 dark:text-white flex-1">
          Notes <span className="text-neutral-400 font-normal text-xs ml-1">{notes.length}</span>
        </div>
        <div className="relative max-w-xs flex-1">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400 text-xs">🔍</span>
          <input className="input pl-7 text-xs h-8" placeholder="Search notes…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <button onClick={openAdd} className="btn-primary text-xs h-8 px-3">+ New note</button>
      </div>

      <div className="page-body flex gap-5">
        {/* Grid */}
        <div className="flex-1">
          {filtered.length === 0 && (
            <div className="text-center py-16 text-sm text-neutral-400">
              {search ? 'No notes match your search.' : 'No notes yet. Create your first one.'}
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map(n => (
              <div
                key={n.id}
                className="card p-4 cursor-pointer hover:shadow-md transition-shadow group"
                onClick={() => setViewNote(n)}
              >
                {/* Tags */}
                {(n.tags || []).length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {n.tags.slice(0, 3).map((t, i) => (
                      <span key={t} className="text-[9px] px-1.5 py-0.5 rounded font-bold text-white"
                            style={{ background: TAG_COLORS[i % TAG_COLORS.length] }}>
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                <div className="text-sm font-bold text-neutral-900 dark:text-white mb-1 leading-tight">{n.title}</div>
                {n.body && (
                  <div className="text-xs text-neutral-500 dark:text-neutral-500 line-clamp-3 leading-relaxed">
                    {n.body}
                  </div>
                )}
                <div className="flex items-center justify-between mt-3">
                  <span className="text-[10px] text-neutral-300 dark:text-neutral-700">
                    {new Date(n.created_at).toLocaleDateString('en-IN', { day:'numeric', month:'short' })}
                  </span>
                  <div className="opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity" onClick={e => e.stopPropagation()}>
                    <button onClick={() => openEdit(n)} className="text-[10px] text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 px-1">Edit</button>
                    <button onClick={() => deleteNote(n.id)} className="text-[10px] text-neutral-400 hover:text-red-500 px-1">Delete</button>
                  </div>
                </div>
              </div>
            ))}

            {/* New note card */}
            <div
              onClick={openAdd}
              className="card p-4 cursor-pointer border-dashed border-2 border-neutral-200 dark:border-neutral-800
                         hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors
                         flex items-center justify-center flex-col gap-2 min-h-28"
            >
              <span className="text-2xl text-neutral-300 dark:text-neutral-700">+</span>
              <span className="text-xs text-neutral-400">New note</span>
            </div>
          </div>
        </div>

        {/* Note viewer panel */}
        {viewNote && (
          <div className="w-72 flex-shrink-0 card p-5 self-start sticky top-16">
            <div className="flex items-start justify-between mb-3">
              <div className="flex flex-wrap gap-1">
                {(viewNote.tags || []).map((t, i) => (
                  <span key={t} className="text-[9px] px-1.5 py-0.5 rounded font-bold text-white"
                        style={{ background: TAG_COLORS[i % TAG_COLORS.length] }}>
                    {t}
                  </span>
                ))}
              </div>
              <button onClick={() => setViewNote(null)} className="text-neutral-400 hover:text-neutral-600 text-lg leading-none ml-2">×</button>
            </div>
            <div className="text-sm font-bold text-neutral-900 dark:text-white mb-2">{viewNote.title}</div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 whitespace-pre-wrap leading-relaxed">{viewNote.body}</div>
            <div className="flex gap-2 mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800">
              <button onClick={() => openEdit(viewNote)} className="btn-secondary text-xs px-3 py-1.5">Edit</button>
              <button onClick={() => deleteNote(viewNote.id)} className="btn-ghost text-xs text-red-400 px-3 py-1.5">Delete</button>
            </div>
          </div>
        )}
      </div>

      {/* Add / edit modal */}
      <Modal open={modal} onClose={() => setModal(false)} title={editing ? 'Edit note' : 'New note'}>
        <div className="space-y-3">
          <div>
            <label className="field-label">Title</label>
            <input className="input mt-1" placeholder="Note title…" value={form.title} onChange={e => setForm(p=>({...p,title:e.target.value}))} />
          </div>
          <div>
            <label className="field-label">Body</label>
            <textarea
              className="input mt-1 resize-none"
              style={{ minHeight: 140 }}
              placeholder="Write your notes, formulas, takeaways…"
              value={form.body}
              onChange={e => setForm(p=>({...p,body:e.target.value}))}
            />
          </div>
          <div>
            <label className="field-label">Tags</label>
            <div className="flex gap-2 mt-1">
              <input
                className="input flex-1 text-xs h-8"
                placeholder="Add tag…"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addTag()}
              />
              <button onClick={addTag} className="btn-secondary text-xs h-8 px-3">Add</button>
            </div>
            {form.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {form.tags.map((t, i) => (
                  <span key={t} className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full text-white font-bold"
                        style={{ background: TAG_COLORS[i % TAG_COLORS.length] }}>
                    {t}
                    <button onClick={() => removeTag(t)} className="opacity-70 hover:opacity-100">×</button>
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-2 justify-end pt-1">
            <button className="btn-secondary" onClick={() => setModal(false)}>Cancel</button>
            <button className="btn-primary" onClick={saveNote} disabled={saving}>{saving ? 'Saving…' : editing ? 'Save changes' : 'Save note'}</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
