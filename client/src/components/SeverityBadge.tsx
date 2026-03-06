import React from "react";
import { AlertTriangle, AlertCircle, Info, ShieldAlert } from "lucide-react";

interface SeverityBadgeProps {
  severity: string;
}

export function SeverityBadge({ severity }: SeverityBadgeProps) {
  const normalized = severity.toLowerCase();

  let colorClasses = "";
  let Icon = Info;
  let label = severity.toUpperCase();

  switch (normalized) {
    case "critical":
      colorClasses = "border-red-500 text-red-500 bg-red-950/40 shadow-[0_0_10px_rgba(239,68,68,0.2)]";
      Icon = ShieldAlert;
      break;
    case "high":
      colorClasses = "border-orange-500 text-orange-500 bg-orange-950/40 shadow-[0_0_10px_rgba(249,115,22,0.2)]";
      Icon = AlertTriangle;
      break;
    case "medium":
      colorClasses = "border-yellow-500 text-yellow-500 bg-yellow-950/40 shadow-[0_0_10px_rgba(234,179,8,0.2)]";
      Icon = AlertCircle;
      break;
    case "low":
    default:
      colorClasses = "border-cyan-500 text-cyan-500 bg-cyan-950/40 shadow-[0_0_10px_rgba(6,182,212,0.2)]";
      Icon = Info;
      label = "LOW";
      break;
  }

  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 border text-xs font-bold tracking-wider ${colorClasses}`}>
      <Icon className="w-3 h-3" />
      {label}
    </div>
  );
}
