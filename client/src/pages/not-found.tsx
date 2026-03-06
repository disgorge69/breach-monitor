import { TerminalLayout } from "@/components/TerminalLayout";
import { ShieldBan } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <TerminalLayout>
      <div className="w-full h-[60vh] flex flex-col items-center justify-center border border-border bg-card/30">
        <ShieldBan className="w-24 h-24 text-primary/50 mb-6" />
        <h1 className="text-4xl font-bold tracking-widest text-glow mb-4">
          404_NOT_FOUND
        </h1>
        <p className="text-primary/70 mb-8 font-mono max-w-md text-center">
          The requested system node does not exist or has been redacted from the global registry.
        </p>
        <Link href="/" className="px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-black font-bold tracking-widest transition-colors box-glow">
          RETURN_TO_ROOT
        </Link>
      </div>
    </TerminalLayout>
  );
}
