import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '@/shared/stores/auth.store'
import { useEffect } from 'react'

export const Route = createFileRoute('/_protected/_official')({
  component: OfficialLayout,
})

function OfficialLayout() {
  const { user } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (user && user.role !== 'barangay_official' && user.role !== 'admin') {
      navigate({ to: '/dashboard' })
    }
  }, [user, navigate])

  if (!user || (user.role !== 'barangay_official' && user.role !== 'admin')) {
    return <div>Access Denied</div>
  }

  return <Outlet />
}
