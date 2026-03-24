import { createFileRoute } from '@tanstack/react-router'
import RegisterForm from '../../features/auth/components/register-form'

export const Route = createFileRoute('/(auth)/register')({
  component: RegisterComponent,
})

function RegisterComponent() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <RegisterForm />
    </div>
  )
}
