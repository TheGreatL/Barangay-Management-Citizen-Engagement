export function LoadingDashboard() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="border-foreground/10 border-t-foreground h-8 w-8 animate-spin rounded-full border-2"></div>
        <p className="text-muted-foreground text-xs font-medium">
          Loading Dashboard
        </p>
      </div>
    </div>
  )
}
