"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Phone, Mail, Calendar, ChevronRight, Zap } from "lucide-react";
import { api, type User, type Completion } from "@/lib/api";
import { isLoggedIn, getStoredUser, clearAuth, formatBTC } from "@/lib/auth";
import BottomNav from "@/components/BottomNav";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser]             = useState<User | null>(getStoredUser());
  const [completions, setCompletions] = useState<Completion[]>([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    if (!isLoggedIn()) { router.replace("/login"); return; }
    Promise.all([api.profile(), api.myCompletions()])
      .then(([u, c]) => { setUser(u); setCompletions(c); })
      .catch(() => router.replace("/login"))
      .finally(() => setLoading(false));
  }, [router]);

  function logout() {
    clearAuth();
    router.replace("/");
  }

  if (loading) return (
    <div className="flex min-h-screen items-center justify-center" style={{ background: "#09090B" }}>
      <div className="w-8 h-8 rounded-full animate-spin"
        style={{ border: "2px solid #A8860C", borderTopColor: "#D4AF37" }} />
    </div>
  );

  return (
    <>
      <main className="flex flex-col min-h-screen pb-28" style={{ background: "#09090B" }}>

        {/* Header */}
        <div className="px-5 pt-14 pb-6 flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: "#52525B" }}>
              Account
            </p>
            <h1 className="text-2xl font-black" style={{ color: "#F8F8F8" }}>Profile</h1>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold active:scale-95 transition-all"
            style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)", color: "#F87171" }}
          >
            <LogOut size={13} />
            Logout
          </button>
        </div>

        {/* Avatar + name */}
        <div className="flex flex-col items-center pb-6 fade-up">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-black mb-3"
            style={{
              background: "linear-gradient(135deg, rgba(212,175,55,0.15), rgba(168,134,12,0.05))",
              border: "2px solid rgba(212,175,55,0.3)",
              color: "#D4AF37",
            }}
          >
            {user?.first_name?.[0]?.toUpperCase() ?? user?.email[0].toUpperCase()}
          </div>
          <p className="text-base font-bold" style={{ color: "#F8F8F8" }}>
            {user?.first_name && user?.last_name
              ? `${user.first_name} ${user.last_name}`
              : user?.email.split("@")[0]}
          </p>
          <p className="text-sm mt-0.5" style={{ color: "#52525B" }}>
            {user?.email}
          </p>
        </div>

        {/* Balance */}
        <div className="px-5 mb-4 fade-up-2">
          <div className="gold-card p-5 text-center">
            <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#F8F8F8" }}>
              Total Balance
            </p>
            <p className="text-3xl font-black" style={{ color: "#F8F8F8", fontVariantNumeric: "tabular-nums" }}>
              {formatBTC(user?.btc_balance ?? "0")}
            </p>
            <p className="text-xs mt-1" style={{ color: "#52525B" }}>BTC Coins</p>
          </div>
        </div>

        {/* Details */}
        <div className="px-5 mb-4 fade-up-3">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#52525B" }}>
            Details
          </p>
          {[
            { icon: <Mail size={15} />, label: "Email", value: user?.email ?? "" },
            { icon: <Phone size={15} />, label: "Phone", value: user?.phone_number ?? "" },
            { icon: <Calendar size={15} />, label: "Joined", value: user ? new Date(user.date_joined).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" }) : "" },
          ].map((row) => (
            <div
              key={row.label}
              className="flex items-center gap-3 py-3.5"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
            >
              <div style={{ color: "#D4AF37" }}>{row.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs" style={{ color: "#52525B" }}>{row.label}</p>
                <p className="text-sm font-medium truncate" style={{ color: "#F8F8F8" }}>{row.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Task history */}
        <div className="px-5 fade-up-4">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#52525B" }}>
            Task History
          </p>
          {completions.length === 0 ? (
            <div
              className="rounded-2xl py-8 flex flex-col items-center gap-2"
              style={{ background: "#1A1A1F", border: "1px solid rgba(255,255,255,0.04)" }}
            >
              <Zap size={24} style={{ color: "#2A2A2F" }} />
              <p className="text-xs" style={{ color: "#52525B" }}>No tasks completed yet</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {completions.map((c) => (
                <div
                  key={c.id}
                  className="subtle-card flex items-center gap-3 px-4 py-3.5"
                >
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(74,222,128,0.08)" }}
                  >
                    <Zap size={14} style={{ color: "#4ADE80" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate" style={{ color: "#F8F8F8" }}>
                      {c.task_title}
                    </p>
                    <p className="text-xs" style={{ color: "#52525B" }}>
                      {new Date(c.completed_at).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-xs font-black flex-shrink-0" style={{ color: "#4ADE80" }}>
                    +{formatBTC(c.btc_earned)}
                  </p>
                  <ChevronRight size={14} style={{ color: "#3F3F46" }} />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <BottomNav />
    </>
  );
}
