export type CargoStatus = 'Pending' | 'Arrived'

export type CargoKind = 'flight' | 'ship'

export interface LatLon {
  lat: number
  lon: number
}

export interface FlightRoute {
  id: string
  code: string
  fromCode: string
  toCode: string
  from: LatLon
  to: LatLon
  kind: CargoKind
  highlight: 'primary' | 'secondary' | 'tertiary'
  inActivities: boolean
}

export interface ActivityRow {
  id: string
  code: string
  fromCode: string
  toCode: string
  arrivalDate: string
  status: CargoStatus
  progress: number
  volume?: number
  kind: CargoKind
}

export type ViewMode = '3D' | '2D'

export interface PointerCoords {
  x: number
  y: number
}
