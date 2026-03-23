import { useAuthStore } from '@/shared/stores/auth.store'
import { Bell, Search, Plus, Gift, ChevronDown } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
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
import { SidebarTrigger } from '@/shared/components/ui/sidebar'

export function Header() {
  const { user, logout } = useAuthStore()

  const getInitials = (firstName?: string, lastName?: string) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase()
  }

  return (
    <header className="border-border bg-background sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b px-6 shadow-sm transition-all duration-200">
      {/* Left Section: Sidebar Trigger & Search */}
      <div className="flex flex-1 items-center gap-4">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground -ml-1" />
        <div className="relative hidden w-full max-w-md md:block">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="text-muted-foreground h-4 w-4" />
          </div>
          <input
            type="text"
            className="border-border bg-muted/50 placeholder-muted-foreground focus:border-primary focus:bg-background focus:ring-primary/10 block w-full rounded-lg border py-2 pr-3 pl-10 text-sm outline-hidden transition-all focus:ring-2"
            placeholder="Search..."
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden items-center pr-3 lg:flex">
            <kbd className="border-border bg-background text-muted-foreground rounded-md border px-1.5 py-0.5 text-xs font-medium">
              ⌘ + F
            </kbd>
          </div>
        </div>
      </div>

      {/* Right Section: Actions & Profile */}
      <div className="ml-4 flex items-center gap-3">
        {/* Quick Actions */}
        <div className="border-border hidden items-center gap-2 border-r pr-4 lg:flex">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-primary h-9 w-9"
          >
            <Gift className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-primary relative h-9 w-9"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 flex h-2 w-2">
              <span className="bg-error absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
              <span className="bg-error relative inline-flex h-2 w-2 rounded-full"></span>
            </span>
          </Button>
          <Button size="sm" className="ml-2 items-center gap-2 shadow-sm">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Quick Action</span>
          </Button>
        </div>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="hover:bg-muted/50 flex items-center gap-3 rounded-lg p-1 text-left outline-hidden transition-colors">
              <Avatar className="border-border h-9 w-9 border">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                  {getInitials(user?.firstName, user?.lastName)}
                </AvatarFallback>
              </Avatar>
              <div className="hidden flex-col pr-1 lg:flex">
                <span className="text-foreground line-clamp-1 text-sm font-semibold">
                  {user?.firstName} {user?.lastName}
                </span>
                <span className="text-muted-foreground text-xs font-medium">
                  {user?.role.replace('_', ' ')}
                </span>
              </div>
              <ChevronDown className="text-muted-foreground h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile Settings</DropdownMenuItem>
            <DropdownMenuItem>My Certificates</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-error" onClick={() => logout()}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
