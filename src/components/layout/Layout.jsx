import { useState } from 'react'
import Sidebar from './Sidebar'

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col md:ml-[200px]">
        <div className="md:hidden sticky top-0 z-20 flex items-center gap-3 px-4 bg-white dark:bg-neutral-950 border-b border-neutral-100 dark:border-neutral-800" style={{ height: 52 }}>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 rounded-lg text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-lg leading-none"
          >
            ☰
          </button>
          <span className="text-sm font-bold text-neutral-900 dark:text-white">ML Career Hub</span>
        </div>
        {children}

        {/* Footer */}
        <footer className="border-t border-neutral-100 dark:border-neutral-800 px-6 py-4 mt-auto">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <p className="text-xs text-neutral-400 dark:text-neutral-500 flex-shrink-0">
              Made by{' '}
              <a
                href="https://ananttripathi.github.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                Anant Tripathi
              </a>
            </p>
            <div className="flex flex-wrap gap-x-3 gap-y-1.5">
              {[
                { label: 'Portfolio',    href: 'https://ananttripathi.github.io/' },
                { label: 'LinkedIn',    href: 'https://linkedin.com/in/ananttripathiak' },
                { label: 'GitHub',      href: 'https://github.com/ananttripathi' },
                { label: 'HuggingFace',href: 'https://huggingface.co/ananttripathiak' },
                { label: 'Kaggle',      href: 'https://www.kaggle.com/anantkumartripathi' },
                { label: 'Streamlit',   href: 'https://share.streamlit.io/user/ananttripathi' },
                { label: 'ORCID',       href: 'https://orcid.org/0009-0006-8030-3942' },
                { label: 'Email',       href: 'mailto:ananttripathikt@gmail.com' },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="text-[11px] text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
