import LoginForm from '@/features/auth/components/login-form'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { useAuthStore } from '@/shared/stores/auth.store'

const loginSearchSchema = z.object({
  reason: z.string().optional(),
})

export const Route = createFileRoute('/(auth)/login')({
  validateSearch: loginSearchSchema,
  component: LoginComponent,
})

function LoginComponent() {
  const { reason } = Route.useSearch()
  const hasShownToast = useRef(false)
  const navigate = useNavigate()
  const mockLogin = useAuthStore((state) => state.mockLogin)

  useEffect(() => {
    if (reason === 'expired' && !hasShownToast.current) {
      toast.error('Your session has expired. Please log in again.', {
        id: 'session-expired-toast',
      })
      hasShownToast.current = true
    }
  }, [reason])

  const handleMockLogin = (role: 'admin' | 'barangay_official' | 'citizen') => {
    mockLogin(role)
    toast.success(`Logged in as mock ${role.replace('_', ' ')}`)

    if (role === 'admin') {
      navigate({ to: '/admin/dashboard' })
    } else if (role === 'barangay_official') {
      navigate({ to: '/official/dashboard' })
    } else {
      navigate({ to: '/citizen/dashboard' })
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Side: Form */}
      <div className="flex flex-1 flex-col items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground text-background text-sm font-bold">
              BM
            </div>
          </div>
          
          <LoginForm />

          {/* Developer Bypass (Mock Mode) */}
          <div className="rounded-lg border border-dashed border-border/60 p-5">
            <h4 className="mb-3 text-center text-[10px] uppercase tracking-wider font-medium text-muted-foreground/70">
              Developer Bypass
            </h4>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleMockLogin('admin')}
                className="rounded-lg bg-muted/50 px-3 py-2 text-xs font-medium text-foreground transition hover:bg-muted"
              >
                Admin
              </button>
              <button
                onClick={() => handleMockLogin('barangay_official')}
                className="rounded-lg bg-muted/50 px-3 py-2 text-xs font-medium text-foreground transition hover:bg-muted"
              >
                Official
              </button>
              <button
                onClick={() => handleMockLogin('citizen')}
                className="rounded-lg bg-muted/50 px-3 py-2 text-xs font-medium text-foreground transition hover:bg-muted"
              >
                Citizen
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Premium Minimal Panel */}
      <div className="relative hidden flex-1 overflow-hidden bg-foreground lg:flex">
        <div className="relative z-10 flex flex-col items-start justify-center p-16 text-background">
          <div className="w-full max-w-lg space-y-8">
            <div className="animate-in fade-in slide-in-from-top-4 inline-flex items-center gap-2 rounded-full border border-background/10 bg-background/5 px-3 py-1 text-xs font-medium backdrop-blur-md duration-1000">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-background/50 opacity-75"></span>
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-background"></span>
              </span>
              Barangay Management System
            </div>

            <h2 className="animate-in fade-in slide-in-from-left-4 text-4xl font-semibold tracking-tight leading-tight delay-200 duration-700">
              Streamline your<br />community services
            </h2>

            <p className="animate-in fade-in slide-in-from-left-4 text-base text-background/70 delay-300 duration-700 max-w-md">
              A modern platform for barangay management, citizen engagement, and efficient public service delivery.
            </p>

            <div className="animate-in fade-in slide-in-from-bottom-4 grid grid-cols-3 gap-4 pt-8 delay-500 duration-1000">
              <div className="space-y-1">
                <div className="text-2xl font-semibold">24/7</div>
                <div className="text-xs text-background/50">
                  Service Access
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-semibold">100%</div>
                <div className="text-xs text-background/50">Digital</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-semibold">Secure</div>
                <div className="text-xs text-background/50">Data Protection</div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-background/5" />
      </div>
    </div>
  )
}
