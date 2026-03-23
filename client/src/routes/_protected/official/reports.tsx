import { createFileRoute } from '@tanstack/react-router'
import {
  FileText,
  Users,
  MessageSquare,
  TrendingUp,
  Download,
  Calendar,
  Filter,
} from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/shared/components/ui/card'
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
  Cell,
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
    <div className="space-y-8 py-8">
      <div className="space-y-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Community Analytics
            </h1>
            <p className="mt-1 text-slate-500">
              Data-driven overview of barangay operations and demographics.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" /> Date Range
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" /> Export Insights
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <ReportStat
            label="Population"
            value="2,842"
            sub="+12 this month"
            icon={Users}
            color="blue"
          />
          <ReportStat
            label="Docs Issued"
            value="428"
            sub="98.2% success"
            icon={FileText}
            color="indigo"
          />
          <ReportStat
            label="Resolved Cases"
            value="84"
            sub="Avg 2.4 days"
            icon={MessageSquare}
            color="green"
          />
          <ReportStat
            label="Engagement"
            value="64%"
            sub="+5% vs last mon"
            icon={TrendingUp}
            color="orange"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="overflow-hidden rounded-xl shadow-sm lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
              <div className="space-y-1">
                <CardTitle className="text-xl font-bold text-slate-900">
                  Weekly Trends
                </CardTitle>
                <CardDescription className="text-xs font-medium text-slate-400">
                  Activity volume for complaints and documents
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="h-8 gap-2 px-3">
                <Filter className="h-3.5 w-3.5" /> Filter
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-75 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={activityData}
                    margin={{ top: 0, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f1f5f9"
                    />
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-lg border bg-white p-2 text-xs font-medium shadow-sm">
                              {payload.map((entry: any, index: number) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2 py-0.5"
                                >
                                  <div
                                    className="h-1.5 w-1.5 rounded-full"
                                    style={{ backgroundColor: entry.fill }}
                                  />
                                  <span className="text-slate-500">
                                    {entry.name}:
                                  </span>
                                  <span className="font-bold text-slate-900">
                                    {entry.value}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Bar
                      dataKey="documents"
                      fill="#6366f1"
                      radius={[4, 4, 0, 0]}
                      barSize={24}
                    />
                    <Bar
                      dataKey="complaints"
                      fill="#f43f5e"
                      radius={[4, 4, 0, 0]}
                      barSize={24}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="flex flex-col overflow-hidden rounded-xl shadow-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-xl font-bold text-slate-900">
                Demographics
              </CardTitle>
              <CardDescription className="text-xs font-medium text-slate-400">
                Age distribution of citizens
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col items-center justify-center">
              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={demographicData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {demographicData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                          stroke="rgba(255,255,255,0.1)"
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-lg border bg-white p-2 text-xs font-medium shadow-sm">
                              <div className="flex items-center gap-2 py-0.5">
                                <div
                                  className="h-1.5 w-1.5 rounded-full"
                                  style={{
                                    backgroundColor: payload[0].payload.fill,
                                  }}
                                />
                                <span className="text-slate-500">
                                  {payload[0].name}:
                                </span>
                                <span className="font-bold text-slate-900">
                                  {payload[0].value}
                                </span>
                              </div>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 grid w-full grid-cols-2 gap-x-6 gap-y-3 px-2">
                {demographicData.map((item, index) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="truncate text-xs font-semibold text-slate-600">
                      {item.name} ({Math.round(item.value / 15.5)}%)
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function ReportStat({
  label,
  value,
  sub,
  icon: Icon,
  color,
}: {
  label: string
  value: string
  sub: string
  icon: any
  color: string
}) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    green: 'bg-green-50 text-green-600 border-green-100',
    orange: 'bg-orange-50 text-orange-600 border-orange-100',
  }

  return (
    <Card className="group rounded-xl border shadow-sm">
      <CardContent className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div
            className={cn('rounded-lg border p-2 shadow-inner', colors[color])}
          >
            <Icon className="h-5 w-5" />
          </div>
          <TrendingUp className="h-4 w-4 text-slate-200" />
        </div>
        <div>
          <h4 className="mb-1 text-xs font-semibold text-slate-400">{label}</h4>
          <div className="space-y-1">
            <p className="text-2xl leading-none font-bold text-slate-900">
              {value}
            </p>
            <p className="text-xs font-bold text-green-600">{sub}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
