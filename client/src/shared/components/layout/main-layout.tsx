import type { ReactNode } from 'react'
import { AppSidebar } from './app-sidebar'
import { Header } from './header'
import { SidebarProvider } from '@/shared/components/ui/sidebar'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <div className="bg-background flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex flex-1 flex-col">
          <Header />
          <div className="flex-1">
            <div className="animate-in fade-in p-4 lg:p-8">{children}</div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
