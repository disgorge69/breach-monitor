import React from "react";
import { TerminalLayout } from "@/components/TerminalLayout";
import { BreachTable } from "@/components/BreachTable";
import { CreateBreachDialog } from "@/components/CreateBreachDialog";
import { ShieldAlert } from "lucide-react";

export default function Home() {
  return (
    <TerminalLayout>
      <div className="space-y-6 animate-in fade-in duration-700">
        
        {/* Top Info Panel */}
        <section className="border border-border bg-card p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
            <ShieldAlert className="w-64 h-64 text-primary" />
          </div>
          
          <div className="space-y-2 z-10">
            <h2 className="text-2xl font-bold text-glow tracking-widest flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-primary" />
              LIVE_THREAT_MONITOR
            </h2>
            <p className="text-sm text-primary/70 max-w-2xl leading-relaxed">
              Real-time aggregation of compromised corporate infrastructure.
              System polls remote DB every 3000ms. Inject new records securely via terminal command below.
            </p>
          </div>

          <div className="z-10 shrink-0">
            <CreateBreachDialog />
          </div>
        </section>

        {/* Data Matrix */}
        <section>
          <div className="text-xs text-primary/50 mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-primary animate-pulse inline-block"></span>
            DATA_STREAM_ACTIVE
          </div>
          <BreachTable />
        </section>

      </div>
    </TerminalLayout>
  );
}
