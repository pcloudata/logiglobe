import { DashboardProvider, useDashboard } from './hooks/useDashboard'
import { TopBar } from './components/layout/TopBar'
import { LeftSidebar } from './components/layout/LeftSidebar'
import { LeftPromo } from './components/layout/LeftPromo'
import { RightStats } from './components/layout/RightStats'
import { LiveCoords } from './components/layout/LiveCoords'
import { BottomControls } from './components/layout/BottomControls'
import { ZoomControls } from './components/layout/ZoomControls'
import { GlobeScene } from './components/globe/GlobeScene'
import { FlatMap } from './components/globe/FlatMap'
import { ActivitiesPanel } from './components/panels/ActivitiesPanel'
import { HowItWorksModal } from './components/panels/HowItWorksModal'

function Dashboard() {
  const { viewMode } = useDashboard()

  return (
    <div className="relative h-full w-full overflow-hidden bg-deep">
      {viewMode === '3D' ? <GlobeScene /> : <FlatMap />}

      <TopBar />
      <LeftSidebar />
      <LeftPromo />
      <RightStats />
      <LiveCoords />
      <BottomControls />
      <ZoomControls />
      <ActivitiesPanel />
      <HowItWorksModal />
    </div>
  )
}

export default function App() {
  return (
    <DashboardProvider>
      <Dashboard />
    </DashboardProvider>
  )
}
