import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
    Accordion, 
    AccordionContent, 
    AccordionItem, 
    AccordionTrigger 
} from "@/components/ui/accordion";
import { 
    Tabs, 
    TabsContent, 
    TabsList, 
    TabsTrigger 
} from "@/components/ui/tabs";
import { WordDisplay } from "../components/readster/WordDisplay";
import { IconPlayerPlay, IconPlayerPause, IconReload } from "@tabler/icons-react";

const TUTORIAL_TEXT = "Rapid Serial Visual Presentation, or RSVP, is a method of displaying information where words are shown one by one in the same position on the screen. This technique eliminates eye movement, allowing the brain to process text at much higher speeds. By focusing your vision on a single fixation point, you can bypass the physical limitations of traditional reading and unlock your mind's true potential for rapid information consumption.";

export function LearnSciencePage() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const words = TUTORIAL_TEXT.split(/\s+/);
    const intervalMs = 200; // 300 WPM

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout> | null = null;
        if (isPlaying && currentIndex < words.length) {
            timer = setTimeout(() => {
                setCurrentIndex((prev) => prev + 1);
            }, intervalMs);
        } else if (currentIndex >= words.length) {
            setIsPlaying(false);
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [isPlaying, currentIndex, words.length]);

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 relative overflow-x-hidden">
            {/* Background elements consistent with theme */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#ffffff15_1px,transparent_1px)]"></div>
            
            <nav className="container mx-auto px-6 py-8 flex items-center justify-between relative z-10">
                <Link to="/" className="flex items-center gap-3 group cursor-pointer transition-opacity hover:opacity-80">
                    <img src="/readster.ico" alt="Readster Icon" className="w-10 h-10" />
                    <span className="font-bold text-2xl tracking-tighter transition-all group-hover:text-primary">Readster</span>
                </Link>
                <Link to="/read">
                    <Button variant="outline" className="rounded-none border-primary/20 hover:bg-primary/5">
                        Deep Reading
                    </Button>
                </Link>
            </nav>

            <main className="container mx-auto px-6 py-12 max-w-6xl relative z-10">
                <div className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
                        The Science of <span className="text-primary italic"> RSVP</span>
                    </h1>
                    <p className="text-xl text-muted-foreground/80 font-light leading-relaxed max-w-2xl">
                        Discover why traditional reading is slow and how your brain is capable of much more.
                    </p>
                </div>

                {/* Interactive Demo Section */}
                <section className="mb-24 p-8 border border-border bg-card/30 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="flex-1 space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-[10px] uppercase tracking-widest font-bold">
                                Interactive Demo
                            </div>
                            <h2 className="text-3xl font-bold tracking-tight">Experience RSVP now</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Watch the display on the right. Notice how your eyes stay perfectly still while the information flows directly into your mind.
                            </p>
                            <div className="flex items-center gap-4 pt-4">
                                <Button 
                                    size="lg"
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    className="rounded-none px-8 font-bold gap-2"
                                >
                                    {isPlaying ? <IconPlayerPause size={18} fill="currentColor" /> : <IconPlayerPlay size={18} fill="currentColor" />}
                                    {isPlaying ? "Pause Demo" : "Start Demo"}
                                </Button>
                                <Button 
                                    variant="ghost"
                                    onClick={() => {
                                        setIsPlaying(false);
                                        setCurrentIndex(0);
                                    }}
                                    className="rounded-none text-muted-foreground hover:text-foreground"
                                >
                                    <IconReload size={18} />
                                </Button>
                            </div>
                        </div>

                        <div className="flex-[2] w-full h-80 bg-background border border-primary/10 flex items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
                            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
                            
                            {currentIndex < words.length ? (
                                <WordDisplay 
                                    word={words[currentIndex]} 
                                    fontSize="text-5xl" 
                                    spotColor="text-primary"
                                />
                            ) : (
                                <div className="text-center space-y-4 animate-in zoom-in-95 duration-300">
                                    <p className="text-xl font-medium text-muted-foreground">Demo Complete</p>
                                    <Button variant="link" onClick={() => setCurrentIndex(0)} className="text-primary p-0">Restart Experiment</Button>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                <Tabs defaultValue="theory" className="mb-24">
                    <TabsList className="bg-transparent border-b border-border w-full justify-start rounded-none h-auto p-0 gap-8">
                        <TabsTrigger value="theory" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-4 text-base font-medium">The Theory</TabsTrigger>
                        <TabsTrigger value="method" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-4 text-base font-medium">The Method</TabsTrigger>
                        <TabsTrigger value="benefits" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-4 text-base font-medium">Benefits</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="theory" className="pt-10 space-y-8 animate-in fade-in duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold">Why Traditional Reading is Slow</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Traditional reading involves <strong>saccades</strong>—rapid eye movements between fixation points. 
                                    Your eyes jump from word to word, and often back-track (regressions). 
                                    This physical movement is the primary bottleneck for speed.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold">Subvocalization</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Most people "speak" the words in their head while reading. 
                                    This limits your reading speed to the speed of your speech (~150 WPM). 
                                    RSVP forces you to process visual information faster than you can speak it.
                                </p>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="method" className="pt-10 space-y-8 animate-in fade-in duration-500">
                        <Accordion className="w-full">
                            <AccordionItem value="item-1" className="border-border">
                                <AccordionTrigger className="text-lg font-bold hover:no-underline">The Optimal Recognition Point (ORP)</AccordionTrigger>
                                <AccordionContent className="text-muted-foreground leading-relaxed">
                                    Every word has a "sweet spot" where your brain recognizes it fastest. 
                                    Readster highlights this point in green (or your chosen color) to keep your focus perfectly centered, reducing cognitive load.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2" className="border-border">
                                <AccordionTrigger className="text-lg font-bold hover:no-underline">Chunking Information</AccordionTrigger>
                                <AccordionContent className="text-muted-foreground leading-relaxed">
                                    Once you master single words, you can increase the "Chunk Size". 
                                    Processing 2 or 3 words at once further accelerates your intake, as your brain learns to recognize phrases as single units.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3" className="border-border">
                                <AccordionTrigger className="text-lg font-bold hover:no-underline">Handling Regressions</AccordionTrigger>
                                <AccordionContent className="text-muted-foreground leading-relaxed">
                                    By displaying words in the same spot, RSVP makes it impossible to "look back" at the previous word. 
                                    This forces your brain to stay present and focused, which paradoxically improves concentration.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </TabsContent>

                    <TabsContent value="benefits" className="pt-10 space-y-8 animate-in fade-in duration-500">
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                "3x faster information consumption",
                                "Reduced eye muscle fatigue",
                                "Improved focus and concentration",
                                "Better processing of complex technical text",
                                "Elimination of time-wasting regressions",
                                "Faster vocabulary acquisition"
                            ].map((benefit, i) => (
                                <li key={i} className="flex items-center gap-3 p-4 bg-secondary/30 border border-primary/5">
                                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                                    </div>
                                    <span className="font-medium">{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </TabsContent>
                </Tabs>

                <div className="p-12 bg-primary text-primary-foreground text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
                    <h2 className="text-3xl font-bold tracking-tight">Ready to break your limits?</h2>
                    <p className="text-lg text-primary-foreground/80 max-w-xl mx-auto font-light">
                        The science is clear. Your brain is a supercomputer waiting for better software. Readster is that software.
                    </p>
                    <Link to="/read">
                        <Button size="lg" className="rounded-none h-14 px-10 bg-background text-primary hover:bg-background/90 font-bold transition-all hover:scale-105 active:scale-95">
                            Start Reading Now
                        </Button>
                    </Link>
                </div>
            </main>

            <footer className="py-20 border-t border-border mt-20">
                <div className="container mx-auto px-6 text-center text-muted-foreground/40 text-sm">
                    <p>© 2026 Readster. Built for the high-performance mind.</p>
                </div>
            </footer>
        </div>
    );
}

export default LearnSciencePage;
