import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { User, Mail, Phone, MapPin, Calendar, Shield, Edit, Camera, Activity, FileText } from 'lucide-react'
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
        <div className="h-20 w-20 animate-spin rounded-full border-b-2 border-primary" />
      </div>
    )
  }

  if (!profile) {
    return <div>Profile not found</div>
  }

  return (
    <div className="flex flex-col bg-slate-50/20">
      <div className="bg-white border-b px-8 py-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-primary/5 to-transparent" />
        <div className="max-w-300 mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="relative group">
            <div className="h-40 w-40 rounded-[40px] bg-slate-100 border-4 border-white shadow-2xl overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
              <User className="h-20 w-20 text-slate-300" />
            </div>
            <button className="absolute bottom-2 right-2 bg-primary text-white p-3 rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all" title="Upload Profile Picture">
              <Camera className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 text-center md:text-left space-y-3">
            <h1 className="text-5xl font-black text-slate-900">{profile.firstName} {profile.lastName}</h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <BadgeSmall icon={Shield} label="Verified Citizen" color="green" />
              <BadgeSmall icon={MapPin} label="District 4" color="blue" />
              <BadgeSmall icon={Calendar} label={`Member since ${new Date(profile.createdAt).getFullYear()}`} color="slate" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button className="rounded-2xl h-14 px-8 font-black shadow-xl shadow-primary/30 transition-all hover:scale-105 active:scale-95 text-lg">
              <Edit className="mr-2 h-5 w-5" /> Edit Profile
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-8">
        <div className="max-w-300 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[40px] border border-slate-200 p-8 shadow-sm space-y-8">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                <div className="h-8 w-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <User className="h-4 w-4" />
                </div>
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InfoItem icon={Mail} label="Email Address" value={profile.email} />
                <InfoItem icon={Phone} label="Phone Number" value={profile.phone} />
                <InfoItem icon={Calendar} label="Birth Date" value={new Date(profile.birthDate).toLocaleDateString()} />
                <InfoItem icon={User} label="Gender" value={profile.gender} />
                <div className="md:col-span-2">
                  <InfoItem icon={MapPin} label="Permanent Address" value={profile.address} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[40px] border border-slate-200 p-8 shadow-sm space-y-8">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                <div className="h-8 w-8 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                  <Activity className="h-4 w-4" />
                </div>
                Resident Activity
              </h3>
              <div className="space-y-4">
                <ActivityRow icon={FileText} label="Document Request" date="2 days ago" title="Barangay Clearance" status="Approved" />
                <ActivityRow icon={Shield} label="Verification" date="1 week ago" title="Identity Verified" status="Success" />
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-primary rounded-[40px] p-8 text-white shadow-2xl shadow-primary/20 space-y-6">
              <h3 className="text-xl font-black flex items-center gap-3">
                Digital ID Card
              </h3>
              <div className="h-48 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col justify-between p-6 overflow-hidden relative">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
                <div className="flex justify-between items-start">
                  <div className="h-10 w-10 bg-white/20 rounded-lg" />
                  <span className="text-xs font-black opacity-60">Barangay ID</span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-black">{profile.firstName} {profile.lastName}</p>
                  <p className="text-xs opacity-60 font-medium">BGY-MNL-2024-4291</p>
                </div>
              </div>
              <Button className="w-full h-14 rounded-2xl bg-white text-primary font-black hover:bg-white/90">
                View QR Code
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BadgeSmall({ icon: Icon, label, color }: { icon: any; label: string; color: string }) {
  const colors: Record<string, string> = {
    green: 'bg-green-50 text-green-600 border-green-100',
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    slate: 'bg-slate-50 text-slate-600 border-slate-100',
  }

  return (
    <div className={cn("px-4 py-2 rounded-2xl border flex items-center gap-2 text-sm font-bold shadow-sm", colors[color])}>
      <Icon className="h-4 w-4" />
      {label}
    </div>
  )
}

function InfoItem({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
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

function ActivityRow({ icon: Icon, label, date, title, status }: { icon: any; label: string; date: string; title: string; status: string }) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-2xl hover:bg-slate-50 transition-colors">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
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
