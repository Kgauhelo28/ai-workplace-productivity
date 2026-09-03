import { AlertTriangle } from 'lucide-react';

export function Disclaimer({ variant = 'inline' }: { variant?: 'inline' | 'banner' }) {
  if (variant === 'banner') {
    return (
      <div className="flex items-center gap-2.5 px-4 py-2.5 bg-amber-50 border border-amber-200 rounded-lg">
        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
        <p className="text-xs text-amber-800 font-medium">
          AI-generated content may require human review. Please verify all outputs before use.
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2 px-4 py-3 bg-amber-50/60 border border-amber-200/60 rounded-lg">
      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
      <p className="text-xs text-amber-700 leading-relaxed">
        AI-generated content may require human review. Please verify all outputs for accuracy and appropriateness before use.
      </p>
    </div>
  );
}
