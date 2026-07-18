export function RouteProgress({
  from,
  to,
  progress,
}: {
  from: string
  to: string
  progress: number
}) {
  const pct = Math.max(0.08, Math.min(0.95, progress))
  return (
    <div className="flex min-w-[140px] items-center gap-2 text-sm font-medium text-slate-700">
      <span className="w-8 shrink-0 font-semibold text-slate-900">{from}</span>
      <div className="relative h-[2px] flex-1 rounded-full bg-slate-200">
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-[#3B6CFF]"
          style={{ width: `${pct * 100}%` }}
        />
        <span
          className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 border-white bg-[#3B6CFF] shadow"
          style={{ left: `calc(${pct * 100}% - 5px)` }}
        />
        <span className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full border border-slate-300 bg-white" />
      </div>
      <span className="w-8 shrink-0 text-right font-semibold text-slate-900">{to}</span>
    </div>
  )
}
