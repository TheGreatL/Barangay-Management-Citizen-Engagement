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
    <div className="flex flex-col bg-slate-50/20">
      <div className="relative overflow-hidden border-b bg-white py-12">
        <div className="from-primary/5 absolute top-0 right-0 h-full w-1/3 bg-linear-to-l to-transparent" />
        <div className="mx-auto flex flex-col items-center gap-10 md:flex-row">
          <div className="group relative">
            <div className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-[40px] border-4 border-white bg-slate-100 shadow-2xl transition-transform duration-500 group-hover:scale-105">
              <User className="h-20 w-20 text-slate-300" />
            </div>
            <button
              className="bg-primary absolute right-2 bottom-2 rounded-2xl p-3 text-white shadow-xl transition-all hover:scale-110 active:scale-95"
              title="Upload Profile Picture"
            >
              <Camera className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 space-y-3 text-center md:text-left">
            <h1 className="text-5xl font-black text-slate-900">
              {profile.firstName} {profile.lastName}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
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
            <Button className="shadow-primary/30 h-14 rounded-2xl px-8 text-lg font-black shadow-xl transition-all hover:scale-105 active:scale-95">
              <Edit className="mr-2 h-5 w-5" /> Edit Profile
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <div className="space-y-8 rounded-[40px] border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="flex items-center gap-3 text-xl font-black text-slate-900">
                <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-xl">
                  <User className="h-4 w-4" />
                </div>
                Personal Information
              </h3>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
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

            <div className="space-y-8 rounded-[40px] border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="flex items-center gap-3 text-xl font-black text-slate-900">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                  <Activity className="h-4 w-4" />
                </div>
                Resident Activity
              </h3>
              <div className="space-y-4">
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

          <div className="space-y-8">
            <div className="bg-primary shadow-primary/20 space-y-6 rounded-[40px] p-8 text-white shadow-2xl">
              <h3 className="flex items-center gap-3 text-xl font-black">
                Digital ID Card
              </h3>
              <div className="relative flex h-48 flex-col justify-between overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
                <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
                <div className="flex items-start justify-between">
                  <div className="h-10 w-10 rounded-lg bg-white/20" />
                  <span className="text-xs font-black opacity-60">
                    Barangay ID
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-black">
                    {profile.firstName} {profile.lastName}
                  </p>
                  <p className="text-xs font-medium opacity-60">
                    BGY-MNL-2024-4291
                  </p>
                </div>
              </div>
              <Button className="text-primary h-14 w-full rounded-2xl bg-white font-black hover:bg-white/90">
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
    green: 'bg-green-50 text-green-600 border-green-100',
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    slate: 'bg-slate-50 text-slate-600 border-slate-100',
  }

  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-bold shadow-sm',
        colors[color],
      )}
    >
      <Icon className="h-4 w-4" />
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
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-slate-400">
        <Icon className="h-4 w-4" />
        <span className="text-xs font-black">{label}</span>
      </div>
      <p className="text-lg font-bold text-slate-800">{value}</p>
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
    <div className="flex items-center justify-between rounded-2xl border p-4 transition-colors hover:bg-slate-50">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-black text-slate-400">{label}</p>
          <p className="font-bold text-slate-800">{title}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xs font-bold text-slate-400">{date}</p>
        <p className="text-xs font-black text-green-600">{status}</p>
      </div>
    </div>
  )
}
