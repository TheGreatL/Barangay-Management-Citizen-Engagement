import { Link, useLocation } from '@tanstack/react-router'
import {
  LayoutDashboard,
  AlertCircle,
  Bell,
  Wrench,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Map,
  ClipboardList,
  UserCircle,
  FolderOpen,
  ShieldCheck,
  FileText,
  UserCheck,
  History,
} from 'lucide-react'
import { useAuthStore } from '@/shared/stores/auth.store'
import { cn } from '@/shared/lib/utils'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/shared/components/ui/sidebar'

interface NavItem {
  label?: string
  href?: string
  icon?: React.ReactNode
  badge?: number
  divider?: boolean
}

export function AppSidebar() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const location = useLocation()

  const isActive = (href: string) => location.pathname === href

  // Get navigation items based on role
  const getNavItems = (): NavItem[] => {
    const role = user?.role.toLowerCase()

    if (role === 'admin') {
      return [
        {
          label: 'Dashboard',
          href: '/admin/dashboard',
          icon: <LayoutDashboard className="h-4 w-4" />,
        },
        {
          label: 'User Management',
          href: '/admin/users',
          icon: <Users className="h-4 w-4" />,
        },
        {
          label: 'Resident Records',
          href: '/admin/residents',
          icon: <UserCheck className="h-4 w-4" />,
        },
        {
          label: 'Role & RBAC',
          href: '/admin/roles',
          icon: <ShieldCheck className="h-4 w-4" />,
        },
        { divider: true },
        {
          label: 'Announcements',
          href: '/admin/announcements',
          icon: <Bell className="h-4 w-4" />,
        },
        {
          label: 'Community Reports',
          href: '/admin/complaints',
          icon: <AlertCircle className="h-4 w-4" />,
        },
        {
          label: 'Certificates',
          href: '/admin/certificates',
          icon: <FileText className="h-4 w-4" />,
        },
        {
          label: 'System Analytics',
          href: '/admin/analytics',
          icon: <BarChart3 className="h-4 w-4" />,
        },
        { divider: true },
        {
          label: 'Activity Logs',
          href: '/admin/activity-logs',
          icon: <History className="h-4 w-4" />,
        },
        {
          label: 'System Settings',
          href: '/admin/settings',
          icon: <Settings className="h-4 w-4" />,
        },
      ]
    }

    if (role === 'barangay_official') {
      return [
        {
          label: 'Dashboard',
          href: '/official/dashboard',
          icon: <LayoutDashboard className="h-4 w-4" />,
        },
        {
          label: 'Resident Directory',
          href: '/official/residents',
          icon: <Users className="h-4 w-4" />,
        },
        {
          label: 'Document Requests',
          href: '/official/documents',
          icon: <FolderOpen className="h-4 w-4" />,
        },
        {
          label: 'Community Cases',
          href: '/official/complaints',
          icon: <ClipboardList className="h-4 w-4" />,
        },
        {
          label: 'Official Reports',
          href: '/official/reports',
          icon: <BarChart3 className="h-4 w-4" />,
        },
        { divider: true },
        {
          label: 'Account Settings',
          href: '/settings',
          icon: <Settings className="h-4 w-4" />,
        },
      ]
    }

    // Citizen navigation (default)
    return [
      {
        label: 'My Dashboard',
        href: '/citizen/dashboard',
        icon: <LayoutDashboard className="h-4 w-4" />,
      },
      {
        label: 'My Documents',
        href: '/citizen/documents',
        icon: <FolderOpen className="h-4 w-4" />,
      },
      {
        label: 'My Complaints',
        href: '/citizen/complaints',
        icon: <ClipboardList className="h-4 w-4" />,
      },
      {
        label: 'Announcements',
        href: '/citizen/announcements',
        icon: <Bell className="h-4 w-4" />,
      },
      {
        label: 'Interactive Map',
        href: '/citizen/map',
        icon: <Map className="h-4 w-4" />,
      },
      {
        label: 'Barangay Services',
        href: '/citizen/services',
        icon: <Wrench className="h-4 w-4" />,
      },
      { divider: true },
      {
        label: 'My Profile',
        href: '/citizen/profile',
        icon: <UserCircle className="h-4 w-4" />,
      },
    ]
  }

  const navItems = getNavItems()

  // Get header content based on role
  const getHeaderContent = () => {
    const role = user?.role.toLowerCase()
    if (role === 'admin')
      return { title: 'System Admin', subtitle: 'Barangay Management' }
    if (role === 'barangay_official')
      return { title: 'Official Portal', subtitle: 'Barangay Operations' }
    return { title: 'Citizen Portal', subtitle: 'Barangay Services' }
  }

  const header = getHeaderContent()

  return (
    <Sidebar className="border-sidebar-border bg-sidebar text-sidebar-foreground">
      <SidebarHeader className="border-sidebar-border border-b p-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary text-primary-foreground flex h-11 w-11 items-center justify-center rounded-xl font-black shadow-lg">
            BM
          </div>
          <div className="flex-1">
            <h1 className="mb-1 text-sm leading-none font-black tracking-tight uppercase">
              {header.title}
            </h1>
            <p className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase">
              {header.subtitle}
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-0">
        <ScrollArea className="h-full px-4">
          <SidebarMenu className="space-y-1 py-6">
            {navItems.map((item, idx) => {
              if (item.divider) {
                return (
                  <SidebarSeparator
                    key={`sep-${idx}`}
                    className="bg-sidebar-border my-4"
                  />
                )
              }

              if (!item.href) return null

              const active = isActive(item.href)
              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={active}
                    className={cn(
                      'h-12 w-full justify-start rounded-xl px-4 font-bold transition-all duration-200 active:scale-95',
                      active
                        ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-primary/10 hover:bg-sidebar-primary/90 shadow-lg'
                        : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                    )}
                  >
                    <Link to={item.href}>
                      <span
                        className={cn(
                          'mr-3 transition-transform group-hover/menu-button:scale-110',
                          active
                            ? 'text-sidebar-primary-foreground'
                            : 'text-sidebar-foreground/50 group-hover/menu-button:text-sidebar-accent-foreground',
                        )}
                      >
                        {item.icon}
                      </span>
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.badge && (
                        <span className="bg-error text-error-foreground ml-auto rounded-full px-2 py-0.5 text-[10px] font-black">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="border-sidebar-border space-y-4 border-t p-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={logout}
              className="hover:bg-error/10 hover:text-error text-muted-foreground h-12 w-full justify-start rounded-xl px-4 font-bold transition-all active:scale-95"
            >
              <LogOut className="mr-3 h-4 w-4" />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
