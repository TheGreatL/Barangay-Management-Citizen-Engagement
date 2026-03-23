import { createFileRoute, Link } from '@tanstack/react-router'
import { useAuthStore } from '@/shared/stores/auth.store'
import { Button } from '@/shared/components/ui/button'
import { 
  AlertCircle, 
  Users, 
  FileText, 
  BarChart3, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Bell,
  Settings,
  LayoutDashboard,
  Search,
  Plus
} from 'lucide-react'
import { Badge } from '@/shared/components/ui/badge'
import { Card } from '@/shared/components/ui/card'
import { cn } from '@/shared/lib/utils'

export const Route = createFileRoute('/_protected/official/dashboard')({
  component: OfficialDashboardComponent,
})

function OfficialDashboardComponent() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  const stats = [
    { label: 'Pending Docs', value: '12', icon: FileText, color: 'text-amber-600 bg-amber-50', trend: '+4' },
    { label: 'Active Reports', value: '8', icon: AlertCircle, color: 'text-red-600 bg-red-50', trend: '+2' },
    { label: 'Total Verified', value: '1,248', icon: ShieldCheck, color: 'text-green-600 bg-green-50', trend: '+12' },
    { label: 'Monthly Traffic', value: '4.2k', icon: BarChart3, color: 'text-blue-600 bg-blue-50', trend: '+5%' },
  ]

  const recentTasks = [
    { id: 1, title: 'Barangay Clearance Request', name: 'John Doe', time: '10 mins ago', status: 'pending', priority: 'medium' },
    { id: 2, title: 'Noise Complaint: Sector 4', name: 'Maria Santos', time: '25 mins ago', status: 'investigating', priority: 'high' },
    { id: 3, title: 'Certificate of Indigency', name: 'Robert Chen', time: '1 hour ago', status: 'pending', priority: 'low' },
    { id: 4, title: 'Street Light Issue', name: 'Anonymous', time: '2 hours ago', status: 'resolved', priority: 'medium' },
  ]

  return (
    <div className="flex flex-col bg-slate-50/20">
      {/* Premium Header */}
      <div className="bg-white border-b px-10 py-12">
        <div className="max-w-425 mx-auto flex flex-col xl:flex-row xl:items-center justify-between gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge className="bg-primary/10 text-primary border-none text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">BARANGAY OFFICIAL PORTAL</Badge>
              <span className="h-1 w-1 rounded-full bg-slate-200" />
              <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">System Version 2.4.0</span>
            </div>
            <h1 className="text-6xl font-black tracking-tighter text-slate-900 leading-tight">
              Good Morning, <span className="text-primary italic underline underline-offset-8 decoration-primary/20">{user?.firstName || 'Council'}</span>
            </h1>
            <p className="text-slate-500 text-xl font-medium max-w-2xl leading-relaxed">
              You have <span className="text-slate-900 font-black">12 pending documents</span> and <span className="text-slate-900 font-black">8 active incident reports</span> requiring your immediate attention today.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex flex-col items-end mr-6 text-right">
              <p className="text-sm font-black text-slate-900 leading-none mb-1">Sector 7 District</p>
              <p className="text-xs font-bold text-slate-400">Current Shift: 08:00 - 17:00</p>
            </div>
            <Button size="icon" variant="ghost" className="h-14 w-14 rounded-2xl bg-white border shadow-sm relative group">
              <Bell className="h-6 w-6 text-slate-600 transition-transform group-hover:rotate-12" />
              <span className="absolute top-3 right-3 h-3 w-3 bg-red-500 border-2 border-white rounded-full" />
            </Button>
            <Button onClick={logout} variant="outline" className="h-14 px-8 rounded-2xl font-black text-lg border-2 hover:bg-slate-50 transition-all border-slate-200">
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-10">
        <div className="max-w-425 mx-auto space-y-12">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <DashboardStat key={idx} {...stat} />
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
            {/* Main Task List */}
            <div className="xl:col-span-2 space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black tracking-tighter flex items-center gap-3">
                  <LayoutDashboard className="h-8 w-8 text-primary" />
                  Performance Queue
                </h2>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" className="font-bold text-sm text-slate-500 hover:text-primary">View Full Queue</Button>
                </div>
              </div>
              
              <Card className="rounded-[40px] overflow-hidden">
                <div className="p-6 bg-slate-50/50 border-b flex items-center justify-between">
                  <div className="relative w-full max-w-sm">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Filter current tasks..." 
                      className="w-full pl-11 pr-4 py-3 rounded-2xl border bg-white focus:ring-4 focus:ring-primary/5 outline-none transition-all text-sm"
                    />
                  </div>
                  <Button variant="outline" size="sm" className="rounded-xl h-10 px-4 border-slate-200 font-bold">
                    Priority
                  </Button>
                </div>
                <div className="divide-y">
                  {recentTasks.map((task) => (
                    <div key={task.id} className="p-6 flex items-center justify-between group hover:bg-slate-50/80 transition-all cursor-pointer">
                      <div className="flex items-center gap-6">
                        <div className={cn(
                          "h-12 w-12 rounded-2xl flex items-center justify-center border shadow-inner transition-transform group-hover:scale-110",
                          task.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                          task.status === 'investigating' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-green-50 text-green-600 border-green-100'
                        )}>
                          {task.status === 'pending' ? <Clock className="h-6 w-6" /> : 
                           task.status === 'investigating' ? <AlertCircle className="h-6 w-6" /> : <CheckCircle2 className="h-6 w-6" />}
                        </div>
                        <div>
                          <p className="text-lg font-black text-slate-900 tracking-tight leading-tight">{task.title}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-slate-500 font-bold tracking-tight">Reported by {task.name}</span>
                            <span className="h-1 w-1 rounded-full bg-slate-200" />
                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{task.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <Badge variant="outline" className={cn(
                          "px-3 py-1 font-black text-[10px] uppercase tracking-tighter border-2 shadow-xs",
                          task.priority === 'high' ? 'text-red-600 border-red-100 bg-red-50' : 
                          task.priority === 'medium' ? 'text-blue-600 border-blue-100 bg-blue-50' : 'text-slate-400 border-slate-100'
                        )}>
                          {task.priority} Priority
                        </Badge>
                        <ArrowRight className="h-5 w-5 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar Quick Actions */}
            <div className="space-y-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-black tracking-tighter">Command Center</h3>
                <div className="grid grid-cols-1 gap-4">
                  <CommandButton icon={Users} label="Resident Management" href="/_protected/official/residents" color="blue" />
                  <CommandButton icon={FileText} label="Document Pipeline" href="/_protected/official/documents" color="indigo" />
                  <CommandButton icon={AlertCircle} label="Complaint Resolution" href="/_protected/official/complaints" color="red" />
                  <CommandButton icon={BarChart3} label="Performance Analytics" href="/_protected/official/reports" color="green" />
                </div>
              </div>

              <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden group shadow-2xl">
                <div className="relative z-10 space-y-6">
                  <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                    <Plus className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black tracking-tight mb-2">New Announcement</h4>
                    <p className="text-slate-400 font-medium text-sm leading-relaxed">Publish news, events, or alerts directly to the Citizen mobile feed.</p>
                  </div>
                  <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 font-black rounded-2xl h-14 shadow-lg shadow-white/5 transition-all active:scale-95">
                    Start Publishing
                  </Button>
                </div>
                <div className="absolute top-0 right-0 h-48 w-48 bg-primary/20 rounded-full -mr-24 -mt-24 blur-3xl group-hover:bg-primary/30 transition-all duration-700" />
              </div>

              <div className="p-8 rounded-[40px] border border-dashed border-slate-300 flex flex-col items-center text-center space-y-4 hover:border-primary/50 transition-colors group cursor-pointer">
                <div className="h-14 w-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                  <Settings className="h-7 w-7 transition-transform group-hover:rotate-90 duration-500" />
                </div>
                <p className="font-black text-slate-900 uppercase tracking-widest text-[10px]">Portal Settings & Preferences</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DashboardStat({ label, value, icon: Icon, color, trend }: { label: string; value: string; icon: any; color: string; trend: string }) {
  return (
    <Card className="rounded-[40px] p-8 hover:shadow-xl transition-all group overflow-hidden">
      <div className="flex items-start justify-between mb-6">
        <div className={cn("p-4 rounded-2xl border transition-all group-hover:scale-110 shadow-inner", color.split(' ')[1], color.split(' ')[0], color.split(' ')[2])}>
          <Icon className="h-7 w-7" />
        </div>
        <Badge variant={trend.includes('+') ? 'default' : 'secondary'} className={cn("text-[10px] h-6 px-3 rounded-full font-black border-none", trend.includes('+') ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-500')}>
          {trend}
        </Badge>
      </div>
      <div>
        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 leading-none">{label}</p>
        <h3 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">{value}</h3>
      </div>
    </Card>
  )
}

function CommandButton({ icon: Icon, label, href, color }: { icon: any, label: string, href: string, color: string }) {
  const colors: Record<string, string> = {
    blue: 'text-blue-600 bg-blue-50 border-blue-100 group-hover:bg-blue-600 group-hover:text-white',
    indigo: 'text-indigo-600 bg-indigo-50 border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white',
    red: 'text-red-600 bg-red-50 border-red-100 group-hover:bg-red-600 group-hover:text-white',
    green: 'text-green-600 bg-green-50 border-green-100 group-hover:bg-green-600 group-hover:text-white',
  }

  return (
    <Link to={href}>
      <div className="group flex items-center justify-between p-5 rounded-3xl bg-white border border-slate-200 hover:border-transparent hover:shadow-2xl hover:shadow-slate-200 transition-all duration-300">
        <div className="flex items-center gap-4">
          <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center border transition-all duration-300", colors[color])}>
            <Icon className="h-6 w-6" />
          </div>
          <span className="font-black text-slate-900 tracking-tight group-hover:text-primary transition-colors">{label}</span>
        </div>
        <ArrowRight className="h-5 w-5 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
      </div>
    </Link>
  )
}

