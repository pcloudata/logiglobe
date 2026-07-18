import { Box, ChevronDown, ChevronUp, Map } from 'lucide-react'
import { useDashboard } from '../../hooks/useDashboard'
import { cn } from '../../lib/cn'

export function BottomControls() {
  const { viewMode, setViewMode, activitiesOpen, toggleActivities } = useDashboard()

  return (
    <div
      className={cn(
        'pointer-events-auto absolute left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2 transition-all duration-300',
        activitiesOpen ? 'bottom-[46%]' : 'bottom-6',
      )}
    >
      <div className="glass flex items-center rounded-full p-1">
        <button
          type="button"
          onClick={() => setViewMode('3D')}
          className={cn(
            'flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-wide transition',
            viewMode === '3D' ? 'bg-white text-[#111827]' : 'text-white/65 hover:text-white',
          )}
        >
          <Box size={13} />
          3D
        </button>
        <button
          type="button"
          onClick={() => setViewMode('2D')}
          className={cn(
            'flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-wide transition',
            viewMode === '2D' ? 'bg-white text-[#111827]' : 'text-white/65 hover:text-white',
          )}
        >
          <Map size={13} />
          2D
        </button>
      </div>

      <button
        type="button"
        onClick={toggleActivities}
        className="flex items-center gap-2 rounded-full bg-white px-7 py-2.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#111827] shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition hover:bg-white/92"
      >
        {activitiesOpen ? (
          <>
            Hide Panel
            <ChevronDown size={16} />
          </>
        ) : (
          <>
            Activities
            <ChevronUp size={16} />
          </>
        )}
      </button>
    </div>
  )
}
