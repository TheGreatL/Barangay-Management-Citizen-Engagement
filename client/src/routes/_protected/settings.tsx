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
                className="border-border/60 bg-card rounded-xl border"
              >
                <div className="border-border/50 border-b px-5 py-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-foreground/5 text-foreground rounded-lg p-2.5">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-foreground text-sm font-semibold">
                        {section.title}
                      </h3>
                      <p className="text-muted-foreground mt-0.5 text-xs">
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
                        className="border-border/40 flex items-center justify-between border-b pb-3 last:border-b-0 last:pb-0"
                      >
                        <span className="text-muted-foreground text-sm">
                          {item.label}
                        </span>
                        <span className="text-foreground text-sm font-medium">
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
