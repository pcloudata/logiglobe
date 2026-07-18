import { Moon, Sun } from 'lucide-react'
import { useDashboard } from '../../hooks/useDashboard'
import { cn } from '../../lib/cn'

export function ThemeToggle() {
  const { darkMode, setDarkMode } = useDashboard()
  return (
    <div className="glass flex items-center rounded-full p-1">
      <button
        type="button"
        aria-label="Dark mode"
        onClick={() => setDarkMode(true)}
        className={cn(
          'flex h-7 w-7 items-center justify-center rounded-full transition',
          darkMode ? 'bg-white text-black' : 'text-white/60 hover:text-white',
        )}
      >
        <Moon size={14} />
      </button>
      <button
        type="button"
        aria-label="Light mode"
        onClick={() => setDarkMode(false)}
        className={cn(
          'flex h-7 w-7 items-center justify-center rounded-full transition',
          !darkMode ? 'bg-white text-black' : 'text-white/60 hover:text-white',
        )}
      >
        <Sun size={14} />
      </button>
    </div>
  )
}
