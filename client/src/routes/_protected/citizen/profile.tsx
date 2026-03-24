import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Edit,
  Camera,
  Activity,
  FileText,
} from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { getCitizenProfile } from '@/mock/profile-service'
import { cn } from '@/shared/lib/utils'

export const Route = createFileRoute('/_protected/citizen/profile')({
  component: CitizenProfileComponent,
})

type ProfileData = {
  firstName: string
  lastName: string
  email: string
  address: string
  createdAt: string
  phone: string
  birthDate: string
  gender: string
}

function CitizenProfileComponent() {
  const { data: response, isLoading } = useQuery<{ data: ProfileData }>({
    queryKey: ['profile'],
    queryFn: getCitizenProfile,
  })

  const profile = response?.data

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-20">
        <div className="border-primary h-20 w-20 animate-spin rounded-full border-b-2" />
      </div>
    )
  }

  if (!profile) {
    return <div>Profile not found</div>
  }

  return (
    <div className="flex flex-col">
      <div className="relative overflow-hidden border-b border-border/60 bg-card py-10">
        <div className="from-primary/5 absolute top-0 right-0 h-full w-1/3 bg-linear-to-l to-transparent" />
        <div className="mx-auto flex flex-col items-center gap-8 md:flex-row">
          <div className="group relative">
            <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-2xl border-2 border-border/60 bg-muted transition-transform duration-300 group-hover:scale-105">
              <User className="h-16 w-16 text-muted-foreground" />
            </div>
            <button
              className="bg-foreground absolute right-1 bottom-1 rounded-xl p-2.5 text-background shadow-lg transition-all hover:scale-105 active:scale-95"
              title="Upload Profile Picture"
            >
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 space-y-3 text-center md:text-left">
            <h1 className="text-3xl font-semibold text-foreground">
              {profile.firstName} {profile.lastName}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
              <BadgeSmall
                icon={Shield}
                label="Verified Citizen"
                color="green"
              />
              <BadgeSmall icon={MapPin} label="District 4" color="blue" />
              <BadgeSmall
                icon={Calendar}
                label={`Member since ${new Date(profile.createdAt).getFullYear()}`}
                color="slate"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button className="h-10 rounded-lg px-5 text-sm font-medium transition-all active:scale-[0.98]">
              <Edit className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="space-y-6 rounded-xl border border-border/60 bg-card p-6">
              <h3 className="flex items-center gap-3 text-sm font-semibold text-foreground">
                <div className="bg-foreground/5 text-foreground flex h-8 w-8 items-center justify-center rounded-lg">
                  <User className="h-4 w-4" />
                </div>
                Personal Information
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <InfoItem
                  icon={Mail}
                  label="Email Address"
                  value={profile.email}
                />
                <InfoItem
                  icon={Phone}
                  label="Phone Number"
                  value={profile.phone}
                />
                <InfoItem
                  icon={Calendar}
                  label="Birth Date"
                  value={new Date(profile.birthDate).toLocaleDateString()}
                />
                <InfoItem icon={User} label="Gender" value={profile.gender} />
                <div className="md:col-span-2">
                  <InfoItem
                    icon={MapPin}
                    label="Permanent Address"
                    value={profile.address}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6 rounded-xl border border-border/60 bg-card p-6">
              <h3 className="flex items-center gap-3 text-sm font-semibold text-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400">
                  <Activity className="h-4 w-4" />
                </div>
                Resident Activity
              </h3>
              <div className="space-y-3">
                <ActivityRow
                  icon={FileText}
                  label="Document Request"
                  date="2 days ago"
                  title="Barangay Clearance"
                  status="Approved"
                />
                <ActivityRow
                  icon={Shield}
                  label="Verification"
                  date="1 week ago"
                  title="Identity Verified"
                  status="Success"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-foreground space-y-5 rounded-xl p-6 text-background">
              <h3 className="flex items-center gap-3 text-sm font-semibold">
                Digital ID Card
              </h3>
              <div className="relative flex h-40 flex-col justify-between overflow-hidden rounded-lg border border-background/20 bg-background/10 p-5 backdrop-blur-md">
                <div className="flex items-start justify-between">
                  <div className="h-8 w-8 rounded-lg bg-background/20" />
                  <span className="text-xs font-medium opacity-60">
                    Barangay ID
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    {profile.firstName} {profile.lastName}
                  </p>
                  <p className="text-xs opacity-60">
                    BGY-MNL-2024-4291
                  </p>
                </div>
              </div>
              <Button className="text-foreground h-10 w-full rounded-lg bg-background font-medium hover:bg-background/90">
                View QR Code
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BadgeSmall({
  icon: Icon,
  label,
  color,
}: {
  icon: any
  label: string
  color: string
}) {
  const colors: Record<string, string> = {
    green: 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800',
    blue: 'bg-sky-50 text-sky-600 border-sky-100 dark:bg-sky-900/20 dark:text-sky-400 dark:border-sky-800',
    slate: 'bg-muted text-muted-foreground border-border',
  }

  return (
    <div
      className={cn(
        'flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium',
        colors[color],
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </div>
  )
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: any
  label: string
  value: string
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        <span className="text-xs font-medium">{label}</span>
      </div>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  )
}

function ActivityRow({
  icon: Icon,
  label,
  date,
  title,
  status,
}: {
  icon: any
  label: string
  date: string
  title: string
  status: string
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border/60 p-3 transition-colors hover:bg-muted/50">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-sm font-medium text-foreground">{title}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xs text-muted-foreground">{date}</p>
        <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">{status}</p>
      </div>
    </div>
  )
}
