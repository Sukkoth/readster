import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function LandingPage() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 font-sans antialiased relative overflow-hidden flex flex-col">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#ffffff15_1px,transparent_1px)]"></div>
      
      {/* Animated Gradients */}
      <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-primary/5 blur-[120px] rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-primary/5 blur-[120px] rounded-full animate-pulse-slow delay-700"></div>

      {/* Nav */}
      <nav className="container mx-auto px-6 py-8 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate("/")}>
          <div className="h-10 w-10 flex items-center justify-center">
            <img src="/readster.ico" alt="Readster Icon" className="w-10 h-10" />
          </div>
          <span className="font-bold text-2xl tracking-tighter transition-all group-hover:text-primary">Readster</span>
        </div>
        <div className="flex items-center gap-6">
          <Button variant="ghost" className="font-medium">Features</Button>
          <Button variant="ghost" className="font-medium">Pricing</Button>
          <Button 
            onClick={() => navigate("/read")}
            className="rounded-none px-6 font-semibold bg-primary hover:bg-primary/90 transition-all border-none"
          >
            Go to App
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center container mx-auto px-6 py-20 text-center relative z-10">
        <div className={mounted ? "animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out" : "opacity-0"}>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary text-primary text-[10px] uppercase tracking-[0.2em] font-bold mb-8 border border-primary/10">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            Elevate your reading speed
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 max-w-4xl leading-[1.05]">
            Read <span className="text-primary italic">faster</span> than you ever thought possible.
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground/80 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            Readster uses RSVP technology to help you consume information 3x faster without losing comprehension.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => navigate("/read")}
              className="text-base h-16 px-10 rounded-none font-bold bg-primary hover:bg-primary/90 transition-all hover:ring-4 hover:ring-primary/20 active:scale-95 shadow-xl shadow-primary/10"
            >
              Start Reading Now
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="text-base h-16 px-10 rounded-none font-semibold border-2 border-primary/20 hover:bg-primary/5 transition-all"
            >
              Learn the science
            </Button>
          </div>
        </div>

        {/* Feature Teasers */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mt-40 transition-all duration-1000 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <div className="p-8 border border-border/50 bg-card/30 backdrop-blur-md text-left group hover:border-primary/30 transition-all">
                <div className="h-12 w-12 bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-all group-hover:text-primary-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rocket"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3"/><path d="M12 15v5s3.03-.55 5-2c2.2-1.62 3-5 3-5"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-3">RSVP Technology</h3>
                <p className="text-muted-foreground leading-relaxed">Rapid Serial Visual Presentation keeps your focus fixed, eliminating regressions and eye strain.</p>
            </div>
            <div className="p-8 border border-border/50 bg-card/30 backdrop-blur-md text-left group hover:border-primary/30 transition-all">
                <div className="h-12 w-12 bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-all group-hover:text-primary-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings-2"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Pure Customization</h3>
                <p className="text-muted-foreground leading-relaxed">Adjust WPM, chunk size, font, and colors to match your cognitive load and reading style perfectly.</p>
            </div>
            <div className="p-8 border border-border/50 bg-card/30 backdrop-blur-md text-left group hover:border-primary/30 transition-all">
                <div className="h-12 w-12 bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-all group-hover:text-primary-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Distraction Free</h3>
                <p className="text-muted-foreground leading-relaxed">An immersive mode that hides all UI elements, leaving only the words that matter in front of you.</p>
            </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-border group">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 opacity-40 hover:opacity-100 transition-opacity">
            <p className="text-sm">© 2026 Readster RSVP Reader. Built for speed.</p>
            <div className="flex items-center gap-8 text-sm font-medium">
                <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                <a href="#" className="hover:text-primary transition-colors">Terms</a>
                <a href="#" className="hover:text-primary transition-colors">Github</a>
            </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
