"use client";

import { motion } from "framer-motion";
import { Card } from "./Card";
import { X } from "lucide-react";

export function ExerciseSwap({
    alternatives,
    onSelect,
    onClose
}: {
    alternatives: string[];
    onSelect: (name: string) => void;
    onClose: () => void;
}) {
  return (
    <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed inset-0 z-50 flex items-end justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <Card className="w-full max-w-md pb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Substituir Exercício</h2>
          <button onClick={onClose} className="p-2"><X size={24} /></button>
        </div>
        <div className="space-y-3">
          {alternatives.map((alt, i) => (
            <button
              key={i}
              onClick={() => onSelect(alt)}
              className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-left hover:border-gold-500/50 transition-colors"
            >
              <p className="font-medium">{alt}</p>
              <p className="text-xs text-slate-500 mt-1 uppercase">Biomecanicamente similar</p>
            </button>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
