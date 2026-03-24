import { createFileRoute } from '@tanstack/react-router'
import {
  Heart,
  Shield,
  GraduationCap,
  Users,
  Calendar,
  ArrowRight,
  ShoppingBag,
  Globe,
} from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Badge } from '@/shared/components/ui/badge'
import { cn } from '@/shared/lib/utils'

export const Route = createFileRoute('/_protected/citizen/services' as any)({
  component: ServicesComponent,
})

function ServicesComponent() {
  const serviceCategories = [
    {
      title: 'Health & Wellness',
      icon: Heart,
      color: 'bg-red-50 text-red-600 border-red-100',
      services: [
        {
          name: 'Free Medical Checkup',
          description: 'Weekly health screening at the health center.',
          tag: 'Weekly',
        },
        {
          name: 'Vaccination Program',
          description: 'Regular immunizations for children and seniors.',
          tag: 'Ongoing',
        },
      ],
    },
    {
      title: 'Safety & Security',
      icon: Shield,
      color: 'bg-blue-50 text-blue-600 border-blue-100',
      services: [
        {
          name: 'Night Patrol Request',
          description: 'Request for special area monitoring.',
          tag: 'On Demand',
        },
        {
          name: 'Fire Safety Training',
          description: 'Community basic fire fighting skills.',
          tag: 'Scheduled',
        },
      ],
    },
    {
      title: 'Education & Training',
      icon: GraduationCap,
      color: 'bg-purple-50 text-purple-600 border-purple-100',
      services: [
        {
          name: 'Digital Literacy',
          description: 'Basic computer and internet usage classes.',
          tag: 'Free',
        },
        {
          name: 'Skills Workshop',
          description: 'Livelihood programs and technical training.',
          tag: 'Certified',
        },
      ],
    },
    {
      title: 'Social Services',
      icon: Users,
      color: 'bg-green-50 text-green-600 border-green-100',
      services: [
        {
          name: 'Senior Citizen Support',
          description: 'Programs and assistance for the elderly.',
          tag: 'Active',
        },
        {
          name: 'Youth Development',
          description: 'Sports and leadership programs for teens.',
          tag: 'Active',
        },
      ],
    },
  ]

  return (
    <div className="space-y-8 py-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-4xl font-bold">Community Services</h1>
          <p className="text-muted-foreground mt-2 text-lg font-medium">
            Discover programs and utilities provided by your Barangay.
          </p>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-2 shadow-inner">
          <ServiceQuickStat label="Available" value="24" color="blue" />
          <ServiceQuickStat label="Active" value="12" color="green" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {serviceCategories.map((category, idx) => (
          <div
            key={idx}
            className="group bg-card hover:border-primary/20 flex flex-col rounded-3xl border p-6 shadow-sm transition-all duration-300 hover:shadow-xl"
          >
            <div className="mb-8 flex items-center justify-between">
              <div
                className={cn(
                  'flex items-center justify-center rounded-2xl border p-4 shadow-inner',
                  category.color,
                )}
              >
                <category.icon className="h-8 w-8" />
              </div>
              <h2 className="group-hover:text-primary ml-4 flex-1 text-2xl font-bold transition-colors">
                {category.title}
              </h2>
              <ArrowRight className="text-muted-foreground group-hover:text-primary h-6 w-6 translate-x-1 transition-all group-hover:translate-x-2" />
            </div>

            <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2">
              {category.services.map((service, sIdx) => (
                <div
                  key={sIdx}
                  className="hover:border-primary/10 cursor-pointer rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-5 transition-all hover:border-solid hover:bg-white"
                >
                  <div className="mb-2 flex items-start justify-between">
                    <h4 className="text-sm leading-tight font-bold text-slate-800">
                      {service.name}
                    </h4>
                    <Badge
                      variant="outline"
                      className="h-4 bg-white px-1.5 text-xs font-bold shadow-xs"
                    >
                      {service.tag}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>

            <Button
              variant="ghost"
              className="text-primary group/btn hover:bg-primary/5 mt-6 w-full rounded-2xl font-bold"
            >
              Explore All {category.title}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <PromotionCard
          title="Digital Barangay Card"
          description="Access all services with one QR code."
          icon={Globe}
          cta="Apply Now"
          color="bg-slate-900 text-white"
        />
        <PromotionCard
          title="Upcoming Town Hall"
          description="Join us this Saturday for the monthly meeting."
          icon={Calendar}
          cta="View Invite"
          color="bg-primary text-white"
        />
        <PromotionCard
          title="Barangay Marketplace"
          description="Support local businesses and craftsmen."
          icon={ShoppingBag}
          cta="Shop Local"
          color="bg-slate-100 text-slate-900"
        />
      </div>
    </div>
  )
}

function ServiceQuickStat({
  label,
  value,
  color,
}: {
  label: string
  value: string
  color: string
}) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
  }

  return (
    <div className="flex items-center gap-3 px-4 py-2">
      <div className={cn('h-2 w-2 rounded-full', colors[color])} />
      <div className="leading-none">
        <p className="text-muted-foreground text-xs leading-none font-bold">
          {label}
        </p>
        <p className="text-lg font-bold">{value}</p>
      </div>
    </div>
  )
}

function PromotionCard({
  title,
  description,
  icon: Icon,
  cta,
  color,
}: {
  title: string
  description: string
  icon: any
  cta: string
  color: string
}) {
  return (
    <div
      className={cn(
        'group relative flex min-h-55 flex-col justify-between overflow-hidden rounded-3xl p-8 shadow-sm transition-all hover:-translate-y-1',
        color,
      )}
    >
      <div className="relative z-10">
        <Icon className="mb-4 h-10 w-10 opacity-80" />
        <h3 className="mb-2 text-xl font-bold">{title}</h3>
        <p className="max-w-50 text-sm leading-relaxed font-medium opacity-70">
          {description}
        </p>
      </div>
      <Button
        variant={color.includes('white') ? 'default' : 'secondary'}
        className="relative z-10 mt-4 w-fit rounded-xl font-bold transition-all hover:scale-105"
      >
        {cta}
      </Button>
      <div className="absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 rounded-full bg-white/10 blur-2xl transition-all group-hover:bg-white/20" />
    </div>
  )
}
