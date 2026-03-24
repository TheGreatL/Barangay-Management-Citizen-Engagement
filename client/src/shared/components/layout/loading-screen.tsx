export function LoadingScreen() {
  return (
    <div className="animate-in fade-in fixed inset-0 z-100 flex items-center justify-center bg-background/80 backdrop-blur-sm duration-300">
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex h-10 w-10">
          <div className="relative inline-flex h-10 w-10 animate-spin rounded-full border-2 border-foreground/20 border-t-foreground"></div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm font-medium text-foreground">
            Loading
          </p>
          <p className="text-xs text-muted-foreground">Please wait a moment</p>
        </div>
      </div>
    </div>
  )
}
