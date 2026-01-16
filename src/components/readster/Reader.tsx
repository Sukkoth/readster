import { useState, useEffect, useRef } from "react";
import { WordDisplay } from "./WordDisplay";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { IconPlayerPlay, IconPlayerPause, IconReload, IconArrowLeft } from "@tabler/icons-react";

export function Reader() {
  const [inputText, setInputText] = useState("");
  const [words, setWords] = useState<string[]>([]);
  const [isReadMode, setIsReadMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wpm] = useState(300);

  const containerRef = useRef<HTMLDivElement>(null);

  // WPM to Milliseconds conversion
  // 300 wpm = 5 words per second = 200ms per word
  const intervalMs = 60000 / wpm;

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    if (isPlaying && isReadMode && currentIndex < words.length) {
      timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, intervalMs);
    } else if (currentIndex >= words.length) {
      setIsPlaying(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPlaying, isReadMode, currentIndex, words.length, intervalMs]);

  const handleStart = () => {
    if (!inputText.trim()) return;
    // Simple split by whitespace
    const splitWords = inputText.trim().split(/\s+/);
    setWords(splitWords);
    setCurrentIndex(0);
    setIsReadMode(true);
    setIsPlaying(true);
  };

  const handleStop = () => {
    setIsReadMode(false);
    setIsPlaying(false);
    setCurrentIndex(0);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
      if (e.code === 'Space') {
          e.preventDefault();
          setIsPlaying(prev => !prev);
      }
  };

  useEffect(() => {
      if (isReadMode) {
          containerRef.current?.focus();
      }
  }, [isReadMode]);

  if (isReadMode) {
    return (
      <div 
        ref={containerRef}
        className="flex flex-col items-center justify-center min-h-[60vh] outline-none animate-in fade-in duration-500 ease-out" 
        onKeyDown={onKeyDown}
        tabIndex={0}
      >
        <div className="w-full max-w-4xl mx-auto space-y-24">
           {/* Top bar */}
           <div className="flex justify-between items-center text-muted-foreground/60 hover:text-foreground transition-colors px-4">
               <Button variant="ghost" size="sm" onClick={handleStop} className="gap-2 -ml-2 rounded-none hover:bg-secondary/80">
                   <IconArrowLeft size={18} /> Back
               </Button>
               <div className="flex gap-6 text-sm font-medium tracking-wide">
                   <span className="tabular-nums">{currentIndex + 1} <span className="text-muted-foreground/40">/</span> {words.length}</span>
                   <span>{wpm} <span className="text-xs uppercase tracking-wider text-muted-foreground/60">WPM</span></span>
               </div>
           </div>

           {/* Word Display */}
           <div className="py-20 relative flex justify-center min-h-[200px] items-center">
               {currentIndex < words.length ? (
                   <WordDisplay word={words[currentIndex]} />
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

           {/* Controls */}
            <div className="flex flex-col items-center gap-6">
                <Button 
                    size="lg" 
                    variant="outline"
                    className="h-16 w-16 rounded-none p-0 border-2 border-primary/10 hover:border-primary/30 hover:bg-primary/5 transition-all hover:scale-105 active:scale-95"
                    onClick={() => setIsPlaying(!isPlaying)}
                >
                    {isPlaying ? (
                        <IconPlayerPause className="h-6 w-6 fill-current" />
                    ) : (
                        <IconPlayerPlay className="h-6 w-6 ml-1 fill-current" />
                    )}
                </Button>
                
                <p className="text-center text-xs text-muted-foreground/40 font-medium tracking-widest uppercase">
                    Space to {isPlaying ? 'pause' : 'play'}
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
          {/* subtle separator line since we removed border from textarea */}
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
