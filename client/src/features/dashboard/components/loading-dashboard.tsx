export function LoadingDashboard() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-foreground/10 border-t-foreground"></div>
        <p className="text-xs font-medium text-muted-foreground">
          Loading Dashboard
        </p>
      </div>
    </div>
  )
}
