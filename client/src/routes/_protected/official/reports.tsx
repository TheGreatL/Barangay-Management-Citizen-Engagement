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
            <h1 className="text-foreground text-2xl font-semibold tracking-tight">
              Community Analytics
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Data-driven overview of barangay operations and demographics.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" /> Date Range
            </Button>
            <Button size="sm">
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

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="border-border/60 overflow-hidden rounded-xl lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
              <div className="space-y-1">
                <CardTitle className="text-foreground text-sm font-semibold">
                  Weekly Trends
                </CardTitle>
                <CardDescription className="text-muted-foreground text-xs">
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
                      className="stroke-border/50"
                    />
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      className="text-muted-foreground"
                      tick={{ fontSize: 11, fontWeight: 500 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      className="text-muted-foreground"
                      tick={{ fontSize: 11, fontWeight: 500 }}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="border-border bg-card rounded-lg border p-2 text-xs font-medium shadow-sm">
                              {payload.map((entry: any, index: number) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2 py-0.5"
                                >
                                  <div
                                    className="h-1.5 w-1.5 rounded-full"
                                    style={{ backgroundColor: entry.fill }}
                                  />
                                  <span className="text-muted-foreground">
                                    {entry.name}:
                                  </span>
                                  <span className="text-foreground font-medium">
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

          <Card className="border-border/60 flex flex-col overflow-hidden rounded-xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-foreground text-sm font-semibold">
                Demographics
              </CardTitle>
              <CardDescription className="text-muted-foreground text-xs">
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
                            <div className="border-border bg-card rounded-lg border p-2 text-xs font-medium shadow-sm">
                              <div className="flex items-center gap-2 py-0.5">
                                <div
                                  className="h-1.5 w-1.5 rounded-full"
                                  style={{
                                    backgroundColor: payload[0].payload.fill,
                                  }}
                                />
                                <span className="text-muted-foreground">
                                  {payload[0].name}:
                                </span>
                                <span className="text-foreground font-medium">
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
              <div className="mt-5 grid w-full grid-cols-2 gap-x-4 gap-y-2 px-2">
                {demographicData.map((item, index) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-muted-foreground truncate text-xs font-medium">
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
    blue: 'bg-sky-50 text-sky-600 dark:bg-sky-900/20 dark:text-sky-400',
    indigo:
      'bg-violet-50 text-violet-600 dark:bg-violet-900/20 dark:text-violet-400',
    green:
      'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
    orange:
      'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400',
  }

  return (
    <Card className="group border-border/60 hover:border-border rounded-xl transition-all">
      <CardContent className="p-5">
        <div className="mb-4 flex items-start justify-between">
          <div className={cn('rounded-lg p-2', colors[color])}>
            <Icon className="h-4 w-4" />
          </div>
          <TrendingUp className="text-muted-foreground/30 h-4 w-4" />
        </div>
        <div>
          <h4 className="text-muted-foreground mb-1 text-xs font-medium">
            {label}
          </h4>
          <div className="space-y-1">
            <p className="text-foreground text-2xl font-semibold">{value}</p>
            <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
              {sub}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
