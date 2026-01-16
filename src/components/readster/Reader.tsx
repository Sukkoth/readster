import { useState, useEffect, useRef } from "react";
import { WordDisplay } from "./WordDisplay";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
    IconPlayerPlay, 
    IconPlayerPause, 
    IconReload, 
    IconArrowLeft, 
    IconPlayerTrackNext, 
    IconPlayerTrackPrev,
    IconSettings
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const FONT_SIZES = {
    "Small": "text-4xl",
    "Medium": "text-6xl",
    "Large": "text-8xl",
    "Extra Large": "text-9xl"
};

const SPOT_COLORS = {
    "Red": "text-red-500",
    "Blue": "text-blue-500",
    "Green": "text-green-500",
    "Yellow": "text-yellow-500",
    "Purple": "text-purple-500"
};

export function Reader() {
  const [inputText, setInputText] = useState("");
  const [words, setWords] = useState<string[]>([]);
  const [isReadMode, setIsReadMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Settings
  const [wpm, setWpm] = useState(300);
  const [chunkSize, setChunkSize] = useState(1);
  const [fontSize, setFontSize] = useState("text-6xl");
  const [spotColor, setSpotColor] = useState("text-red-500");
  const [showSettings, setShowSettings] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  // WPM to Milliseconds conversion
  const intervalMs = (60000 / wpm) * chunkSize;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettings(false);
      }
    };
    if (showSettings) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSettings]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    if (isPlaying && isReadMode && currentIndex < words.length) {
      timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + chunkSize);
      }, intervalMs);
    } else if (currentIndex >= words.length) {
      setIsPlaying(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPlaying, isReadMode, currentIndex, words.length, intervalMs, chunkSize]);

  const handleStart = () => {
    if (!inputText.trim()) return;
    const splitWords = inputText.trim().split(/\s+/);
    setWords(splitWords);
    setCurrentIndex(0);
    setIsReadMode(true);
    // Don't auto-start, let user settle
    setIsPlaying(false);
  };

  const handleStop = () => {
    setIsReadMode(false);
    setIsPlaying(false);
    setCurrentIndex(0);
  };

  const handleRewind = () => {
      setCurrentIndex(prev => Math.max(0, prev - 10));
  };

  const handleForward = () => {
      setCurrentIndex(prev => Math.min(words.length - 1, prev + 10));
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
      if (e.code === 'Space') {
          e.preventDefault();
          setIsPlaying(prev => !prev);
      } else if (e.code === 'ArrowLeft') {
          handleRewind();
      } else if (e.code === 'ArrowRight') {
          handleForward();
      }
  };

  useEffect(() => {
      if (isReadMode) {
          containerRef.current?.focus();
      }
  }, [isReadMode]);

  const currentChunk = words.slice(currentIndex, currentIndex + chunkSize).join(" ");
  const progressPercent = Math.min(100, (currentIndex / words.length) * 100);

  if (isReadMode) {
    return (
      <div 
        ref={containerRef}
        className="flex flex-col items-center justify-center min-h-[60vh] outline-none animate-in fade-in duration-500 ease-out" 
        onKeyDown={onKeyDown}
        tabIndex={0}
      >
        <div className="w-full max-w-5xl mx-auto space-y-12">
            {/* Header / Top Controls */}
           <div className="flex justify-between items-start text-muted-foreground/60 transition-colors px-4">
               <div className="flex flex-col gap-2">
                    <Button variant="ghost" size="sm" onClick={handleStop} className="gap-2 -ml-2 rounded-none hover:bg-secondary/80 self-start">
                        <IconArrowLeft size={18} /> Back
                    </Button>
                    <div className="flex flex-col gap-0.5 mt-2">
                        <span className="text-sm font-medium tracking-wide">
                             <span className="text-foreground">{currentIndex}</span> / {words.length} <span className="text-xs">words</span>
                        </span>
                        <div className="h-1 w-32 bg-secondary rounded-none overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${progressPercent}%` }} />
                        </div>
                    </div>
               </div>

               <div className="flex flex-col items-end gap-2 relative">
                   <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => setShowSettings(!showSettings)}
                        className={cn("rounded-none transition-all", showSettings && "bg-secondary text-foreground")}
                    >
                       <IconSettings size={20} />
                   </Button>
                   
                   {/* Inline Settings Panel */}
                   {showSettings && (
                       <div 
                        ref={settingsRef}
                        className="absolute top-12 right-0 z-50 p-6 bg-card/95 backdrop-blur-xl border border-border mt-2 w-80 shadow-2xl space-y-6 animate-in slide-in-from-top-2 duration-200"
                       >
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Font Size</label>
                                    <Select value={fontSize} onValueChange={(val) => val && setFontSize(val)}>
                                        <SelectTrigger className="rounded-none w-full">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(FONT_SIZES).map(([label, cls]) => (
                                                <SelectItem key={cls} value={cls}>{label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Spot Color</label>
                                    <Select value={spotColor} onValueChange={(val) => val && setSpotColor(val)}>
                                        <SelectTrigger className="rounded-none w-full">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(SPOT_COLORS).map(([label, cls]) => (
                                                <SelectItem key={cls} value={cls}>
                                                    <span className="flex items-center gap-2">
                                                        <div className={cn("w-3 h-3 rounded-none", cls.replace("text-", "bg-"))} />
                                                        {label}
                                                    </span>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Chunk Size ({chunkSize})</label>
                                    <Slider 
                                        value={[chunkSize]} 
                                        min={1} 
                                        max={5} 
                                        step={1} 
                                        onValueChange={(val) => {
                                            const value = Array.isArray(val) ? val[0] : val;
                                            setChunkSize(value);
                                        }} 
                                        className="py-2"
                                    />
                                </div>
                            </div>
                       </div>
                   )}
               </div>
           </div>

           {/* Word Display with Context */}
           <div className="py-12 relative flex flex-col items-center justify-center min-h-[400px]">
               {!isPlaying && currentIndex < words.length && (
                   <div className="absolute top-0 w-full max-w-2xl px-8 text-center animate-in fade-in slide-in-from-bottom-2 duration-500">
                      <p className="text-lg leading-relaxed text-muted-foreground/40 font-light select-none italic">
                        {words.slice(Math.max(0, currentIndex - 20), currentIndex).join(" ")}
                      </p>
                   </div>
               )}

               <div className="relative w-full">
                {currentIndex < words.length ? (
                    <WordDisplay 
                            word={currentChunk} 
                            fontSize={fontSize}
                            spotColor={spotColor}
                        />
                ) : (
                    <div className="flex flex-col items-center gap-6 animate-in zoom-in-95 duration-300">
                        <span className="text-3xl font-light text-muted-foreground tracking-tight">Finished</span>
                            <Button 
                                variant="outline" 
                                size="lg"
                                onClick={() => setCurrentIndex(0)}
                                className="rounded-none px-8 border-primary/20 hover:bg-primary/5 hover:text-primary transition-all"
                            >
                                <IconReload className="mr-2 h-4 w-4" /> Restart
                            </Button>
                    </div>
                )}
               </div>

               {!isPlaying && currentIndex < words.length && (
                   <div className="absolute bottom-0 w-full max-w-2xl px-8 text-center animate-in fade-in slide-in-from-top-2 duration-500">
                      <p className="text-lg leading-relaxed text-muted-foreground/40 font-light select-none italic">
                        {words.slice(currentIndex + chunkSize, currentIndex + chunkSize + 20).join(" ")}
                      </p>
                   </div>
               )}
           </div>

           {/* Bottom Controls */}
            <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto w-full px-8">
                
                {/* WPM Slider */}
                 <div className="w-full space-y-3">
                    <div className="flex justify-between text-xs uppercase tracking-widest text-muted-foreground font-medium">
                        <span>Speed</span>
                        <span>{wpm} WPM</span>
                    </div>
                    <Slider 
                        value={[wpm]} 
                        min={100} 
                        max={1000} 
                        step={10} 
                        onValueChange={(val) => {
                             const value = Array.isArray(val) ? val[0] : val;
                             setWpm(value);
                        }}
                        className="cursor-pointer"
                    />
                </div>

                {/* Progress Scrubber */}
                <div className="w-full space-y-3">
                     <div className="flex justify-between text-xs uppercase tracking-widest text-muted-foreground font-medium">
                        <span>Progress</span>
                        <span>{Math.round(progressPercent)}%</span>
                    </div>
                    <Slider 
                        value={[currentIndex]} 
                        min={0} 
                        max={words.length - 1} 
                        step={1} 
                        onValueChange={(val) => {
                            const value = Array.isArray(val) ? val[0] : val;
                            setCurrentIndex(value);
                            setIsPlaying(false); // Pause when scrubbing
                        }}
                    />
                </div>

                {/* Playback Controls */}
                <div className="flex items-center gap-6 pt-4">
                    <Button variant="ghost" size="icon" className="rounded-none h-12 w-12 hover:bg-secondary/50" onClick={handleRewind}>
                        <IconPlayerTrackPrev size={24} stroke={1.5} />
                    </Button>

                    <Button 
                        size="lg" 
                        variant="outline"
                        className="h-20 w-20 rounded-none p-0 border-2 border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all active:scale-95"
                        onClick={() => setIsPlaying(!isPlaying)}
                    >
                        {isPlaying ? (
                            <IconPlayerPause className="h-8 w-8 fill-current" />
                        ) : (
                            <IconPlayerPlay className="h-8 w-8 ml-1 fill-current" />
                        )}
                    </Button>

                    <Button variant="ghost" size="icon" className="rounded-none h-12 w-12 hover:bg-secondary/50" onClick={handleForward}>
                        <IconPlayerTrackNext size={24} stroke={1.5} />
                    </Button>
                </div>
                
                <p className="text-center text-[10px] text-muted-foreground/30 font-medium tracking-widest uppercase">
                    Space to Play • Arrows to Seek
                </p>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center animate-in slide-in-from-bottom-4 duration-700 ease-out pb-8">
      <Card className="flex flex-col w-full max-w-xl max-h-full border-border/40 shadow-sm bg-card/50 backdrop-blur-xl"> 
        <CardHeader className="pb-2 flex-none">
          <CardTitle className="text-3xl font-semibold tracking-tighter">
             Paste your text
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            We'll guide your eyes word by word for rapid reading.
          </p>
        </CardHeader>
        <CardContent className="flex-1 min-h-0 pt-4 px-0 pb-0 overflow-hidden flex flex-col">
          <Textarea
            placeholder="Paste your text here to begin..."
            className="flex-1 w-full h-full resize-none text-lg p-6 bg-transparent border-none focus-visible:ring-0 placeholder:text-muted-foreground/40 leading-relaxed font-light overflow-y-auto"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <div className="h-px w-full bg-gradient-to-r from-transparent via-border/60 to-transparent shrink-0" />
        </CardContent>
        <CardFooter className="flex-none flex justify-end py-4 px-6">
          <Button 
            size="lg" 
            onClick={handleStart} 
            disabled={!inputText.trim()}
            className="rounded-none px-8 font-medium transition-all hover:ring-2 hover:ring-primary/20 hover:ring-offset-2 hover:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start Reading
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
