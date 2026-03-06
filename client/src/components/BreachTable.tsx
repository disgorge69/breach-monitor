import React from "react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Search } from "lucide-react";
import { useBreaches } from "@/hooks/use-breaches";
import { SeverityBadge } from "./SeverityBadge";

export function BreachTable() {
  const { data: breaches, isLoading, isError, error } = useBreaches();
  const [searchTerm, setSearchTerm] = React.useState("");

  if (isLoading) {
    return (
      <div className="w-full h-64 flex flex-col items-center justify-center border border-border bg-card/20 box-glow">
        <div className="text-primary text-xl animate-pulse flex items-center gap-3">
          <Database className="w-6 h-6" />
          ESTABLISHING_DB_LINK...
        </div>
        <div className="w-64 h-1 bg-border mt-4 overflow-hidden relative">
          <div className="absolute top-0 bottom-0 left-0 bg-primary animate-[pulse_1s_ease-in-out_infinite] w-1/3"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full p-8 border border-destructive bg-destructive/10 text-destructive flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-2">ERR_FATAL_EXCEPTION</h2>
        <p className="font-mono text-sm opacity-80">{error?.message || "Connection refused."}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-6 px-4 py-2 border border-destructive hover:bg-destructive hover:text-black transition-colors"
        >
          REBOOT_SYSTEM
        </button>
      </div>
    );
  }

  const filteredBreaches = breaches?.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.domain.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => new Date(b.breachDate).getTime() - new Date(a.breachDate).getTime());

  return (
    <div className="space-y-4">
      {/* Table Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card border border-border p-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-primary/50" />
          <input 
            type="text"
            placeholder="QUERY_DB (entity, domain)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-background border border-border pl-10 pr-4 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 text-sm placeholder:text-primary/30 transition-all"
          />
        </div>
        <div className="text-xs text-primary/60 border border-border px-3 py-1 bg-background flex items-center gap-2">
          <span>MATCHES:</span>
          <span className="text-primary font-bold text-glow-sm">{filteredBreaches?.length || 0}</span>
        </div>
      </div>

      {/* Main Table */}
      <div className="w-full overflow-x-auto border border-border bg-card/30 box-glow backdrop-blur-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-primary/50 bg-background/80 text-primary/80 text-xs tracking-wider">
              <th className="p-4 font-normal">ENTITY/DOMAIN</th>
              <th className="p-4 font-normal">BREACH_DATE</th>
              <th className="p-4 font-normal">RECORDS_LOST</th>
              <th className="p-4 font-normal">SEVERITY</th>
              <th className="p-4 font-normal">DESC_SNIPPET</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <AnimatePresence>
              {filteredBreaches?.length === 0 ? (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <td colSpan={5} className="p-8 text-center text-primary/40 italic">
                    NO_RECORDS_MATCH_QUERY.
                  </td>
                </motion.tr>
              ) : (
                filteredBreaches?.map((breach, idx) => (
                  <motion.tr 
                    key={breach.id}
                    initial={{ opacity: 0, x: -20, backgroundColor: "hsl(var(--primary) / 0.2)" }}
                    animate={{ opacity: 1, x: 0, backgroundColor: "transparent" }}
                    transition={{ delay: Math.min(idx * 0.05, 1), duration: 0.3 }}
                    className="border-b border-border/50 hover:bg-primary/5 transition-colors group"
                  >
                    <td className="p-4">
                      <div className="font-bold text-primary group-hover:text-glow-sm transition-all">{breach.name}</div>
                      <div className="text-xs text-primary/50 opacity-70 mt-0.5">{breach.domain}</div>
                    </td>
                    <td className="p-4 text-primary/80">
                      {format(new Date(breach.breachDate), "yyyy-MM-dd")}
                    </td>
                    <td className="p-4 font-bold tracking-wider">
                      {breach.recordCount.toLocaleString()}
                    </td>
                    <td className="p-4">
                      <SeverityBadge severity={breach.severity} />
                    </td>
                    <td className="p-4 text-xs text-primary/60 max-w-xs truncate" title={breach.description}>
                      {breach.description.length > 50 
                        ? breach.description.substring(0, 50) + "..." 
                        : breach.description}
                    </td>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
