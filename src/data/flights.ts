import type { ActivityRow, FlightRoute } from '../types'

export const FLIGHTS: FlightRoute[] = [
  {
    id: 'aa-845',
    code: 'AA-845',
    fromCode: 'USA',
    toCode: 'COL',
    from: { lat: 37.7749, lon: -122.4194 },
    to: { lat: 4.711, lon: -74.0721 },
    kind: 'flight',
    highlight: 'primary',
    inActivities: true,
  },
  {
    id: 'jl-748',
    code: 'JL-748',
    fromCode: 'CHN',
    toCode: 'KOR',
    from: { lat: 31.2304, lon: 121.4737 },
    to: { lat: 37.5665, lon: 126.978 },
    kind: 'ship',
    highlight: 'secondary',
    inActivities: true,
  },
  {
    id: 'mu-131',
    code: 'MU-131',
    fromCode: 'JPN',
    toCode: 'DEU',
    from: { lat: 35.6762, lon: 139.6503 },
    to: { lat: 50.1109, lon: 8.6821 },
    kind: 'flight',
    highlight: 'secondary',
    inActivities: true,
  },
  {
    id: 'ml-356',
    code: 'ML-356',
    fromCode: 'BRA',
    toCode: 'ESP',
    from: { lat: -23.5505, lon: -46.6333 },
    to: { lat: 40.4168, lon: -3.7038 },
    kind: 'flight',
    highlight: 'tertiary',
    inActivities: false,
  },
]

export const ACTIVITIES: ActivityRow[] = [
  {
    id: 'aa-845',
    code: 'AA-845',
    fromCode: 'USA',
    toCode: 'COL',
    arrivalDate: 'Jun 5, 2024',
    status: 'Pending',
    progress: 0.42,
    volume: 3780,
    kind: 'flight',
  },
  {
    id: 'jl-748',
    code: 'JL-748',
    fromCode: 'CHN',
    toCode: 'KOR',
    arrivalDate: 'Jun 3, 2024',
    status: 'Pending',
    progress: 0.55,
    kind: 'ship',
  },
  {
    id: 'mu-131',
    code: 'MU-131',
    fromCode: 'JPN',
    toCode: 'DEU',
    arrivalDate: 'Apr 25, 2024',
    status: 'Arrived',
    progress: 0.92,
    volume: 5875,
    kind: 'flight',
  },
]

export const INITIAL_COORDS = {
  x: 34.914707,
  y: -122.779149,
}
