import { Maximize2, Minus, Plus } from 'lucide-react'
import { useDashboard } from '../../hooks/useDashboard'

export function ZoomControls() {
  const { requestZoom, requestRecenter, activitiesOpen } = useDashboard()

  return (
    <div
      className={`pointer-events-auto absolute right-6 z-30 flex items-center gap-2 transition-all duration-300 ${
        activitiesOpen ? 'bottom-[46%]' : 'bottom-6'
      }`}
    >
      <span className="mr-1 text-[11px] uppercase tracking-wider text-white/50">Zoom</span>
      <div className="glass flex items-center rounded-full p-1">
        <button
          type="button"
          aria-label="Zoom out"
          onClick={() => requestZoom(1)}
          className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10"
        >
          <Minus size={14} />
        </button>
        <button
          type="button"
          aria-label="Zoom in"
          onClick={() => requestZoom(-1)}
          className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10"
        >
          <Plus size={14} />
        </button>
      </div>
      <button
        type="button"
        aria-label="Recenter"
        onClick={requestRecenter}
        className="glass flex h-9 w-9 items-center justify-center rounded-xl text-white/80 transition hover:bg-white/10"
      >
        <Maximize2 size={14} />
      </button>
    </div>
  )
}
