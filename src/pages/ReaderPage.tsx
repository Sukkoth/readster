import { Link } from "react-router-dom";
import { Reader } from "../components/readster/Reader";

export function ReaderPage() {
  return (
    <div className="h-screen bg-background text-foreground selection:bg-primary/10 font-sans antialiased relative overflow-hidden flex flex-col">
        {/* Modern Dot Pattern Background */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#ffffff15_1px,transparent_1px)]"></div>
        
        <div className="container mx-auto px-4 py-6 flex-1 flex flex-col min-h-0">
            <header className="flex-none flex items-center justify-between mb-8 pt-2">
                <Link to="/" className="flex items-center gap-3 group cursor-pointer transition-opacity hover:opacity-80">
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="h-10 w-10 flex items-center justify-center">
                            <img src="/readster.ico" alt="Readster Icon" className="w-10 h-10" />
                        </div>
                        <span className="font-bold text-2xl tracking-tighter transition-all group-hover:text-primary">Readster</span>
                    </div>
                </Link>
            </header>
            
            <main className="flex-1 flex flex-col min-h-0 relative">
                <Reader />
            </main>
        </div>
    </div>
  );
}

export default ReaderPage;
