"use client";

import { Check, Repeat, Zap } from "lucide-react";
import { Card } from "./Card";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: number;
  notes: string;
  alternatives: string[];
}

export function ExerciseCard({
    exercise,
    onCompleteSet,
    onSwap
}: {
    exercise: Exercise;
    onCompleteSet: (exerciseId: string, setIndex: number, weight: number, reps: number) => void;
    onSwap: (exerciseId: string) => void;
}) {
  const [completedSets, setCompletedSets] = useState<boolean[]>(new Array(exercise.sets).fill(false));
  const [weights, setWeights] = useState<string[]>(new Array(exercise.sets).fill(""));
  const [reps, setReps] = useState<string[]>(new Array(exercise.sets).fill(exercise.reps.split("-")[0]));

  const toggleSet = (index: number) => {
    const newCompleted = [...completedSets];
    newCompleted[index] = !newCompleted[index];
    setCompletedSets(newCompleted);

    if (newCompleted[index]) {
        onCompleteSet(exercise.id, index, parseFloat(weights[index]) || 0, parseInt(reps[index]) || 0);
    }
  };

  return (
    <Card className="mb-4 overflow-hidden border-l-4 border-l-gold-500">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white">{exercise.name}</h3>
          <p className="text-xs text-gold-500 flex items-center gap-1 mt-1 uppercase tracking-tighter">
            <Zap size={12} /> {exercise.notes}
          </p>
        </div>
        <button
            onClick={() => onSwap(exercise.id)}
            className="p-2 bg-white/5 rounded-full text-slate-400 active:text-gold-500"
        >
          <Repeat size={18} />
        </button>
      </div>

      <div className="space-y-3">
        {completedSets.map((done, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-slate-500">
              {i + 1}
            </div>

            <div className="flex-1 flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="number"
                  placeholder="kg"
                  value={weights[i]}
                  onChange={(e) => {
                    const newWeights = [...weights];
                    newWeights[i] = e.target.value;
                    setWeights(newWeights);
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold-500/50"
                />
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  placeholder="reps"
                  value={reps[i]}
                  onChange={(e) => {
                    const newReps = [...reps];
                    newReps[i] = e.target.value;
                    setReps(newReps);
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold-500/50"
                />
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleSet(i)}
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                done ? "bg-gold-500 text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]" : "bg-white/5 text-slate-500"
              )}
            >
              <Check size={20} strokeWidth={3} />
            </motion.button>
          </div>
        ))}
      </div>
    </Card>
  );
}
