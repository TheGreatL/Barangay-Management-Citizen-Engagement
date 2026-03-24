export function LoadingScreen() {
  return (
    <div className="animate-in fade-in bg-background/80 fixed inset-0 z-100 flex items-center justify-center backdrop-blur-sm duration-300">
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex h-10 w-10">
          <div className="border-foreground/20 border-t-foreground relative inline-flex h-10 w-10 animate-spin rounded-full border-2"></div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="text-foreground text-sm font-medium">Loading</p>
          <p className="text-muted-foreground text-xs">Please wait a moment</p>
        </div>
      </div>
    </div>
  )
}
