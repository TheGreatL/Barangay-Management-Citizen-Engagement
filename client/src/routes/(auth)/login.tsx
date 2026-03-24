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
    <div className="bg-background flex min-h-screen">
      {/* Left Side: Form */}
      <div className="flex flex-1 flex-col items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="bg-foreground text-background flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold">
              BM
            </div>
          </div>

          <LoginForm />

          {/* Developer Bypass (Mock Mode) */}
          <div className="border-border/60 rounded-lg border border-dashed p-5">
            <h4 className="text-muted-foreground/70 mb-3 text-center text-[10px] font-medium tracking-wider uppercase">
              Developer Bypass
            </h4>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleMockLogin('admin')}
                className="bg-muted/50 text-foreground hover:bg-muted rounded-lg px-3 py-2 text-xs font-medium transition"
              >
                Admin
              </button>
              <button
                onClick={() => handleMockLogin('barangay_official')}
                className="bg-muted/50 text-foreground hover:bg-muted rounded-lg px-3 py-2 text-xs font-medium transition"
              >
                Official
              </button>
              <button
                onClick={() => handleMockLogin('citizen')}
                className="bg-muted/50 text-foreground hover:bg-muted rounded-lg px-3 py-2 text-xs font-medium transition"
              >
                Citizen
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Premium Minimal Panel */}
      <div className="bg-foreground relative hidden flex-1 overflow-hidden lg:flex">
        <div className="text-background relative z-10 flex flex-col items-start justify-center p-16">
          <div className="w-full max-w-lg space-y-8">
            <div className="animate-in fade-in slide-in-from-top-4 border-background/10 bg-background/5 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-md duration-1000">
              <span className="relative flex h-1.5 w-1.5">
                <span className="bg-background/50 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
                <span className="bg-background relative inline-flex h-1.5 w-1.5 rounded-full"></span>
              </span>
              Barangay Management System
            </div>

            <h2 className="animate-in fade-in slide-in-from-left-4 text-4xl leading-tight font-semibold tracking-tight delay-200 duration-700">
              Streamline your
              <br />
              community services
            </h2>

            <p className="animate-in fade-in slide-in-from-left-4 text-background/70 max-w-md text-base delay-300 duration-700">
              A modern platform for barangay management, citizen engagement, and
              efficient public service delivery.
            </p>

            <div className="animate-in fade-in slide-in-from-bottom-4 grid grid-cols-3 gap-4 pt-8 delay-500 duration-1000">
              <div className="space-y-1">
                <div className="text-2xl font-semibold">24/7</div>
                <div className="text-background/50 text-xs">Service Access</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-semibold">100%</div>
                <div className="text-background/50 text-xs">Digital</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-semibold">Secure</div>
                <div className="text-background/50 text-xs">
                  Data Protection
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle gradient overlay */}
        <div className="to-background/5 absolute inset-0 bg-gradient-to-br from-transparent via-transparent" />
      </div>
    </div>
  )
}
