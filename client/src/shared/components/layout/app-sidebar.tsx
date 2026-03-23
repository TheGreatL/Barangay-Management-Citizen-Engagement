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
  ChevronsUpDown,
  Sparkles,
  BadgeCheck,
  CreditCard,
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
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/shared/components/ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  badge?: number
}

interface NavGroup {
  label: string
  items: NavItem[]
}

export function AppSidebar() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const location = useLocation()

  const isActive = (href: string) => location.pathname === href

  // Get navigation items based on role
  const getNavGroups = (): NavGroup[] => {
    const role = user?.role.toLowerCase()

    if (role === 'admin') {
      return [
        {
          label: 'Platform',
          items: [
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
          ],
        },
        {
          label: 'System Control',
          items: [
            {
              label: 'Role & RBAC',
              href: '/admin/roles',
              icon: <ShieldCheck className="h-4 w-4" />,
            },
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
          ],
        },
        {
          label: 'Community Services',
          items: [
            {
              label: 'Announcements',
              href: '/admin/announcements',
              icon: <Bell className="h-4 w-4" />,
            },
            {
              label: 'Complaints',
              href: '/admin/complaints',
              icon: <AlertCircle className="h-4 w-4" />,
            },
            {
              label: 'Certificates',
              href: '/admin/certificates',
              icon: <FileText className="h-4 w-4" />,
            },
            {
              label: 'Analytics',
              href: '/admin/analytics',
              icon: <BarChart3 className="h-4 w-4" />,
            },
          ],
        },
      ]
    }

    if (role === 'barangay_official') {
      return [
        {
          label: 'Core Operations',
          items: [
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
          ],
        },
        {
          label: 'Management',
          items: [
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
          ],
        },
        {
          label: 'Analytics & Account',
          items: [
            {
              label: 'Official Reports',
              href: '/official/reports',
              icon: <BarChart3 className="h-4 w-4" />,
            },
            {
              label: 'Settings',
              href: '/settings',
              icon: <Settings className="h-4 w-4" />,
            },
          ],
        },
      ]
    }

    // Citizen navigation (default)
    return [
      {
        label: 'My Workspace',
        items: [
          {
            label: 'Dashboard',
            href: '/citizen/dashboard',
            icon: <LayoutDashboard className="h-4 w-4" />,
          },
          {
            label: 'Announcements',
            href: '/citizen/announcements',
            icon: <Bell className="h-4 w-4" />,
          },
        ],
      },
      {
        label: 'Personal Services',
        items: [
          {
            label: 'Documents',
            href: '/citizen/documents',
            icon: <FolderOpen className="h-4 w-4" />,
          },
          {
            label: 'Complaints',
            href: '/citizen/complaints',
            icon: <ClipboardList className="h-4 w-4" />,
          },
        ],
      },
      {
        label: 'Community',
        items: [
          {
            label: 'Interactive Map',
            href: '/citizen/map',
            icon: <Map className="h-4 w-4" />,
          },
          {
            label: 'Services',
            href: '/citizen/services',
            icon: <Wrench className="h-4 w-4" />,
          },
          {
            label: 'My Profile',
            href: '/citizen/profile',
            icon: <UserCircle className="h-4 w-4" />,
          },
        ],
      },
    ]
  }

  const navGroups = getNavGroups()

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
  const userInitials = user?.email.slice(0, 2).toUpperCase() || 'BM'

  return (
    <Sidebar
      collapsible="icon"
      className="border-sidebar-border bg-sidebar text-sidebar-foreground"
    >
      <SidebarHeader className="border-sidebar-border border-b p-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary text-primary-foreground flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-bold shadow-sm">
            BM
          </div>
          <div className="flex-1 overflow-hidden group-data-[collapsible=icon]:hidden">
            <h1 className="mb-0.5 truncate text-lg leading-tight font-bold">
              {header.title}
            </h1>
            <p className="text-muted-foreground truncate text-xs font-medium">
              {header.subtitle}
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-0">
        <ScrollArea className="h-full">
          <SidebarMenu className="px-2 py-4">
            {navGroups.map((group, groupIdx) => (
              <SidebarGroup key={group.label}>
                <SidebarGroupLabel className="px-3 text-sm font-bold group-data-[collapsible=icon]:hidden">
                  {group.label}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-0.5">
                    {group.items.map((item) => {
                      const active = isActive(item.href)
                      return (
                        <SidebarMenuItem key={item.href}>
                          <SidebarMenuButton
                            asChild
                            isActive={active}
                            tooltip={item.label}
                            className="w-full justify-start rounded-md px-3 transition-colors duration-200"
                          >
                            <Link to={item.href}>
                              <span
                                className={cn(
                                  'mr-2.5 transition-colors',
                                  active
                                    ? 'text-sidebar-accent-foreground'
                                    : 'text-sidebar-foreground/60 group-hover/menu-button:text-sidebar-accent-foreground',
                                )}
                              >
                                {item.icon}
                              </span>
                              <span className="flex-1 truncate text-sm font-medium group-data-[collapsible=icon]:hidden">
                                {item.label}
                              </span>
                              {item.badge && (
                                <span className="bg-primary/10 text-primary ml-auto flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-bold group-data-[collapsible=icon]:hidden">
                                  {item.badge}
                                </span>
                              )}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      )
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
                {groupIdx < navGroups.length - 1 && (
                  <SidebarSeparator className="bg-sidebar-border/50 my-4 group-data-[collapsible=icon]:hidden" />
                )}
              </SidebarGroup>
            ))}
          </SidebarMenu>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="border-sidebar-border border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user?.avatar || ''} alt={user?.email} />
                    <AvatarFallback className="rounded-lg">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                    <span className="truncate font-semibold">
                      {user?.email || 'User'}
                    </span>
                    <span className="text-muted-foreground truncate text-xs">
                      {user?.email || 'm@example.com'}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side="top"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user?.avatar || ''} alt={user?.email} />
                      <AvatarFallback className="rounded-lg">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {user?.email || 'User'}
                      </span>
                      <span className="text-muted-foreground truncate text-xs">
                        {user?.email || 'm@example.com'}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Sparkles className="mr-2 size-4" />
                    Upgrade to Pro
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <BadgeCheck className="mr-2 size-4" />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="mr-2 size-4" />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell className="mr-2 size-4" />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                >
                  <LogOut className="mr-2 size-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
