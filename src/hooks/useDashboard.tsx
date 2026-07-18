import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { PointerCoords, ViewMode } from '../types'
import { INITIAL_COORDS } from '../data/flights'
import { LIVE_TRACKING_MS } from '../data/stats'

interface DashboardState {
  viewMode: ViewMode
  setViewMode: (m: ViewMode) => void
  activitiesOpen: boolean
  setActivitiesOpen: (v: boolean) => void
  toggleActivities: () => void
  howItWorksOpen: boolean
  setHowItWorksOpen: (v: boolean) => void
  selectedFlightId: string | null
  setSelectedFlightId: (id: string | null) => void
  coords: PointerCoords
  setCoords: (c: PointerCoords) => void
  latencyMs: number
  darkMode: boolean
  setDarkMode: (v: boolean) => void
  zoomCommand: number
  requestZoom: (delta: number) => void
  recenterToken: number
  requestRecenter: () => void
  focusFlightId: string | null
  focusFlight: (id: string) => void
  clearFocus: () => void
}

const DashboardContext = createContext<DashboardState | null>(null)

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [viewMode, setViewMode] = useState<ViewMode>('3D')
  const [activitiesOpen, setActivitiesOpen] = useState(false)
  const [howItWorksOpen, setHowItWorksOpen] = useState(false)
  const [selectedFlightId, setSelectedFlightId] = useState<string | null>('aa-845')
  const [coords, setCoords] = useState<PointerCoords>(INITIAL_COORDS)
  const [latencyMs, setLatencyMs] = useState(LIVE_TRACKING_MS)
  const [darkMode, setDarkMode] = useState(true)
  const [zoomCommand, setZoomCommand] = useState(0)
  const [recenterToken, setRecenterToken] = useState(0)
  const [focusFlightId, setFocusFlightId] = useState<string | null>(null)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  useEffect(() => {
    const id = window.setInterval(() => {
      setLatencyMs(148 + Math.floor(Math.random() * 15))
    }, 8000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setHowItWorksOpen(false)
        setActivitiesOpen(false)
      }
      if ((e.key === 'a' || e.key === 'A') && !(e.target instanceof HTMLInputElement)) {
        setActivitiesOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const toggleActivities = useCallback(() => {
    setActivitiesOpen((v) => !v)
  }, [])

  const requestZoom = useCallback((delta: number) => {
    setZoomCommand(delta)
  }, [])

  const requestRecenter = useCallback(() => {
    setRecenterToken((t) => t + 1)
  }, [])

  const focusFlight = useCallback((id: string) => {
    setSelectedFlightId(id)
    setFocusFlightId(id)
  }, [])

  const clearFocus = useCallback(() => setFocusFlightId(null), [])

  const value = useMemo(
    () => ({
      viewMode,
      setViewMode,
      activitiesOpen,
      setActivitiesOpen,
      toggleActivities,
      howItWorksOpen,
      setHowItWorksOpen,
      selectedFlightId,
      setSelectedFlightId,
      coords,
      setCoords,
      latencyMs,
      darkMode,
      setDarkMode,
      zoomCommand,
      requestZoom,
      recenterToken,
      requestRecenter,
      focusFlightId,
      focusFlight,
      clearFocus,
    }),
    [
      viewMode,
      activitiesOpen,
      howItWorksOpen,
      selectedFlightId,
      coords,
      latencyMs,
      darkMode,
      zoomCommand,
      recenterToken,
      focusFlightId,
      toggleActivities,
      requestZoom,
      requestRecenter,
      focusFlight,
      clearFocus,
    ],
  )

  return (
    <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
  )
}

export function useDashboard() {
  const ctx = useContext(DashboardContext)
  if (!ctx) throw new Error('useDashboard must be used within DashboardProvider')
  return ctx
}
