import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '@/shared/stores/auth.store'
import { useEffect } from 'react'

export const Route = createFileRoute('/_protected/_admin')({
  component: AdminLayout,
})

function AdminLayout() {
  const { user } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate({ to: '/dashboard' })
    }
  }, [user, navigate])

  if (!user || user.role !== 'admin') {
    return <div>Access Denied</div>
  }

  return <Outlet />
}
