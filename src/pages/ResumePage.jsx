import { useState, useRef } from 'react'

const HF_BASE = 'https://ananttripathiak-resume-analyzer.hf.space/gradio_api'

export default function ResumePage() {
  const [file, setFile]       = useState(null)
  const [jd, setJd]           = useState('')
  const [loading, setLoading] = useState(false)
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
    setLoading(true)
    setResults(null)

    try {
      // 1. Upload PDF to HuggingFace Space
      const form = new FormData()
      form.append('files', file)
      const upRes = await fetch(`${HF_BASE}/upload`, { method: 'POST', body: form })
      if (!upRes.ok) throw new Error('File upload failed')
      const [uploaded] = await upRes.json()

      // 2. Trigger analysis
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
      if (!callRes.ok) throw new Error('Analysis failed')
      const { event_id } = await callRes.json()

      // 3. Stream SSE result
      const stream = await fetch(`${HF_BASE}/call/analyze_resume/${event_id}`)
      const reader  = stream.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let finalData = null

      while (true) {
        const { done, value } = await reader.read()
        if (value) buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = done ? '' : lines.pop()
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const parsed = JSON.parse(line.slice(6))
              if (Array.isArray(parsed)) finalData = parsed
            } catch {}
          }
        }
        if (done) break
      }

      if (!finalData) throw new Error('No results returned from analyzer')
      setResults(finalData)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="topbar">
        <h1 className="text-sm font-semibold text-neutral-900 dark:text-white">Resume Analyzer</h1>
        <p className="text-xs text-neutral-400 dark:text-neutral-500 ml-auto">
          Powered by your HuggingFace Space
        </p>
      </div>

      <div className="page-body max-w-5xl mx-auto">
        {/* Input card */}
        <div className="card p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Resume upload */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                Resume (PDF)
              </label>
              <div
                onClick={() => fileRef.current?.click()}
                className="border-2 border-dashed border-neutral-200 dark:border-neutral-700
                           rounded-xl p-6 text-center cursor-pointer
                           hover:border-neutral-400 dark:hover:border-neutral-500
                           transition-colors"
              >
                {file ? (
                  <div>
                    <div className="text-2xl mb-1">📄</div>
                    <div className="text-sm font-medium text-neutral-900 dark:text-white truncate">{file.name}</div>
                    <div className="text-xs text-neutral-400 mt-0.5">
                      {(file.size / 1024).toFixed(0)} KB · click to change
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-3xl mb-2">📤</div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">Click to upload PDF</div>
                    <div className="text-xs text-neutral-400 dark:text-neutral-600 mt-1">Only PDF supported</div>
                  </div>
                )}
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={onFileChange}
                />
              </div>
            </div>

            {/* JD input */}
            <div className="flex flex-col">
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                Job Description <span className="font-normal text-neutral-400">(optional)</span>
              </label>
              <textarea
                value={jd}
                onChange={e => setJd(e.target.value)}
                placeholder="Paste the job description here to get an ATS match score..."
                className="input flex-1 resize-none min-h-[140px] text-xs"
              />
            </div>
          </div>

          {error && (
            <p className="mt-3 text-xs text-red-500 dark:text-red-400">{error}</p>
          )}

          <div className="mt-5 flex justify-end">
            <button
              onClick={analyze}
              disabled={loading || !file}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing…
                </>
              ) : '🔍 Analyze Resume'}
            </button>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="card p-10 text-center">
            <div className="w-8 h-8 border-2 border-neutral-200 border-t-neutral-900 dark:border-neutral-700 dark:border-t-brand-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Analyzing your resume with AI… this may take 20–40 seconds
            </p>
          </div>
        )}

        {/* Results */}
        {results && !loading && (
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
