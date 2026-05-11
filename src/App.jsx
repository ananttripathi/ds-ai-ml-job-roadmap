import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/context/AuthContext'
import { ThemeProvider } from '@/context/ThemeContext'
import { useSeed } from '@/hooks/useSeed'

import AuthPage     from '@/pages/AuthPage'
import DashboardPage from '@/pages/DashboardPage'
import SyllabusPage  from '@/pages/SyllabusPage'
import ApplicationsPage from '@/pages/ApplicationsPage'
import GoalsPage     from '@/pages/GoalsPage'
import NotesPage     from '@/pages/NotesPage'
import CompaniesPage from '@/pages/CompaniesPage'
import ResumePage    from '@/pages/ResumePage'
import Layout        from '@/components/layout/Layout'

function ProtectedRoutes() {
  const { user, loading } = useAuth()
  useSeed(user?.id)

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-6 h-6 border-2 border-neutral-300 border-t-neutral-900 dark:border-neutral-700 dark:border-t-brand-500 rounded-full animate-spin" />
    </div>
  )

  if (!user) return <Navigate to="/auth" replace />

  return (
    <Layout>
      <Routes>
        <Route path="/"            element={<DashboardPage />} />
        <Route path="/syllabus"    element={<SyllabusPage />} />
        <Route path="/applications"element={<ApplicationsPage />} />
        <Route path="/goals"       element={<GoalsPage />} />
        <Route path="/notes"       element={<NotesPage />} />
        <Route path="/companies"   element={<CompaniesPage />} />
        <Route path="/resume"      element={<ResumePage />} />
        <Route path="*"            element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<AuthGate />} />
            <Route path="/*"   element={<ProtectedRoutes />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

function AuthGate() {
  const { user, loading } = useAuth()
  if (loading) return null
  if (user) return <Navigate to="/" replace />
  return <AuthPage />
}
