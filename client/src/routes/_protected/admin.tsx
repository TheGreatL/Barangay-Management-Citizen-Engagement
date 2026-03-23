import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '@/shared/stores/auth.store'
import { useEffect } from 'react'

export const Route = createFileRoute('/_protected/admin')({
  component: AdminLayout,
})

function AdminLayout() {
  const { user } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate({ to: '/login' })
    }
  }, [user, navigate])

  if (!user || user.role !== 'admin') {
    return null // Or a loading/unauthorized state
  }

  return (
    <div className="container mx-auto">
      <Outlet />
    </div>
  )
}
