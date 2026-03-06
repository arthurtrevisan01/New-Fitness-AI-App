"use client";

import { useEffect, useState } from "react";
import { ExerciseCard, Exercise } from "@/components/ExerciseCard";
import { Timer } from "@/components/Timer";
import { Button } from "@/components/Button";
import { ExerciseSwap } from "@/components/ExerciseSwap";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";

export default function WorkoutPage() {
  const [workout, setWorkout] = useState<{ workoutName: string; exercises: Exercise[] } | null>(null);
  const [activeTimer, setActiveTimer] = useState(false);
  const [restTime, setRestTime] = useState(90);
  const [swappingExercise, setSwappingExercise] = useState<string | null>(null);
  const [logs, setLogs] = useState<{ exercise: string; weight: number; reps: number; time: string }[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadWorkout = () => {
        const saved = localStorage.getItem("current_workout");
        if (saved) {
            setWorkout(JSON.parse(saved));
        }
    };
    loadWorkout();
  }, []);

  const handleSetComplete = (exerciseId: string, setIndex: number, weight: number, reps: number) => {
    const exercise = workout?.exercises.find(e => e.id === exerciseId);
    if (exercise) {
        setLogs(prev => [...prev, { exercise: exercise.name, weight, reps, time: new Date().toISOString() }]);
        setRestTime(exercise.rest || 90);
        setActiveTimer(true);
    }
  };

  const handleSwap = (name: string) => {
    if (!workout || !swappingExercise) return;
    const newExercises = workout.exercises.map(ex =>
        ex.id === swappingExercise ? { ...ex, name } : ex
    );
    setWorkout({ ...workout, exercises: newExercises });
    setSwappingExercise(null);
  };

  const finishWorkout = () => {
    localStorage.setItem("workout_logs", JSON.stringify(logs));
    router.push("/review");
  };

  if (!workout) return <div className="p-10 text-center">Carregando...</div>;

  return (
    <div className="p-6 pb-24">
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold uppercase italic tracking-tighter">{workout.workoutName}</h1>
        <div className="px-3 py-1 bg-gold-500/10 border border-gold-500/20 rounded-full text-[10px] text-gold-500 font-bold uppercase">
            Em Progresso
        </div>
      </header>

      <div className="space-y-4">
        {workout.exercises.map((ex) => (
          <ExerciseCard
            key={ex.id}
            exercise={ex}
            onCompleteSet={handleSetComplete}
            onSwap={(id) => setSwappingExercise(id)}
          />
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent pointer-events-none">
        <div className="max-w-md mx-auto pointer-events-auto">
            <Button onClick={finishWorkout}>FINALIZAR TREINO</Button>
        </div>
      </div>

      <AnimatePresence>
        {activeTimer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
            <div className="text-center">
                <Timer duration={restTime} onComplete={() => setActiveTimer(false)} />
                <button
                    onClick={() => setActiveTimer(false)}
                    className="mt-4 text-slate-500 text-xs font-bold uppercase tracking-widest"
                >
                    Pular Descanso
                </button>
            </div>
          </div>
        )}

        {swappingExercise && (
            <ExerciseSwap
                alternatives={workout.exercises.find(e => e.id === swappingExercise)?.alternatives || []}
                onSelect={handleSwap}
                onClose={() => setSwappingExercise(null)}
            />
        )}
      </AnimatePresence>
    </div>
  );
}
