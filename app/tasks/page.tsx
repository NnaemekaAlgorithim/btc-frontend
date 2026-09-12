"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink, Video, Link2, CheckCircle, Zap } from "lucide-react";
import { api, type Task } from "@/lib/api";
import { isLoggedIn, formatBTC } from "@/lib/auth";
import BottomNav from "@/components/BottomNav";

export default function TasksPage() {
  const router = useRouter();
  const [tasks, setTasks]   = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState<string | null>(null);
  const [toast, setToast]   = useState<{ msg: string; ok: boolean } | null>(null);

  useEffect(() => {
    if (!isLoggedIn()) { router.replace("/login"); return; }
    api.tasks()
      .then(setTasks)
      .catch(() => router.replace("/login"))
      .finally(() => setLoading(false));
  }, [router]);

  function showToast(msg: string, ok: boolean) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  }

  async function handleComplete(task: Task) {
    setCompleting(task.id);
    // Open the URL first so it's not blocked as a popup
    window.open(task.url, "_blank", "noopener,noreferrer");
    try {
      const res = await api.completeTask(task.id);
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, already_completed: true } : t))
      );
      showToast(`+${res.btc_earned} BTC earned!`, true);
    } catch (err: unknown) {
      const detail = (err as Record<string, string>)?.detail ?? "Could not complete task.";
      showToast(detail, false);
    } finally {
      setCompleting(null);
    }
  }

  return (
    <>
      <main className="flex flex-col min-h-screen pb-28" style={{ background: "#09090B" }}>
        {/* Header */}
        <div className="px-5 pt-14 pb-6">
          <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: "#52525B" }}>
            Earn More
          </p>
          <h1 className="text-2xl font-black" style={{ color: "#F8F8F8" }}>Tasks</h1>
        </div>

        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full animate-spin"
              style={{ border: "2px solid #A8860C", borderTopColor: "#D4AF37" }} />
          </div>
        ) : tasks.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 px-10 text-center">
            <Zap size={36} style={{ color: "#2A2A2F" }} />
            <p className="text-sm" style={{ color: "#52525B" }}>No tasks available yet. Check back soon.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 px-5 fade-up">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                completing={completing === task.id}
                onComplete={() => handleComplete(task)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Toast */}
      {toast && (
        <div
          className="fixed top-14 left-1/2 -translate-x-1/2 z-50 rounded-2xl px-5 py-3 text-sm font-semibold shadow-xl transition-all"
          style={{
            background: toast.ok ? "rgba(74,222,128,0.12)" : "rgba(239,68,68,0.12)",
            border: `1px solid ${toast.ok ? "rgba(74,222,128,0.3)" : "rgba(239,68,68,0.3)"}`,
            color: toast.ok ? "#4ADE80" : "#F87171",
            whiteSpace: "nowrap",
          }}
        >
          {toast.msg}
        </div>
      )}

      <BottomNav />
    </>
  );
}

function TaskCard({ task, completing, onComplete }: {
  task: Task;
  completing: boolean;
  onComplete: () => void;
}) {
  const isVideo = task.task_type === "watch_video";
  const Icon = isVideo ? Video : Link2;
  const done = task.already_completed;

  return (
    <div
      className="rounded-2xl p-4 flex flex-col gap-3 transition-all"
      style={{
        background: "#1A1A1F",
        border: done
          ? "1px solid rgba(74,222,128,0.2)"
          : "1px solid rgba(212,175,55,0.18)",
        opacity: done ? 0.75 : 1,
      }}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ background: done ? "rgba(74,222,128,0.1)" : "rgba(212,175,55,0.1)" }}
        >
          <Icon size={18} style={{ color: done ? "#4ADE80" : "#D4AF37" }} />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold leading-tight mb-1" style={{ color: "#F8F8F8" }}>
            {task.title}
          </p>
          {task.description && (
            <p className="text-xs leading-relaxed" style={{ color: "#71717A" }}>
              {task.description}
            </p>
          )}
        </div>

        {/* Reward badge */}
        <div
          className="rounded-lg px-2 py-1 flex-shrink-0"
          style={{ background: "rgba(212,175,55,0.08)" }}
        >
          <p className="text-[10px] font-black" style={{ color: "#D4AF37" }}>
            +{formatBTC(task.btc_reward)}
          </p>
        </div>
      </div>

      {/* Action */}
      {done ? (
        <div className="flex items-center gap-2 py-1">
          <CheckCircle size={14} style={{ color: "#4ADE80" }} />
          <span className="text-xs font-semibold" style={{ color: "#4ADE80" }}>Completed</span>
        </div>
      ) : (
        <button
          onClick={onComplete}
          disabled={completing}
          className="flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold tracking-wider uppercase active:scale-[0.98] transition-all disabled:opacity-50"
          style={{
            background: "rgba(212,175,55,0.1)",
            border: "1px solid rgba(212,175,55,0.25)",
            color: "#D4AF37",
          }}
        >
          {completing ? (
            <div className="w-4 h-4 rounded-full animate-spin"
              style={{ border: "1.5px solid #A8860C", borderTopColor: "#D4AF37" }} />
          ) : (
            <>
              <ExternalLink size={13} />
              {isVideo ? "Watch & Earn" : "Visit & Earn"}
            </>
          )}
        </button>
      )}
    </div>
  );
}
