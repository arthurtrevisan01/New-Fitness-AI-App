"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  glass?: boolean;
}

export function Card({ children, className, glass = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-6 transition-all",
        glass ? "glass-card" : "bg-obsidian-card border border-white/5",
        className
      )}
    >
      {children}
    </div>
  );
}
