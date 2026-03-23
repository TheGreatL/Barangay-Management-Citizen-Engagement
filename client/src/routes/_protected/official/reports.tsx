import { createFileRoute } from '@tanstack/react-router'
import { FileText, Users, MessageSquare, TrendingUp, Download, Calendar, Filter } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/components/ui/card'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts'
import { cn } from '@/shared/lib/utils'

export const Route = createFileRoute('/_protected/official/reports')({
  component: OfficialReportsComponent,
})

const demographicData = [
  { name: '18-24', value: 400 },
  { name: '25-34', value: 300 },
  { name: '35-44', value: 500 },
  { name: '45-54', value: 200 },
  { name: '55+', value: 150 },
]

const activityData = [
  { day: 'Mon', complaints: 4, documents: 12 },
  { day: 'Tue', complaints: 7, documents: 18 },
  { day: 'Wed', complaints: 5, documents: 15 },
  { day: 'Thu', complaints: 12, documents: 22 },
  { day: 'Fri', complaints: 8, documents: 25 },
  { day: 'Sat', complaints: 3, documents: 10 },
  { day: 'Sun', complaints: 2, documents: 5 },
]

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

function OfficialReportsComponent() {
  return (
    <div className="flex flex-col bg-slate-50/10">
      <div className="bg-white border-b px-10 py-10 shadow-sm">
        <div className="max-w-425 mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tighter text-slate-900 flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-200">
                <TrendingUp className="h-6 w-6" />
              </div>
              Insights & Community Analytics
            </h1>
            <p className="text-slate-500 text-lg font-medium leading-tight">Data-driven overview of barangay operations and resident demographics.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-2xl h-14 px-6 font-bold text-slate-600 border-slate-200 shadow-sm">
              <Calendar className="mr-2 h-5 w-5" /> Date Range
            </Button>
            <Button className="rounded-2xl h-14 px-8 font-black shadow-xl shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95 text-lg bg-indigo-600">
              <Download className="mr-2 h-5 w-5" /> Export Insights
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-10">
        <div className="max-w-425 mx-auto space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <ReportStat label="Population" value="2,842" sub="+12 this month" icon={Users} color="blue" />
            <ReportStat label="Docs Issued" value="428" sub="98.2% success" icon={FileText} color="indigo" />
            <ReportStat label="Resolved Cases" value="84" sub="Avg 2.4 days" icon={MessageSquare} color="green" />
            <ReportStat label="Engagement" value="64%" sub="+5% vs last mon" icon={TrendingUp} color="orange" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 rounded-[40px] border-slate-200 shadow-sm overflow-hidden p-8 space-y-8">
              <CardHeader className="p-0 space-y-1">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-black text-slate-900 tracking-tight">Weekly Operational Trends</CardTitle>
                  <Button variant="ghost" size="sm" className="rounded-xl font-bold gap-2 text-slate-500">
                    <Filter className="h-4 w-4" /> Filter Metrics
                  </Button>
                </div>
                <CardDescription className="text-slate-400 uppercase text-[10px] font-black tracking-widest leading-none">Activity volume for complaints and document requests</CardDescription>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <div className="h-100 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={activityData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }} dx={-10} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }} 
                        cursor={{ fill: '#f1f5f9' }}
                      />
                      <Bar dataKey="documents" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={32} />
                      <Bar dataKey="complaints" fill="#ef4444" radius={[6, 6, 0, 0]} barSize={32} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[40px] border-slate-200 shadow-sm overflow-hidden p-8 space-y-8 flex flex-col justify-between">
              <CardHeader className="p-0 space-y-1">
                <CardTitle className="text-2xl font-black text-slate-900 tracking-tight">Demographics</CardTitle>
                <CardDescription className="text-slate-400 text-[10px] font-black uppercase tracking-widest leading-none">Age distribution of registered citizens</CardDescription>
              </CardHeader>
              <CardContent className="p-0 flex flex-col items-center">
                <div className="h-75 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={demographicData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={100}
                        paddingAngle={8}
                        dataKey="value"
                      >
                        {demographicData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full mt-8">
                  {demographicData.map((item, index) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                      <span className="text-xs font-bold text-slate-600">{item.name} ({Math.round(item.value/15.5)}%)</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function ReportStat({ label, value, sub, icon: Icon, color }: { label: string; value: string; sub: string; icon: any; color: string }) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    green: 'bg-green-50 text-green-600 border-green-100',
    orange: 'bg-orange-50 text-orange-600 border-orange-100',
  }

  return (
    <div className="bg-white rounded-4xl p-8 border hover:shadow-xl transition-all group shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className={cn("p-4 rounded-2xl border transition-all group-hover:scale-110 shadow-inner", colors[color])}>
          <Icon className="h-6 w-6" />
        </div>
        <TrendingUp className="h-4 w-4 text-slate-200" />
      </div>
      <div>
        <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">{label}</h4>
        <div className="space-y-1">
          <p className="text-4xl font-black text-slate-900 tracking-tighter leading-none">{value}</p>
          <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest">{sub}</p>
        </div>
      </div>
    </div>
  )
}
