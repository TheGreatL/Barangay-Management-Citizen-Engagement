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
  Plus
} from 'lucide-react'
import { Badge } from '@/shared/components/ui/badge'
import { Card } from '@/shared/components/ui/card'
import { cn } from '@/shared/lib/utils'

export const Route = createFileRoute('/_protected/official/dashboard')({
  component: OfficialDashboardComponent,
})

function OfficialDashboardComponent() {
  const logout = useAuthStore((state) => state.logout)

  const stats = [
    { label: 'Pending Docs', value: '12', icon: FileText, color: 'text-amber-600 bg-amber-50' },
    { label: 'Active Reports', value: '8', icon: AlertCircle, color: 'text-red-600 bg-red-50' },
    { label: 'Total Verified', value: '1,248', icon: ShieldCheck, color: 'text-green-600 bg-green-50' },
    { label: 'Monthly Traffic', value: '4.2k', icon: BarChart3, color: 'text-blue-600 bg-blue-50' },
  ]

  const recentTasks = [
    { id: 1, title: 'Barangay Clearance Request', name: 'John Doe', time: '10 mins ago', status: 'pending', priority: 'medium' },
    { id: 2, title: 'Noise Complaint: Sector 4', name: 'Maria Santos', time: '25 mins ago', status: 'investigating', priority: 'high' },
    { id: 3, title: 'Certificate of Indigency', name: 'Robert Chen', time: '1 hour ago', status: 'pending', priority: 'low' },
    { id: 4, title: 'Street Light Issue', name: 'Anonymous', time: '2 hours ago', status: 'resolved', priority: 'medium' },
  ]

  return (
    <div className="animate-in fade-in slide-in-from-top-4 space-y-8 p-8 duration-500">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Official Dashboard
            </h1>
            <p className="mt-2 text-slate-600">
              Manage resident requests and community affairs
            </p>
          </div>
          <Button onClick={logout} variant="outline">
            Logout
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 bg-card p-6 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {stat.label}
                    </p>
                    <p className="mt-2 text-2xl font-bold text-slate-900">
                      {stat.value}
                    </p>
                  </div>
                  <div className={cn("p-2 rounded-lg", stat.color)}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Task List */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              Performance Queue
            </h2>
            <Card className="rounded-xl overflow-hidden border-slate-200 shadow-sm">
              <div className="divide-y border-slate-100">
                {recentTasks.map((task) => (
                  <div key={task.id} className="p-4 flex items-center justify-between group hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "h-10 w-10 rounded-lg flex items-center justify-center border",
                        task.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                        task.status === 'investigating' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-green-50 text-green-600 border-green-100'
                      )}>
                        {task.status === 'pending' ? <Clock className="h-5 w-5" /> : 
                         task.status === 'investigating' ? <AlertCircle className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 leading-none">{task.title}</p>
                        <p className="text-xs text-slate-500 mt-1">
                          By {task.name} • {task.time}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className={cn(
                      "px-2 py-0.5 text-xs font-bold",
                      task.priority === 'high' ? 'text-red-600 border-red-100 bg-red-50' : 
                      task.priority === 'medium' ? 'text-blue-600 border-blue-100 bg-blue-50' : 'text-slate-400 border-slate-100 font-medium'
                    )}>
                      {task.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar Quick Actions */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Portal Actions</h3>
            <div className="grid grid-cols-1 gap-3">
              <CommandLink icon={Users} label="Resident Management" href="/_protected/official/residents" color="bg-blue-50 text-blue-600" />
              <CommandLink icon={FileText} label="Document Pipeline" href="/_protected/official/documents" color="bg-indigo-50 text-indigo-600" />
              <CommandLink icon={AlertCircle} label="Complaint Resolution" href="/_protected/official/complaints" color="bg-red-50 text-red-600" />
              <CommandLink icon={BarChart3} label="Performance Analytics" href="/_protected/official/reports" color="bg-green-50 text-green-600" />
            </div>

            <Card className="p-6 bg-slate-900 text-white rounded-xl shadow-lg border-none relative overflow-hidden group">
              <div className="relative z-10 space-y-4">
                <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
                  <Plus className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">New Announcement</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">Broadcast news or alerts to citizens.</p>
                </div>
                <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 font-bold rounded-lg h-10 shadow-sm transition-all active:scale-95">
                  Start Publishing
                </Button>
              </div>
              <div className="absolute top-0 right-0 h-32 w-32 bg-primary/20 rounded-full -mr-16 -mt-16 blur-2xl opacity-50 transition-all duration-700 group-hover:bg-primary/30" />
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function CommandLink({ icon: Icon, label, href, color }: { icon: any, label: string, href: string, color: string }) {
  return (
    <Link to={href}>
      <div className="group flex items-center justify-between p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center border border-transparent transition-all", color)}>
            <Icon className="h-5 w-5" />
          </div>
          <span className="font-semibold text-slate-900 text-sm group-hover:text-primary transition-colors">{label}</span>
        </div>
        <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
      </div>
    </Link>
  )
}

