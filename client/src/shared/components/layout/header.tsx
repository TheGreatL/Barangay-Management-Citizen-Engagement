import { useAuthStore } from '@/shared/stores/auth.store'
import {
  Bell,
  Search,
  Plus,
  Gift,
  ChevronDown,
} from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar'
import { SidebarTrigger } from '@/shared/components/ui/sidebar'

export function Header() {
  const { user, logout } = useAuthStore()

  const getInitials = (firstName?: string, lastName?: string) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase()
  }

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-border bg-background px-6 shadow-sm transition-all duration-200">
      {/* Left Section: Sidebar Trigger & Search */}
      <div className="flex flex-1 items-center gap-4">
        <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground" />
        <div className="relative w-full max-w-md hidden md:block">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            type="text"
            className="block w-full rounded-lg border border-border bg-muted/50 py-2 pl-10 pr-3 text-sm placeholder-muted-foreground outline-hidden transition-all focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/10"
            placeholder="Search..."
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden items-center pr-3 lg:flex">
            <kbd className="rounded-md border border-border bg-background px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
              ⌘ + F
            </kbd>
          </div>
        </div>
      </div>

      {/* Right Section: Actions & Profile */}
      <div className="ml-4 flex items-center gap-3">
        {/* Quick Actions */}
        <div className="hidden items-center gap-2 border-r border-border pr-4 lg:flex">
          <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-primary">
            <Gift className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="relative h-9 w-9 text-muted-foreground hover:text-primary">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-error opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-error"></span>
            </span>
          </Button>
          <Button size="sm" className="ml-2 h-9 items-center gap-2 px-4 shadow-sm">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Quick Action</span>
          </Button>
        </div>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 rounded-lg p-1 text-left outline-hidden transition-colors hover:bg-muted/50">
              <Avatar className="h-9 w-9 border border-border">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                  {getInitials(user?.firstName, user?.lastName)}
                </AvatarFallback>
              </Avatar>
              <div className="hidden flex-col pr-1 lg:flex">
                <span className="text-sm font-semibold text-foreground line-clamp-1">
                  {user?.firstName} {user?.lastName}
                </span>
                <span className="text-xs font-medium text-muted-foreground">
                  {user?.role.replace('_', ' ')}
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile Settings</DropdownMenuItem>
            <DropdownMenuItem>My Certificates</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-error"
              onClick={() => logout()}
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
