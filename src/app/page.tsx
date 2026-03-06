"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Trophy, Dumbbell, Zap } from "lucide-react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const generateWorkout = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        body: JSON.stringify({
          type: "generate",
          data: {
            days: 4,
            focus: "Hypertrophy",
            level: "Advanced",
            equipment: "Full Gym",
            fatigue: "Low"
          }
        })
      });
      const workout = await response.json();
      localStorage.setItem("current_workout", JSON.stringify(workout));
      router.push("/workout");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 pt-12">
      <header className="mb-12">
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
        >
            <h1 className="text-4xl font-black uppercase tracking-tighter text-white">
                Elite <span className="text-gold-500">PWA</span>
            </h1>
            <p className="text-slate-500 mt-2 font-medium">Bem-vindo ao clube de elite, atleta.</p>
        </motion.div>
      </header>

      <div className="space-y-6">
        <Card className="border-t-2 border-t-gold-500/30">
            <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500">
                    <Dumbbell size={24} />
                </div>
                <div>
                    <h2 className="font-bold text-lg">Próximo Treino</h2>
                    <p className="text-sm text-slate-400">Personalizado pela IA</p>
                </div>
            </div>
            <Button onClick={generateWorkout} disabled={loading}>
                {loading ? "O Cientista está preparando..." : "GERAR TREINO DE HOJE"}
            </Button>
        </Card>

        <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 flex flex-col items-center text-center">
                <Trophy className="text-gold-500 mb-2" size={20} />
                <span className="text-2xl font-bold">12</span>
                <span className="text-[10px] uppercase text-slate-500 font-bold">Sequência</span>
            </Card>
            <Card className="p-4 flex flex-col items-center text-center">
                <Zap className="text-gold-500 mb-2" size={20} />
                <span className="text-2xl font-bold">98%</span>
                <span className="text-[10px] uppercase text-slate-500 font-bold">Foco Real</span>
            </Card>
        </div>
      </div>
    </div>
  );
}
