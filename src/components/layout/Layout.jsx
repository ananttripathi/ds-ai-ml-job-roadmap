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
      </div>
    </div>
  )
}
