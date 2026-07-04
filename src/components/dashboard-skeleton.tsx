function Bone({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-full bg-paper-muted ${className}`} />
  );
}

export function DashboardSkeleton() {
  return (
    <div className="px-8 py-8">
      <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-white p-6">
              <Bone className="h-4 w-28" />
              <Bone className="mt-3 h-8 w-32" />
            </div>
            <div className="rounded-lg bg-white p-6">
              <Bone className="h-4 w-40" />
              <Bone className="mt-3 h-8 w-28" />
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <Bone className="h-4 w-16" />
              <div className="flex items-center gap-5">
                <Bone className="h-4 w-14" />
                <Bone className="h-4 w-24" />
              </div>
            </div>

            <Bone className="mt-3 h-9 w-40" />

            <div className="mt-5 flex flex-wrap gap-2">
              <Bone className="h-7 w-16" />
              <Bone className="h-7 w-16" />
              <Bone className="h-7 w-16" />
            </div>

            <div className="mt-6">
              <Bone className="h-3 w-20 rounded" />
              <Bone className="mt-2 aspect-[700/182] w-full rounded-lg" />
            </div>

            <div className="mt-4 flex gap-2">
              <Bone className="h-9 w-16" />
              <Bone className="h-9 w-20" />
              <Bone className="h-9 w-16" />
              <Bone className="h-9 w-16" />
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 sm:p-8">
            <Bone className="h-4 w-32" />
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-2 rounded-lg border border-line p-4"
                >
                  <Bone className="h-9 w-9" />
                  <Bone className="h-3 w-14 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="h-fit rounded-lg bg-white p-6">
          <Bone className="h-4 w-28" />
          <div className="mt-2 divide-y divide-line">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 py-3.5">
                <Bone className="h-9 w-9 shrink-0" />
                <Bone className="h-3.5 w-24 flex-1 rounded" />
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
