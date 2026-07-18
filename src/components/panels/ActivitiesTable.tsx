import { MoreVertical, Plane, Search, Ship, SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
import { ACTIVITIES } from '../../data/flights'
import { useDashboard } from '../../hooks/useDashboard'
import type { CargoStatus } from '../../types'
import { cn } from '../../lib/cn'
import { RouteProgress } from '../ui/RouteProgress'
import { StatusBadge } from '../ui/StatusBadge'

type Filter = 'All' | CargoStatus

export function ActivitiesTable() {
  const { selectedFlightId, focusFlight } = useDashboard()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('All')
  const [filterOpen, setFilterOpen] = useState(false)

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return ACTIVITIES.filter((row) => {
      if (filter !== 'All' && row.status !== filter) return false
      if (!q) return true
      return (
        row.code.toLowerCase().includes(q) ||
        row.fromCode.toLowerCase().includes(q) ||
        row.toCode.toLowerCase().includes(q) ||
        row.status.toLowerCase().includes(q)
      )
    })
  }, [query, filter])

  return (
    <div className="flex h-full flex-col rounded-[28px] bg-[var(--panel-white)] p-5 text-slate-900 shadow-xl">
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-display text-2xl font-semibold">Activities</h3>
        <div className="relative flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2">
            <Search size={14} className="text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="w-28 bg-transparent text-sm outline-none placeholder:text-slate-400 sm:w-40"
            />
          </div>
          <button
            type="button"
            aria-label="Filter"
            onClick={() => setFilterOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
          >
            <SlidersHorizontal size={14} />
          </button>
          {filterOpen && (
            <div className="absolute right-0 top-11 z-10 flex gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-lg">
              {(['All', 'Pending', 'Arrived'] as Filter[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => {
                    setFilter(f)
                    setFilterOpen(false)
                  }}
                  className={cn(
                    'rounded-lg px-2.5 py-1 text-xs font-medium',
                    filter === f ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100',
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 overflow-auto no-scrollbar">
        <table className="w-full min-w-[560px] border-separate border-spacing-y-2 text-left">
          <thead>
            <tr className="text-[10px] uppercase tracking-[0.14em] text-slate-400">
              <th className="px-2 py-1 font-medium">Cargo ID</th>
              <th className="px-2 py-1 font-medium">Destination</th>
              <th className="px-2 py-1 font-medium">Arrival Date</th>
              <th className="px-2 py-1 font-medium">Status</th>
              <th className="w-8" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const selected = selectedFlightId === row.id
              const Icon = row.kind === 'ship' ? Ship : Plane
              const iconBg =
                row.id === 'aa-845' ? 'bg-[var(--accent-yellow)] text-black' : 'bg-[#3B6CFF] text-white'
              return (
                <tr
                  key={row.id}
                  onClick={() => focusFlight(row.id)}
                  className={cn(
                    'cursor-pointer rounded-2xl transition',
                    selected ? 'bg-[#EEF2FF]' : 'hover:bg-slate-100/80',
                  )}
                >
                  <td className="rounded-l-2xl px-2 py-3">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={cn(
                          'flex h-8 w-8 items-center justify-center rounded-full',
                          iconBg,
                        )}
                      >
                        <Icon size={14} />
                      </span>
                      <span className="font-semibold tracking-wide">{row.code}</span>
                    </div>
                  </td>
                  <td className="px-2 py-3">
                    <RouteProgress
                      from={row.fromCode}
                      to={row.toCode}
                      progress={row.progress}
                    />
                  </td>
                  <td className="px-2 py-3 text-sm text-slate-600">{row.arrivalDate}</td>
                  <td className="px-2 py-3">
                    <div className="flex flex-col items-start gap-1">
                      {row.volume != null && (
                        <span className="text-[10px] tabular-nums text-slate-400">
                          {row.volume} ml
                        </span>
                      )}
                      <StatusBadge status={row.status} />
                    </div>
                  </td>
                  <td className="rounded-r-2xl px-2 py-3 text-slate-400">
                    <MoreVertical size={16} />
                  </td>
                </tr>
              )
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-2 py-8 text-center text-sm text-slate-400">
                  No activities match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
