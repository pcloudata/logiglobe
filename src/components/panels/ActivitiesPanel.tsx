import { useDashboard } from '../../hooks/useDashboard'
import { ActivitiesTable } from './ActivitiesTable'
import { RiskPanel } from './RiskPanel'

export function ActivitiesPanel() {
  const { activitiesOpen } = useDashboard()
  if (!activitiesOpen) return null

  return (
    <div className="pointer-events-auto absolute inset-x-4 bottom-3 z-40 animate-slide-up md:inset-x-8 lg:left-20 lg:right-8">
      <div className="grid max-h-[44vh] grid-cols-1 gap-3 overflow-hidden md:grid-cols-[minmax(0,1.7fr)_minmax(260px,0.75fr)]">
        <ActivitiesTable />
        <RiskPanel />
      </div>
    </div>
  )
}
