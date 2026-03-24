import { createFileRoute } from '@tanstack/react-router'
import { Settings, User, Lock, Bell } from 'lucide-react'
import { PageHeader } from '@/shared/components/layout/page-header'
import { useAuthStore } from '@/shared/stores/auth.store'
import { Button } from '@/shared/components/ui/button'

export const Route = createFileRoute('/_protected/settings')({
  component: SettingsComponent,
})

function SettingsComponent() {
  const user = useAuthStore((state) => state.user)

  const settingSections = [
    {
      icon: User,
      title: 'Profile Settings',
      description: 'Manage your personal information and profile details',
      items: [
        { label: 'Full Name', value: `${user?.firstName} ${user?.lastName}` },
        { label: 'Email Address', value: user?.email },
        { label: 'Account Type', value: user?.role.replace('_', ' ') },
      ],
      action: 'Edit Profile',
    },
    {
      icon: Lock,
      title: 'Security Settings',
      description: 'Manage your password and security preferences',
      items: [
        { label: 'Password', value: '••••••••' },
        { label: 'Two-Factor Authentication', value: 'Disabled' },
      ],
      action: 'Change Password',
    },
    {
      icon: Bell,
      title: 'Notification Preferences',
      description: 'Control how you receive notifications',
      items: [
        { label: 'Email Notifications', value: 'Enabled' },
        { label: 'SMS Notifications', value: 'Disabled' },
      ],
      action: 'Manage Preferences',
    },
  ]

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Settings"
        description="Manage your account and preferences"
        icon={<Settings className="h-6 w-6" />}
      />

      <div className="flex-1 px-6 py-8 sm:px-8">
        <div className="mx-auto w-full max-w-4xl space-y-4">
          {settingSections.map((section, idx) => {
            const Icon = section.icon
            return (
              <div
                key={idx}
                className="rounded-xl border border-border/60 bg-card"
              >
                <div className="border-b border-border/50 px-5 py-4">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-foreground/5 p-2.5 text-foreground">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-foreground">
                        {section.title}
                      </h3>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {section.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-5 py-4">
                  <div className="space-y-3">
                    {section.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="flex items-center justify-between border-b border-border/40 pb-3 last:border-b-0 last:pb-0"
                      >
                        <span className="text-sm text-muted-foreground">
                          {item.label}
                        </span>
                        <span className="text-sm font-medium text-foreground">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex justify-end">
                    <Button variant="outline" size="sm">
                      {section.action}
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
