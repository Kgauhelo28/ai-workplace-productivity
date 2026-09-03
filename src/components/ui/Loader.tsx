interface LoaderProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Loader({ label = 'AI is thinking...', size = 'md' }: LoaderProps) {
  const dotSize = size === 'sm' ? 'w-1.5 h-1.5' : size === 'lg' ? 'w-3 h-3' : 'w-2 h-2';
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm';

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      <div className="flex items-center gap-1.5">
        <span className={`${dotSize} bg-primary-500 rounded-full animate-bounce-dot`} />
        <span className={`${dotSize} bg-primary-500 rounded-full animate-bounce-dot`} style={{ animationDelay: '0.16s' }} />
        <span className={`${dotSize} bg-primary-500 rounded-full animate-bounce-dot`} style={{ animationDelay: '0.32s' }} />
      </div>
      <p className={`${textSize} text-slate-500 font-medium animate-pulse-soft`}>{label}</p>
    </div>
  );
}

export function ShimmerLine({ className = '' }: { className?: string }) {
  return (
    <div
      className={`bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 bg-[length:1000px_100%] animate-shimmer rounded ${className}`}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="space-y-4 p-5">
      <ShimmerLine className="h-4 w-1/3" />
      <ShimmerLine className="h-3 w-full" />
      <ShimmerLine className="h-3 w-5/6" />
      <ShimmerLine className="h-3 w-4/6" />
      <div className="space-y-2 pt-2">
        <ShimmerLine className="h-3 w-full" />
        <ShimmerLine className="h-3 w-3/4" />
      </div>
    </div>
  );
}
