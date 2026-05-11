import { useState, useRef } from 'react'

const HF_BASE = 'https://ananttripathiak-resume-analyzer.hf.space/gradio_api'
const HF_SPACE_URL = 'https://huggingface.co/spaces/ananttripathiak/resume-analyzer'

export default function ResumePage() {
  const [mode, setMode]       = useState(null)   // null | 'inline'
  const [file, setFile]       = useState(null)
  const [jd, setJd]           = useState('')
  const [step, setStep]       = useState('')      // progress label
  const [results, setResults] = useState(null)
  const [error, setError]     = useState('')
  const fileRef               = useRef(null)

  function onFileChange(e) {
    const f = e.target.files[0]
    if (f && f.type === 'application/pdf') { setFile(f); setError('') }
    else setError('Please select a PDF file')
  }

  async function analyze() {
    if (!file) { setError('Upload a PDF resume first'); return }
    setError('')
    setResults(null)

    try {
      // Upload
      setStep('Uploading resume…')
      const form = new FormData()
      form.append('files', file)
      const upRes = await fetch(`${HF_BASE}/upload`, { method: 'POST', body: form })
      if (!upRes.ok) throw new Error('File upload failed')
      const [uploaded] = await upRes.json()

      // Trigger
      setStep('Sending to AI analyzer…')
      const callRes = await fetch(`${HF_BASE}/call/analyze_resume`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: [
            { path: uploaded.path, orig_name: file.name, meta: { _type: 'gradio.FileData' } },
            jd || '',
          ],
        }),
      })
      if (!callRes.ok) throw new Error('Failed to start analysis')
      const { event_id } = await callRes.json()

      // Poll result — read full text instead of streaming
      setStep('Analyzing… this takes 20–40 seconds')
      const resultRes = await fetch(`${HF_BASE}/call/analyze_resume/${event_id}`)
      if (!resultRes.ok) throw new Error('Failed to get results')
      const text = await resultRes.text()

      // Parse all data lines, keep the last array found
      let finalData = null
      for (const line of text.split('\n')) {
        if (line.startsWith('data: ')) {
          try {
            const parsed = JSON.parse(line.slice(6))
            if (Array.isArray(parsed)) finalData = parsed
          } catch {}
        }
      }

      if (!finalData) throw new Error('No results returned — the Space may be sleeping, try again in 30s')
      setResults(finalData)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setStep('')
    }
  }

  // ── Landing: pick a mode ──────────────────────────────────────────────────
  if (!mode) {
    return (
      <>
        <div className="topbar">
          <h1 className="text-sm font-semibold text-neutral-900 dark:text-white">Resume Analyzer</h1>
        </div>
        <div className="page-body flex items-center justify-center min-h-[60vh]">
          <div className="w-full max-w-2xl">
            <p className="text-center text-neutral-500 dark:text-neutral-400 text-sm mb-8">
              How do you want to analyze your resume?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Inline option */}
              <button
                onClick={() => setMode('inline')}
                className="card p-6 text-left hover:border-neutral-300 dark:hover:border-neutral-600
                           transition-all hover:shadow-sm cursor-pointer group"
              >
                <div className="text-3xl mb-3">📋</div>
                <div className="text-sm font-semibold text-neutral-900 dark:text-white mb-1 group-hover:text-neutral-700 dark:group-hover:text-neutral-200">
                  Analyze here
                </div>
                <div className="text-xs text-neutral-400 dark:text-neutral-500 leading-relaxed">
                  Upload your PDF and paste a job description. Results appear directly inside the app.
                </div>
              </button>

              {/* HuggingFace option */}
              <a
                href={HF_SPACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="card p-6 text-left hover:border-neutral-300 dark:hover:border-neutral-600
                           transition-all hover:shadow-sm cursor-pointer group no-underline"
              >
                <div className="text-3xl mb-3">🚀</div>
                <div className="text-sm font-semibold text-neutral-900 dark:text-white mb-1 group-hover:text-neutral-700 dark:group-hover:text-neutral-200">
                  Open in HuggingFace
                  <span className="ml-1.5 text-[10px] text-neutral-400">↗</span>
                </div>
                <div className="text-xs text-neutral-400 dark:text-neutral-500 leading-relaxed">
                  Full Gradio UI with charts and detailed visualizations. Opens in a new tab.
                </div>
              </a>
            </div>
          </div>
        </div>
      </>
    )
  }

  // ── Inline analyzer ───────────────────────────────────────────────────────
  return (
    <>
      <div className="topbar">
        <button
          onClick={() => { setMode(null); setResults(null); setError(''); setFile(null); setJd('') }}
          className="btn-ghost text-xs px-2 py-1"
        >
          ← Back
        </button>
        <h1 className="text-sm font-semibold text-neutral-900 dark:text-white">Resume Analyzer</h1>
        <p className="text-xs text-neutral-400 dark:text-neutral-500 ml-auto hidden sm:block">
          Powered by your HuggingFace Space
        </p>
      </div>

      <div className="page-body max-w-5xl mx-auto">
        <div className="card p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* PDF upload */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                Resume (PDF)
              </label>
              <div
                onClick={() => fileRef.current?.click()}
                className="border-2 border-dashed border-neutral-200 dark:border-neutral-700
                           rounded-xl p-6 text-center cursor-pointer
                           hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors"
              >
                {file ? (
                  <>
                    <div className="text-2xl mb-1">📄</div>
                    <div className="text-sm font-medium text-neutral-900 dark:text-white truncate">{file.name}</div>
                    <div className="text-xs text-neutral-400 mt-0.5">
                      {(file.size / 1024).toFixed(0)} KB · click to change
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-3xl mb-2">📤</div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">Click to upload PDF</div>
                    <div className="text-xs text-neutral-400 dark:text-neutral-600 mt-1">Only PDF supported</div>
                  </>
                )}
                <input ref={fileRef} type="file" accept=".pdf" className="hidden" onChange={onFileChange} />
              </div>
            </div>

            {/* JD */}
            <div className="flex flex-col">
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                Job Description <span className="font-normal text-neutral-400">(optional)</span>
              </label>
              <textarea
                value={jd}
                onChange={e => setJd(e.target.value)}
                placeholder="Paste the job description here to get an ATS match score…"
                className="input flex-1 resize-none min-h-[140px] text-xs"
              />
            </div>
          </div>

          {error && <p className="mt-3 text-xs text-red-500 dark:text-red-400">{error}</p>}

          <div className="mt-5 flex justify-end">
            <button
              onClick={analyze}
              disabled={!!step || !file}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {step}
                </>
              ) : '🔍 Analyze Resume'}
            </button>
          </div>
        </div>

        {/* Results */}
        {results && !step && (
          <div className="space-y-4">
            {results.map((html, i) =>
              html ? (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-neutral-100 dark:border-neutral-800 overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              ) : null
            )}
          </div>
        )}
      </div>
    </>
  )
}
