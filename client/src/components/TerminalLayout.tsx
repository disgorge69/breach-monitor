import { Terminal } from "lucide-react";
import React from "react";

export function TerminalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-primary font-mono scanlines crt flex flex-col selection:bg-primary selection:text-black">
      {/* Top Header Bar */}
      <header className="border-b border-border bg-card/50 p-4 sticky top-0 z-40 backdrop-blur-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Terminal className="w-6 h-6 text-primary animate-pulse" />
          <h1 className="text-xl md:text-2xl font-bold tracking-widest text-glow flex items-center">
            GLOBAL_BREACH_NET<span className="animate-pulse opacity-70 ml-1">_</span>
          </h1>
        </div>
        <div className="hidden md:flex gap-6 text-xs text-primary/70">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_currentColor]"></span>
            SYSTEM: ONLINE
          </span>
          <span>SEC_LEVEL: ALPHA</span>
          <span>UPTIME: {Math.floor(performance.now() / 1000)}s</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 max-w-[1600px] mx-auto w-full">
        {children}
      </main>

      {/* Footer Status Bar */}
      <footer className="border-t border-border bg-card/50 p-2 text-xs flex justify-between items-center text-primary/50">
        <span>© 2025 DATA.SEC.ORG // ALL TRAFFIC MONITORED</span>
        <span>CONNECTION: SECURE [TSL v1.3]</span>
      </footer>
    </div>
  );
}
