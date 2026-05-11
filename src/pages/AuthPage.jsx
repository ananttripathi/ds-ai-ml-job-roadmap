import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'

export default function AuthPage() {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth()
  const [tab, setTab]         = useState('login')    // 'login' | 'register'
  const [fullName, setFullName] = useState('')
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleGoogle() {
    setError('')
    await signInWithGoogle()
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(''); setMessage(''); setLoading(true)
    try {
      if (tab === 'login') {
        const { error } = await signInWithEmail(email, password)
        if (error) setError(error.message)
      } else {
        const { error } = await signUpWithEmail(email, password, fullName)
        if (error) setError(error.message)
        else setMessage('Check your email to confirm your account.')
      }
    } finally {
      setLoading(false)
    }
  }

  const FEATURES = [
    { icon: '📚', title: 'Syllabus tracker',     desc: '500+ topics across 29 courses. Mark progress per topic.' },
    { icon: '💼', title: 'Application Kanban',   desc: 'Track 178+ India companies from watchlist to offer.' },
    { icon: '🔥', title: 'Study streak',          desc: 'Daily goals, heatmap, and weekly completion stats.' },
    { icon: '📱', title: 'Any device',            desc: 'Progress synced — laptop, phone, office, anywhere.' },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 dark:bg-neutral-950 p-4">
      <div className="flex w-full max-w-3xl rounded-2xl overflow-hidden shadow-xl border border-neutral-200 dark:border-neutral-800">

        {/* Left — brand panel */}
        <div className="hidden md:flex w-64 flex-col justify-between p-8 bg-neutral-900 dark:bg-neutral-900">
          <div>
            <div className="text-lg font-extrabold text-white tracking-tight">ML Career Hub</div>
            <div className="text-xs text-neutral-500 mt-1 leading-relaxed">
              Personal tracker for<br />DS · MLE · AIE · MLOps
            </div>
          </div>
          <div className="space-y-5 my-8">
            {FEATURES.map(f => (
              <div key={f.title} className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center text-base flex-shrink-0">
                  {f.icon}
                </div>
                <div>
                  <div className="text-xs font-semibold text-neutral-200">{f.title}</div>
                  <div className="text-[11px] text-neutral-500 leading-relaxed mt-0.5">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-[10px] text-neutral-600 leading-relaxed">
            Free forever · No ads · Your data stays yours
          </div>
        </div>

        {/* Right — auth form */}
        <div className="flex-1 flex items-center justify-center p-8 bg-white dark:bg-neutral-950">
          <div className="w-full max-w-xs">

            <h1 className="text-lg font-extrabold text-neutral-900 dark:text-white mb-1">
              {tab === 'login' ? 'Welcome back' : 'Create account'}
            </h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-500 mb-6">
              {tab === 'login' ? 'Sign in to your tracker' : 'Free forever. No card needed.'}
            </p>

            {/* Google */}
            <button
              onClick={handleGoogle}
              className="w-full flex items-center justify-center gap-3 py-2.5 rounded-xl
                         border border-neutral-200 dark:border-neutral-700 text-sm font-semibold
                         text-neutral-800 dark:text-neutral-200
                         bg-white dark:bg-neutral-900
                         hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors mb-4"
            >
              <span className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 via-red-500 to-yellow-400
                               flex items-center justify-center text-white text-xs font-black">G</span>
              {tab === 'login' ? 'Continue with Google' : 'Sign up with Google'}
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-neutral-100 dark:bg-neutral-800" />
              <span className="text-xs text-neutral-400">or with email</span>
              <div className="flex-1 h-px bg-neutral-100 dark:bg-neutral-800" />
            </div>

            {error && (
              <div className="mb-3 px-3 py-2 rounded-lg bg-red-50 dark:bg-red-950 text-xs text-red-700 dark:text-red-400">
                {error}
              </div>
            )}
            {message && (
              <div className="mb-3 px-3 py-2 rounded-lg bg-green-50 dark:bg-green-950 text-xs text-green-700 dark:text-green-400">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              {tab === 'register' && (
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Full name</label>
                  <input
                    className="input"
                    type="text"
                    placeholder="Anant Tripathi"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    required
                  />
                </div>
              )}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Email</label>
                <input
                  className="input"
                  type="email"
                  placeholder="anant@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Password</label>
                <input
                  className="input"
                  type="password"
                  placeholder={tab === 'register' ? 'Min 8 characters' : '••••••••'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  minLength={tab === 'register' ? 8 : 1}
                />
              </div>
              {tab === 'login' && (
                <div className="text-right">
                  <span className="text-[11px] text-neutral-400 hover:text-neutral-600 cursor-pointer">
                    Forgot password?
                  </span>
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center mt-1 disabled:opacity-50"
              >
                {loading ? 'Please wait…' : tab === 'login' ? 'Sign in' : 'Create account'}
              </button>
            </form>

            <p className="text-center text-xs text-neutral-400 dark:text-neutral-600 mt-5">
              {tab === 'login' ? "No account? " : "Already have one? "}
              <button
                onClick={() => { setTab(tab === 'login' ? 'register' : 'login'); setError(''); setMessage('') }}
                className="font-semibold text-neutral-900 dark:text-brand-400 hover:underline"
              >
                {tab === 'login' ? 'Create one free' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
