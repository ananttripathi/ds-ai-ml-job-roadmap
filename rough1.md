@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --sidebar-w: 200px;
    --topbar-h: 52px;
  }

  * { box-sizing: border-box; }

  body {
    @apply bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100;
    font-family: 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { @apply bg-neutral-200 dark:bg-neutral-700 rounded-full; }

  /* Focus ring */
  input:focus, textarea:focus, select:focus {
    outline: none;
    @apply ring-1 ring-neutral-900 dark:ring-brand-500;
  }
}

@layer components {
  /* ---- Layout ---- */
  .sidebar {
    @apply fixed top-0 left-0 h-full flex flex-col bg-neutral-50 dark:bg-neutral-900
           border-r border-neutral-200 dark:border-neutral-800;
    width: var(--sidebar-w);
    z-index: 40;
  }

  .main-content {
    @apply flex flex-col min-h-screen;
    margin-left: var(--sidebar-w);
  }

  .topbar {
    @apply sticky top-0 flex items-center gap-3 px-6 bg-white dark:bg-neutral-950
           border-b border-neutral-100 dark:border-neutral-800;
    height: var(--topbar-h);
    z-index: 30;
  }

  .page-body {
    @apply p-6 flex-1;
  }

  /* ---- Cards ---- */
  .card {
    @apply bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-xl;
  }

  .metric-card {
    @apply bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-lg p-4;
  }

  /* ---- Buttons ---- */
  .btn-primary {
    @apply flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold
           bg-neutral-900 text-white dark:bg-brand-500 dark:text-white
           hover:bg-neutral-700 dark:hover:bg-brand-600
           transition-colors cursor-pointer border-0;
  }

  .btn-secondary {
    @apply flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium
           bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300
           hover:bg-neutral-200 dark:hover:bg-neutral-700
           transition-colors cursor-pointer border-0;
  }

  .btn-ghost {
    @apply flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm
           text-neutral-500 dark:text-neutral-400
           hover:bg-neutral-100 dark:hover:bg-neutral-800
           transition-colors cursor-pointer border-0 bg-transparent;
  }

  /* ---- Nav items ---- */
  .nav-item {
    @apply flex items-center gap-2.5 px-4 py-2 text-sm rounded-none
           text-neutral-500 dark:text-neutral-500 cursor-pointer transition-all;
  }

  .nav-item:hover {
    @apply bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-200;
  }

  .nav-item.active {
    @apply bg-neutral-900 text-white dark:bg-transparent dark:text-white
           dark:border-l-2 dark:border-brand-500;
  }

  /* ---- Form elements ---- */
  .input {
    @apply w-full px-3 py-2 rounded-lg text-sm
           bg-neutral-50 dark:bg-neutral-900
           border border-neutral-200 dark:border-neutral-700
           text-neutral-900 dark:text-neutral-100
           placeholder-neutral-400 dark:placeholder-neutral-600
           transition-colors;
  }

  .select {
    @apply w-full px-3 py-2 rounded-lg text-sm cursor-pointer
           bg-neutral-50 dark:bg-neutral-900
           border border-neutral-200 dark:border-neutral-700
           text-neutral-900 dark:text-neutral-100;
  }

  /* ---- Status badges ---- */
  .badge-done      { @apply text-xs px-2 py-0.5 rounded-full font-medium bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-400; }
  .badge-progress  { @apply text-xs px-2 py-0.5 rounded-full font-medium bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-400; }
  .badge-not       { @apply text-xs px-2 py-0.5 rounded-full font-medium bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-500; }

  .badge-watchlist   { @apply text-xs px-2 py-0.5 rounded-full font-medium bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400; }
  .badge-applied     { @apply text-xs px-2 py-0.5 rounded-full font-medium bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-400; }
  .badge-interviewing{ @apply text-xs px-2 py-0.5 rounded-full font-medium bg-violet-50 text-violet-800 dark:bg-violet-950 dark:text-violet-400; }
  .badge-offered     { @apply text-xs px-2 py-0.5 rounded-full font-medium bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-400; }
  .badge-rejected    { @apply text-xs px-2 py-0.5 rounded-full font-medium bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-400; }

  .badge-hybrid  { @apply text-xs px-2 py-0.5 rounded-full font-medium bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-400; }
  .badge-remote  { @apply text-xs px-2 py-0.5 rounded-full font-medium bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-400; }
  .badge-wfo     { @apply text-xs px-2 py-0.5 rounded-full font-medium bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-400; }

  /* ---- Progress bar ---- */
  .prog-track { @apply flex-1 h-1 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden; }
  .prog-fill  { @apply h-full rounded-full bg-neutral-900 dark:bg-brand-500 transition-all; }

  /* ---- Divider ---- */
  .divider { @apply border-t border-neutral-100 dark:border-neutral-800; }

  /* ---- Modal overlay ---- */
  .modal-overlay {
    @apply fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center p-4;
  }

  .modal-box {
    @apply bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700
           rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto;
  }
}
