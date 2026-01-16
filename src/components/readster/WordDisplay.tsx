import { cn } from '@/lib/utils';

interface WordDisplayProps {
  word: string; // This can now be a "chunk" of words
  className?: string;
  spotColor?: string; // e.g., "text-red-500", "text-blue-500"
  fontSize?: string; // e.g., "text-4xl", "text-6xl"
}

export function WordDisplay({ word, className, spotColor = "text-red-500", fontSize = "text-6xl" }: WordDisplayProps) {
  // Logic for finding the pivot in a chunk of text
  // If it's multiple words, we want to balance the length.
  // But standard ORP is usually per word. For chunks, 
  // we usually center the whole block or find the "middle word" and its pivot.
  // Let's try to find the "middle" character position of the entire string to pivot around,
  // preventing the text from jumping too much left/right.

  const getPivotIndex = (w: string) => {
    const len = w.length;
    if (len === 1) return 0;
    
    // For single words, we use the standard ORP logic
    if (!w.includes(' ')) {
        if (len < 2) return 0;
        if (len < 6) return 1;
        if (len < 10) return 2;
        if (len < 14) return 3;
        return 4;
    }

    // For multi-word chunks, we try to center roughly
    return Math.floor((len - 1) / 2);
  };

  const pivotIndex = getPivotIndex(word);
  const left = word.slice(0, pivotIndex);
  const pivotChar = word[pivotIndex];
  const right = word.slice(pivotIndex + 1);
  
  // Extract color class for bg (assuming format "text-color-500")
  // We need a matching bg color for the markers. 
  // Quick hack: replace "text-" with "bg-"
  const bgColorClass = spotColor.replace("text-", "bg-");

  return (
    <div className={cn("w-full flex items-center justify-center font-mono font-medium tracking-tight h-32 select-none", fontSize, className)}>
      <div className="flex items-baseline w-full">
        {/* Left side - aligned to the right of this container */}
        <div className="flex-1 text-right text-foreground/80 whitespace-pre">
          {left}
        </div>
        
        {/* Pivot character - centered, highlighted */}
        <div className={cn("font-bold mx-0 relative px-0.5", spotColor)}>
           {/* Top and bottom markers for extra fixation aid */}
           <div className={cn("absolute -top-4 left-1/2 -translate-x-1/2 w-[3px] h-3 rounded-none opacity-50", bgColorClass)}></div>
           {pivotChar}
           <div className={cn("absolute -bottom-4 left-1/2 -translate-x-1/2 w-[3px] h-3 rounded-none opacity-50", bgColorClass)}></div>
        </div>

        {/* Right side - aligned to the left of this container */}
        <div className="flex-1 text-left text-foreground/80 whitespace-pre">
          {right}
        </div>
      </div>
    </div>
  );
}
