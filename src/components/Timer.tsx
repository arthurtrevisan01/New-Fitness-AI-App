"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function Timer({ duration, onComplete }: { duration: number; onComplete?: () => void }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const progress = (timeLeft / duration) * 100;

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete?.();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg className="absolute w-full h-full -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="60"
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            className="text-white/10"
          />
          <motion.circle
            cx="64"
            cy="64"
            r="60"
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            strokeDasharray="377"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: 377 - (377 * progress) / 100 }}
            className="text-gold-500"
          />
        </svg>
        <span className="text-3xl font-bold font-mono">
          {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
        </span>
      </div>
      <p className="mt-2 text-slate-400 text-sm uppercase tracking-widest">Descanso</p>
    </div>
  );
}
