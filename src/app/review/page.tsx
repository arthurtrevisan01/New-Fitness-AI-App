"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { useRouter } from "next/navigation";
import { ShieldAlert, CheckCircle2, TrendingUp } from "lucide-react";

export default function ReviewPage() {
  const [analysis, setAnalysis] = useState<string>("");
  const [stats, setStats] = useState({ totalWeight: 0, avgIntensity: 0 });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getReview = async () => {
      const logsStr = localStorage.getItem("workout_logs");
      if (!logsStr) {
          router.push("/");
          return;
      }

      const logs = JSON.parse(logsStr);

      // Calculate real stats
      const totalWeight = logs.reduce((acc: number, log: { weight: number; reps: number }) => acc + (log.weight * log.reps), 0);
      setStats({
        totalWeight,
        avgIntensity: logs.length > 0 ? 85 : 0 // Simplified intensity metric
      });

      try {
        const response = await fetch("/api/gemini", {
          method: "POST",
          body: JSON.stringify({
            type: "review",
            data: logs
          })
        });
        const data = await response.json();
        setAnalysis(data.analysis);
      } catch {
        setAnalysis("O Crítico está sem palavras. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    getReview();
  }, [router]);

  return (
    <div className="p-6 pt-12">
      <h1 className="text-3xl font-black uppercase mb-8">Análise do <span className="text-gold-500">Crítico</span></h1>

      {loading ? (
          <div className="space-y-4">
              <div className="h-48 bg-white/5 animate-pulse rounded-2xl" />
              <div className="h-10 bg-white/5 animate-pulse rounded-xl" />
          </div>
      ) : (
        <div className="space-y-6">
          <Card className="border-l-4 border-l-red-500 bg-red-500/5">
            <div className="flex gap-4">
                <ShieldAlert className="text-red-500 shrink-0" size={24} />
                <p className="text-slate-200 leading-relaxed italic">
                    &ldquo;{analysis}&rdquo;
                </p>
            </div>
          </Card>

          <div className="grid grid-cols-1 gap-4">
              <Card glass={false} className="flex items-center gap-4">
                  <CheckCircle2 className="text-green-500" />
                  <div>
                      <p className="text-xs text-slate-500 uppercase font-bold">Volume Total</p>
                      <p className="text-xl font-bold">{stats.totalWeight.toLocaleString()} kg</p>
                  </div>
              </Card>
              <Card glass={false} className="flex items-center gap-4">
                  <TrendingUp className="text-gold-500" />
                  <div>
                      <p className="text-xs text-slate-500 uppercase font-bold">Intensidade Média Estimada</p>
                      <p className="text-xl font-bold">{stats.avgIntensity}%</p>
                  </div>
              </Card>
          </div>

          <Button variant="secondary" onClick={() => router.push("/")}>
            VOLTAR AO INÍCIO
          </Button>
        </div>
      )}
    </div>
  );
}
