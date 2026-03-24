import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Loader2, Mail, Lock, ArrowRight, AlertCircleIcon } from 'lucide-react'
import { toast } from 'sonner'
import { loginSchema } from '../auth.schema'
import type { TLogin } from '../auth.schema'
import { authService } from '../auth.service'
import { useAuthStore } from '../../../shared/stores/auth.store'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/shared/components/ui/alert'
import { Input } from '@/shared/components/ui/input'
import { PasswordInput } from '@/shared/components/ui/password-input'

export default function LoginForm() {
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>({
    resolver: zodResolver(loginSchema),
  })

  const mutation = useMutation({
    mutationFn: (data: TLogin) => authService.login(data),
    onSuccess: async (response) => {
      // 1. Set basic auth data
      setAuth(response.data.user, response.data.accessToken)

      // 2. Fetch full profile via /me
      await useAuthStore.getState().getMe()

      toast.success(
        `Welcome back, ${useAuthStore.getState().user?.firstName || 'User'}!`,
        {
          description: 'Successfully logged in. Redirecting to dashboard...',
        },
      )

      setTimeout(() => {
        navigate({ to: '/dashboard' })
      }, 1000)
    },
    onError: (
      error: Error & { response?: { data?: { message?: string } } },
    ) => {
      console.error('Login error full:', error)
      const message =
        error.response?.data?.message ||
        error.message ||
        'Login failed. Please check your credentials.'
      toast.error(message)
    },
  })

  const onSubmit = (data: TLogin) => {
    mutation.mutate(data)
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 w-full max-w-sm space-y-8 duration-700">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to access your account
        </p>
      </div>

      {mutation.isError && (
        <Alert variant="destructive" className="rounded-lg">
          <AlertCircleIcon className="h-4 w-4" />
          <AlertTitle className="text-sm">Failed to login</AlertTitle>
          <AlertDescription className="text-xs">
            {(
              mutation.error as Error & {
                response?: { data?: { message?: string } }
              }
            ).response?.data?.message || 'Invalid credentials'}
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-xs font-medium text-foreground"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="text-muted-foreground/50 absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2" />
              <Input
                {...register('email')}
                id="email"
                type="email"
                placeholder="name@example.com"
                className="pl-9 h-10 rounded-lg border-border/60 bg-muted/30 focus:bg-background text-sm"
              />
            </div>
            {errors.email && (
              <p className="text-destructive animate-in fade-in zoom-in-95 text-xs">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-xs font-medium text-foreground"
              >
                Password
              </label>
              <a
                href="#"
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="text-muted-foreground/50 absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2" />
              <PasswordInput
                {...register('password')}
                id="password"
                placeholder="Enter your password"
                className="pl-9 h-10 rounded-lg border-border/60 bg-muted/30 focus:bg-background text-sm"
              />
            </div>
            {errors.password && (
              <p className="text-destructive animate-in fade-in zoom-in-95 text-xs">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <button
          disabled={mutation.isPending}
          type="submit"
          className="relative flex w-full items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-all hover:bg-foreground/90 active:scale-[0.98] disabled:opacity-70"
        >
          {mutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Sign In
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      <div className="text-center">
        <p className="text-muted-foreground text-sm">
          Don&apos;t have an account?{' '}
          <button
            onClick={() => navigate({ to: '/register' })}
            className="font-medium text-foreground transition-colors hover:underline"
          >
            Create an account
          </button>
        </p>
      </div>
    </div>
  )
}
