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
    <div
      className="border-b"
      style={{
        borderColor: 'var(--color-border)',
        backgroundColor: 'var(--color-bg-primary)',
      }}
    >
      <div className="flex items-start justify-between px-6 py-8 sm:px-8">
        <div className="flex items-start gap-4">
          {icon && (
            <div
              className="mt-1 rounded-lg p-3"
              style={{
                backgroundColor: 'var(--color-bg-secondary)',
                color: 'var(--color-primary)',
              }}
            >
              {icon}
            </div>
          )}
          <div>
            <h1
              className="text-3xl font-bold"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {title}
            </h1>
            {description && (
              <p
                className="mt-2"
                style={{ color: 'var(--color-text-secondary)' }}
              >
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
