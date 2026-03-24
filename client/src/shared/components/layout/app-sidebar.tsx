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
  BadgeCheck,
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
      className="border-sidebar-border/50 bg-sidebar"
    >
      <SidebarHeader className="border-sidebar-border/50 border-b px-4 py-5">
        <div className="flex items-center gap-3">
          <div className="bg-foreground text-background flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-xs font-bold tracking-tight">
            BM
          </div>
          <div className="flex-1 overflow-hidden group-data-[collapsible=icon]:hidden">
            <h1 className="truncate text-sm font-semibold tracking-tight leading-none">
              {header.title}
            </h1>
            <p className="text-muted-foreground truncate text-[11px] mt-1">
              {header.subtitle}
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-0">
        <ScrollArea className="h-full scrollbar-minimal">
          <SidebarMenu className="px-3 py-4">
            {navGroups.map((group, groupIdx) => (
              <SidebarGroup key={group.label}>
                <SidebarGroupLabel className="px-2 text-[10px] uppercase tracking-wider font-medium text-muted-foreground/70 mb-2 group-data-[collapsible=icon]:hidden">
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
                            className={cn(
                              "w-full justify-start rounded-lg px-2.5 py-2 h-9 transition-all duration-150",
                              active 
                                ? "bg-foreground text-background font-medium" 
                                : "hover:bg-muted/60 text-muted-foreground hover:text-foreground"
                            )}
                          >
                            <Link to={item.href}>
                              <span className="mr-2.5">
                                {item.icon}
                              </span>
                              <span className="flex-1 truncate text-[13px] group-data-[collapsible=icon]:hidden">
                                {item.label}
                              </span>
                              {item.badge && (
                                <span className={cn(
                                  "ml-auto flex h-4 min-w-4 items-center justify-center rounded px-1 text-[10px] font-medium group-data-[collapsible=icon]:hidden",
                                  active ? "bg-background/20 text-background" : "bg-muted text-muted-foreground"
                                )}>
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
                  <SidebarSeparator className="bg-border/40 my-4 group-data-[collapsible=icon]:hidden" />
                )}
              </SidebarGroup>
            ))}
          </SidebarMenu>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="border-sidebar-border/50 border-t px-3 py-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-muted rounded-lg h-auto py-2"
                >
                  <Avatar className="h-7 w-7 rounded-md ring-1 ring-border/50">
                    <AvatarImage src={user?.avatar || ''} alt={user?.email} />
                    <AvatarFallback className="rounded-md bg-foreground text-background text-[10px] font-semibold">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left leading-tight group-data-[collapsible=icon]:hidden">
                    <span className="truncate text-xs font-medium">
                      {user?.email || 'User'}
                    </span>
                    <span className="text-muted-foreground truncate text-[10px]">
                      {user?.email || 'm@example.com'}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-3 text-muted-foreground group-data-[collapsible=icon]:hidden" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-52 rounded-lg"
                side="top"
                align="end"
                sideOffset={8}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-2 py-2 text-left">
                    <Avatar className="h-8 w-8 rounded-md">
                      <AvatarImage src={user?.avatar || ''} alt={user?.email} />
                      <AvatarFallback className="rounded-md bg-foreground text-background text-xs">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left leading-tight">
                      <span className="truncate text-sm font-medium">
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
                  <DropdownMenuItem className="text-sm">
                    <BadgeCheck className="mr-2 size-4" />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-sm">
                    <Bell className="mr-2 size-4" />
                    Notifications
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-sm">
                    <Settings className="mr-2 size-4" />
                    Settings
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className="text-sm text-destructive focus:bg-destructive/10 focus:text-destructive"
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
