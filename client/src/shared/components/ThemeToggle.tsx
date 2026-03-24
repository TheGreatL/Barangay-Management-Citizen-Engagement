import { useEffect, useState } from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'

type ThemeMode = 'light' | 'dark' | 'system'

function getInitialMode(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'system'
  }

  const stored = window.localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark' || stored === 'system') {
    return stored
  }

  return 'system'
}

function applyThemeMode(mode: ThemeMode) {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const resolved = mode === 'system' ? (prefersDark ? 'dark' : 'light') : mode

  document.documentElement.classList.remove('light', 'dark')
  document.documentElement.classList.add(resolved)

  if (mode === 'system') {
    document.documentElement.removeAttribute('data-theme')
  } else {
    document.documentElement.setAttribute('data-theme', mode)
  }

  document.documentElement.style.colorScheme = resolved
}

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>('system')

  useEffect(() => {
    const initialMode = getInitialMode()
    setMode(initialMode)
    applyThemeMode(initialMode)
  }, [])

  useEffect(() => {
    if (mode !== 'system') {
      return
    }

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => applyThemeMode('system')

    media.addEventListener('change', onChange)
    return () => {
      media.removeEventListener('change', onChange)
    }
  }, [mode])

  function selectMode(newMode: ThemeMode) {
    setMode(newMode)
    applyThemeMode(newMode)
    window.localStorage.setItem('theme', newMode)
  }

  const CurrentIcon = mode === 'light' ? Sun : mode === 'dark' ? Moon : Monitor

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground h-8 w-8 rounded-lg"
        >
          <CurrentIcon className="h-4 w-4" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36 rounded-lg">
        <DropdownMenuItem
          onClick={() => selectMode('light')}
          className="cursor-pointer gap-2 text-sm"
        >
          <Sun className="h-4 w-4" />
          Light
          {mode === 'light' && (
            <span className="text-muted-foreground ml-auto text-xs">
              Active
            </span>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => selectMode('dark')}
          className="cursor-pointer gap-2 text-sm"
        >
          <Moon className="h-4 w-4" />
          Dark
          {mode === 'dark' && (
            <span className="text-muted-foreground ml-auto text-xs">
              Active
            </span>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => selectMode('system')}
          className="cursor-pointer gap-2 text-sm"
        >
          <Monitor className="h-4 w-4" />
          System
          {mode === 'system' && (
            <span className="text-muted-foreground ml-auto text-xs">
              Active
            </span>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
