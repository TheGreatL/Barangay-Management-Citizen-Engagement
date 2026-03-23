import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Settings, Shield, Database, Bell } from 'lucide-react'

export const Route = createFileRoute('/_protected/admin/settings')({
  component: AdminSettingsComponent,
})

function AdminSettingsComponent() {
  const settingsSections = [
    {
      title: 'General Settings',
      icon: Settings,
      settings: [
        { label: 'System Name', value: 'Barangay Management System' },
        { label: 'System Email', value: 'admin@barangay.local' },
        { label: 'Support Phone', value: '+63 2 1234 5678' },
      ],
    },
    {
      title: 'Security',
      icon: Shield,
      settings: [
        { label: 'Password Min Length', value: '8' },
        { label: 'Session Timeout (minutes)', value: '60' },
        { label: 'Max Login Attempts', value: '5' },
      ],
    },
    {
      title: 'Database',
      icon: Database,
      settings: [
        { label: 'Database Host', value: 'localhost' },
        { label: 'Backup Frequency', value: 'Daily' },
        { label: 'Retention Days', value: '30' },
      ],
    },
    {
      title: 'Notifications',
      icon: Bell,
      settings: [
        { label: 'Email Notifications', value: 'Enabled' },
        { label: 'SMS Alerts', value: 'Disabled' },
        { label: 'Notification Language', value: 'English' },
      ],
    },
  ]

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">System Settings</h1>
        <p className="mt-2 text-slate-600">
          Configure system parameters and preferences
        </p>
      </div>

      <div className="space-y-6">
        {settingsSections.map((section, idx) => {
          const Icon = section.icon
          return (
            <div
              key={idx}
              className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-6 flex items-center gap-2">
                <Icon className="h-5 w-5 text-slate-600" />
                <h2 className="text-lg font-semibold text-slate-900">
                  {section.title}
                </h2>
              </div>

              <div className="space-y-4">
                {section.settings.map((setting, settingIdx) => (
                  <div
                    key={settingIdx}
                    className="grid grid-cols-1 gap-4 md:grid-cols-3"
                  >
                    <label className="text-sm font-medium text-slate-700">
                      {setting.label}
                    </label>
                    <Input
                      defaultValue={setting.value}
                      className="md:col-span-2"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
