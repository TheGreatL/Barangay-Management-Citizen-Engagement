import { createFileRoute } from '@tanstack/react-router'
import { Heart, Shield, GraduationCap, Users, Calendar, ArrowRight, ShoppingBag, Globe } from 'lucide-react'
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
        { name: 'Free Medical Checkup', description: 'Weekly health screening at the health center.', tag: 'Weekly' },
        { name: 'Vaccination Program', description: 'Regular immunizations for children and seniors.', tag: 'Ongoing' },
      ]
    },
    {
      title: 'Safety & Security',
      icon: Shield,
      color: 'bg-blue-50 text-blue-600 border-blue-100',
      services: [
        { name: 'Night Patrol Request', description: 'Request for special area monitoring.', tag: 'On Demand' },
        { name: 'Fire Safety Training', description: 'Community basic fire fighting skills.', tag: 'Scheduled' },
      ]
    },
    {
      title: 'Education & Training',
      icon: GraduationCap,
      color: 'bg-purple-50 text-purple-600 border-purple-100',
      services: [
        { name: 'Digital Literacy', description: 'Basic computer and internet usage classes.', tag: 'Free' },
        { name: 'Skills Workshop', description: 'Livelihood programs and technical training.', tag: 'Certified' },
      ]
    },
    {
      title: 'Social Services',
      icon: Users,
      color: 'bg-green-50 text-green-600 border-green-100',
      services: [
        { name: 'Senior Citizen Support', description: 'Programs and assistance for the elderly.', tag: 'Active' },
        { name: 'Youth Development', description: 'Sports and leadership programs for teens.', tag: 'Active' },
      ]
    }
  ]

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter">Community Services</h1>
          <p className="text-muted-foreground mt-2 text-lg font-medium">Discover programs and utilities provided by your Barangay.</p>
        </div>
        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl border border-slate-200 shadow-inner">
          <ServiceQuickStat label="Available" value="24" color="blue" />
          <ServiceQuickStat label="Active" value="12" color="green" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {serviceCategories.map((category, idx) => (
          <div key={idx} className="group flex flex-col bg-card border rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300">
            <div className="flex items-center justify-between mb-8">
              <div className={cn("p-4 rounded-2xl border flex items-center justify-center shadow-inner", category.color)}>
                <category.icon className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-black tracking-tight flex-1 ml-4 group-hover:text-primary transition-colors">{category.title}</h2>
              <ArrowRight className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-all translate-x-1 group-hover:translate-x-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
              {category.services.map((service, sIdx) => (
                <div key={sIdx} className="bg-slate-50/50 rounded-2xl p-5 border border-dashed border-slate-200 hover:bg-white hover:border-solid hover:border-primary/10 transition-all cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-bold text-sm leading-tight text-slate-800">{service.name}</h4>
                    <Badge variant="outline" className="text-[9px] uppercase tracking-widest px-1.5 h-4 bg-white shadow-xs font-black">{service.tag}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
            
            <Button variant="ghost" className="mt-6 w-full font-bold text-primary group/btn rounded-2xl hover:bg-primary/5">
              Explore All {category.title}
              <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

function ServiceQuickStat({ label, value, color }: { label: string; value: string; color: string }) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
  }

  return (
    <div className="flex items-center gap-3 px-4 py-2">
      <div className={cn("h-2 w-2 rounded-full", colors[color])} />
      <div className="leading-none">
        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{label}</p>
        <p className="text-lg font-black">{value}</p>
      </div>
    </div>
  )
}

function PromotionCard({ title, description, icon: Icon, cta, color }: { title: string; description: string; icon: any; cta: string; color: string }) {
  return (
    <div className={cn("rounded-3xl p-8 flex flex-col justify-between min-h-55 shadow-sm relative overflow-hidden group transition-all hover:-translate-y-1", color)}>
      <div className="relative z-10">
        <Icon className="h-10 w-10 mb-4 opacity-80" />
        <h3 className="text-xl font-black mb-2">{title}</h3>
        <p className="text-sm opacity-70 font-medium leading-relaxed max-w-50">{description}</p>
      </div>
      <Button variant={color.includes('white') ? 'default' : 'secondary'} className="w-fit font-bold rounded-xl mt-4 relative z-10 transition-all hover:scale-105">
        {cta}
      </Button>
      <div className="absolute top-0 right-0 h-32 w-32 bg-white/10 rounded-full -mr-8 -mt-8 blur-2xl group-hover:bg-white/20 transition-all" />
    </div>
  )
}
