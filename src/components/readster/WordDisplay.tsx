import { cn } from '@/lib/utils';

interface WordDisplayProps {
  word: string;
  className?: string;
}

export function WordDisplay({ word, className }: WordDisplayProps) {
  // Simple heuristic for Optimal Recognition Point (ORP)
  // Usually around the 35% mark or center-ish depending on length
  // 1 letter -> idx 0
  // 4 letters -> idx 1
  // 5 letters -> idx 2
  // We'll use a simple Math.ceil(length / 4) or similar, but often just slightly left of center is good.
  // Standard RSVP often fixes the pivot. Let's try 30-40% mark.
  
  const getPivotIndex = (w: string) => {
    const len = w.length;
    if (len === 1) return 0;
    // 01234 -> len 5 -> pivot 2?
    // 0123456789 -> len 10 -> pivot 3?
    let pivot = Math.floor((len - 1) / 4); // simplistic start
    if (len > 1 && pivot === 0) pivot = 1; // ensure we don't pick first letter for longer words unless necessary
    
    // A more robust algorithm used by some readers:
    if (len < 2) return 0;
    if (len < 6) return 1;
    if (len < 10) return 2;
    if (len < 14) return 3;
    return 4;
  };

  const pivotIndex = getPivotIndex(word);
  const left = word.slice(0, pivotIndex);
  const pivotChar = word[pivotIndex];
  const right = word.slice(pivotIndex + 1);

  return (
    <div className={cn("flex items-center justify-center font-mono text-6xl font-medium tracking-tight h-32 select-none", className)}>
      <div className="flex items-baseline w-full">
        {/* Left side - aligned to the right of this container */}
        <div className="flex-1 text-right text-foreground/80">
          {left}
        </div>
        
        {/* Pivot character - centered, highlighted */}
        <div className="text-red-500 font-bold mx-[1px] relative">
           {/* Top and bottom markers for extra fixation aid */}
           <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-[2px] h-3 bg-red-200/50 rounded-full"></div>
           {pivotChar}
           <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[2px] h-3 bg-red-200/50 rounded-full"></div>
        </div>

        {/* Right side - aligned to the left of this container */}
        <div className="flex-1 text-left text-foreground/80">
          {right}
        </div>
      </div>
    </div>
  );
}
