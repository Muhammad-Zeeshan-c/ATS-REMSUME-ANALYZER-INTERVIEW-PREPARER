export const SkeletonBlock = ({ className = '' }) => (
  <div className={`animate-pulse bg-slate-200 rounded-lg ${className}`} />
);

export const AnalysisSkeleton = () => (
  <div className="space-y-6 animate-fade-in">
    <div className="card p-6">
      <div className="flex items-center gap-4 mb-6">
        <SkeletonBlock className="w-32 h-32 rounded-full" />
        <div className="flex-1 space-y-3">
          <SkeletonBlock className="h-5 w-40" />
          <SkeletonBlock className="h-3 w-full" />
          <SkeletonBlock className="h-3 w-full" />
          <SkeletonBlock className="h-3 w-3/4" />
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="card p-4 space-y-3">
          <SkeletonBlock className="h-4 w-32" />
          <SkeletonBlock className="h-2.5 w-full" />
          <SkeletonBlock className="h-4 w-16" />
        </div>
      ))}
    </div>
    <div className="card p-6 space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border-l-4 border-slate-200 pl-4 space-y-2">
          <SkeletonBlock className="h-4 w-48" />
          <SkeletonBlock className="h-3 w-full" />
          <SkeletonBlock className="h-3 w-5/6" />
        </div>
      ))}
    </div>
  </div>
);
