import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '@/shared/stores/auth.store'
import { useEffect } from 'react'

export const Route = createFileRoute('/_protected/citizen')({
  component: CitizenLayout,
})

function CitizenLayout() {
  const { user } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    // Basic role check. If user is not a citizen, redirect to their home
    if (user && user.role !== 'citizen') {
      if (user.role === 'admin') {
        navigate({ to: '/admin/dashboard' })
      } else if (user.role === 'barangay_official') {
        navigate({ to: '/official/dashboard' })
      }
    }
  }, [user, navigate])

  if (!user || user.role !== 'citizen') {
    return null
  }

  return <Outlet />
}
