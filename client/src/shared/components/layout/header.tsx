import { useAuthStore } from '@/shared/stores/auth.store'
import { Bell, Search, Plus, ChevronDown, Command } from 'lucide-react'
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
    <header className="bg-background/80 backdrop-blur-xl sticky top-0 z-20 flex h-14 w-full items-center justify-between border-b border-border/50 px-4 lg:px-6">
      {/* Left Section: Sidebar Trigger & Search */}
      <div className="flex flex-1 items-center gap-3">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground h-8 w-8 -ml-1" />
        
        {/* Premium Search Bar */}
        <div className="relative hidden w-full max-w-sm md:block">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="text-muted-foreground/60 h-4 w-4" />
          </div>
          <input
            type="text"
            className="bg-muted/40 placeholder-muted-foreground/60 focus:bg-background focus:ring-1 focus:ring-border block w-full rounded-lg border-0 py-2 pr-20 pl-9 text-sm outline-none transition-all"
            placeholder="Search anything..."
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden items-center pr-2 lg:flex">
            <div className="flex items-center gap-0.5 rounded-md bg-background/80 px-1.5 py-1 text-[10px] font-medium text-muted-foreground/70">
              <Command className="h-2.5 w-2.5" />
              <span>K</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section: Actions & Profile */}
      <div className="ml-4 flex items-center gap-2">
        {/* Notification */}
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground relative h-8 w-8 rounded-lg"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 flex h-1.5 w-1.5">
            <span className="bg-foreground absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
            <span className="bg-foreground relative inline-flex h-1.5 w-1.5 rounded-full"></span>
          </span>
        </Button>

        {/* Quick Action - Hidden on mobile */}
        <Button 
          size="sm" 
          className="hidden lg:flex h-8 px-3 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 rounded-lg gap-1.5"
        >
          <Plus className="h-3.5 w-3.5" />
          New Request
        </Button>

        {/* Divider */}
        <div className="hidden lg:block h-5 w-px bg-border/60 mx-1" />

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="hover:bg-muted/50 flex items-center gap-2.5 rounded-lg py-1 px-1.5 text-left outline-none transition-colors">
              <Avatar className="h-7 w-7 ring-1 ring-border/50">
                <AvatarImage src="" />
                <AvatarFallback className="bg-foreground text-background text-[10px] font-semibold">
                  {getInitials(user?.firstName, user?.lastName)}
                </AvatarFallback>
              </Avatar>
              <div className="hidden flex-col lg:flex">
                <span className="text-foreground text-xs font-medium leading-none">
                  {user?.firstName} {user?.lastName}
                </span>
                <span className="text-muted-foreground text-[10px] mt-0.5 capitalize">
                  {user?.role.replace('_', ' ')}
                </span>
              </div>
              <ChevronDown className="text-muted-foreground h-3 w-3 hidden lg:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 rounded-lg">
            <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-sm">Profile Settings</DropdownMenuItem>
            <DropdownMenuItem className="text-sm">My Certificates</DropdownMenuItem>
            <DropdownMenuItem className="text-sm">Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-sm text-destructive" onClick={() => logout()}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
