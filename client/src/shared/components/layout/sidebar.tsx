import { Link, useLocation } from '@tanstack/react-router'
import {
  Home,
  AlertCircle,
  FileText,
  Bell,
  Wrench,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  MapPin,
} from 'lucide-react'
import { useAuthStore } from '@/shared/stores/auth.store'
import { useState } from 'react'
import { Button } from '@/shared/components/ui/button'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  badge?: number
  divider?: boolean
}

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const location = useLocation()

  const isActive = (href: string) => location.pathname === href

  // Get navigation items based on role
  const getNavItems = (): NavItem[] => {
    if (user?.role === 'ADMIN') {
      return [
        { label: 'Dashboard', href: '/admin/dashboard', icon: <Home className="h-5 w-5" /> },
        { label: 'Users', href: '/admin/users', icon: <Users className="h-5 w-5" /> },
        { label: 'Analytics', href: '/admin/analytics', icon: <BarChart3 className="h-5 w-5" /> },
        { label: 'Announcements', href: '/admin/announcements', icon: <Bell className="h-5 w-5" /> },
        { divider: true },
        { label: 'Settings', href: '/admin/settings', icon: <Settings className="h-5 w-5" /> },
      ]
    }

    if (user?.role === 'OFFICIAL') {
      return [
        { label: 'Dashboard', href: '/official/dashboard', icon: <Home className="h-5 w-5" /> },
        { label: 'Complaints', href: '/official/complaints', icon: <AlertCircle className="h-5 w-5" /> },
        { label: 'Residents', href: '/official/residents', icon: <Users className="h-5 w-5" /> },
        { label: 'Documents', href: '/official/documents', icon: <FileText className="h-5 w-5" /> },
        { label: 'Reports', href: '/official/reports', icon: <BarChart3 className="h-5 w-5" /> },
        { divider: true },
        { label: 'Settings', href: '/settings', icon: <Settings className="h-5 w-5" /> },
      ]
    }

    // Citizen navigation (default)
    return [
      { label: 'Dashboard', href: '/dashboard', icon: <Home className="h-5 w-5" /> },
      { label: 'Complaints', href: '/dashboard/complaints', icon: <AlertCircle className="h-5 w-5" /> },
      { label: 'Documents', href: '/dashboard/documents', icon: <FileText className="h-5 w-5" /> },
      { label: 'Announcements', href: '/dashboard/announcements', icon: <Bell className="h-5 w-5" /> },
      { label: 'Services', href: '/dashboard/services', icon: <Wrench className="h-5 w-5" /> },
      { divider: true },
      { label: 'Settings', href: '/settings', icon: <Settings className="h-5 w-5" /> },
    ]
  }

  const navItems = getNavItems()

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="fixed left-4 top-4 z-40 lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white shadow-md"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-30 flex h-screen w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo Section */}
        <div className="border-b border-slate-200 px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
              BM
            </div>
            <div className="flex-1">
              <h1 className="text-sm font-bold text-slate-900">Barangay Mgmt</h1>
              <p className="text-xs text-slate-500">Citizen Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <div className="space-y-2">
            {navItems.map((item, idx) => {
              if (item.divider) {
                return <div key={idx} className="my-4 border-t border-slate-200" />
              }

              const active = isActive(item.href)
              return (
                <Link key={item.href} to={item.href}>
                  <div
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      active
                        ? 'bg-blue-50 text-blue-600 shadow-sm'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon}
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </nav>

        {/* User Profile Section */}
        <div className="border-t border-slate-200 p-4">
          <div className="mb-4 rounded-lg bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Logged in as</p>
            <p className="truncate text-sm font-semibold text-slate-900">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="truncate text-xs text-slate-500">{user?.email}</p>
            <p className="mt-2 inline-block rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 capitalize">
              {user?.role.replace('_', ' ')}
            </p>
          </div>

          <Button
            onClick={() => {
              logout()
              setIsOpen(false)
            }}
            variant="outline"
            className="w-full"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  )
}
