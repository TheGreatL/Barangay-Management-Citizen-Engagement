import { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
}

export function PageHeader({
  title,
  description,
  icon,
  action,
}: PageHeaderProps) {
  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="flex items-start justify-between px-6 py-8 sm:px-8">
        <div className="flex items-start gap-4">
          {icon && (
            <div className="mt-1 rounded-lg bg-blue-50 p-3 text-blue-600">
              {icon}
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              {title}
            </h1>
            {description && (
              <p className="mt-2 text-slate-600">
                {description}
              </p>
            )}
          </div>
        </div>
        {action && <div>{action}</div>}
      </div>
    </div>
  )
}
