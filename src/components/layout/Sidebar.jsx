import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useTheme } from '@/context/ThemeContext'

const NAV = [
  { section: 'Overview' },
  { to: '/',             icon: '⊞', label: 'Dashboard' },
  { section: 'Learning' },
  { to: '/syllabus',     icon: '📚', label: 'Syllabus' },
  { to: '/goals',        icon: '🎯', label: 'Daily goals' },
  { to: '/notes',        icon: '📝', label: 'Notes' },
  { section: 'Career' },
  { to: '/applications', icon: '💼', label: 'Applications' },
  { to: '/companies',    icon: '🏢', label: 'Companies' },
  { to: '/resume',       icon: '📋', label: 'Resume' },
]

export default function Sidebar({ open, onClose }) {
  const { profile, signOut } = useAuth()
  const { dark, toggle } = useTheme()
  const navigate = useNavigate()

  const initials = profile?.full_name
    ? profile.full_name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : profile?.email?.[0]?.toUpperCase() ?? 'U'

  async function handleSignOut() {
    await signOut()
    navigate('/auth')
  }

  return (
    <aside
      className={`sidebar z-40 transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      style={{ width: 200 }}
    >
      {/* Logo */}
      <div className="px-4 py-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
        <div className="min-w-0">
          <div className="text-sm font-bold tracking-tight text-neutral-900 dark:text-white">
            ML Career Hub
          </div>
          <div className="text-xs text-neutral-400 dark:text-neutral-600 mt-0.5 truncate">
            {profile?.full_name || profile?.email || 'Loading…'}
          </div>
        </div>
        <button
          onClick={onClose}
          className="md:hidden ml-2 p-1 rounded text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 flex-shrink-0"
        >
          ✕
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-2 overflow-y-auto">
        {NAV.map((item, i) => {
          if (item.section) return (
            <div key={i} className="px-4 pt-4 pb-1 text-[9px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-600">
              {item.section}
            </div>
          )
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                `nav-item ${isActive ? 'active' : ''}`
              }
            >
              <span className="text-base leading-none">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-neutral-200 dark:border-neutral-800 p-3 space-y-2">
        {/* Theme toggle */}
        <button
          onClick={toggle}
          className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs
                     text-neutral-500 dark:text-neutral-400
                     hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <span>{dark ? '☀️' : '🌙'}</span>
          <span>{dark ? 'Light mode' : 'Dark mode'}</span>
        </button>

        {/* User */}
        <div className="flex items-center gap-2 px-1">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0
                          bg-blue-100 text-blue-800 dark:bg-brand-500 dark:text-white">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-neutral-900 dark:text-neutral-200 truncate">
              {profile?.full_name?.split(' ')[0] ?? 'User'}
            </div>
            <button
              onClick={handleSignOut}
              className="text-[10px] text-neutral-400 dark:text-neutral-600 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
