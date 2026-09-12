"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Trophy } from "lucide-react";
import { api, type LeaderboardEntry } from "@/lib/api";
import { isLoggedIn, formatBTC, getStoredUser } from "@/lib/auth";
import BottomNav from "@/components/BottomNav";

const MEDALS = ["🥇", "🥈", "🥉"];
const RANK_COLORS = ["#D4AF37", "#A8A9AD", "#CD7F32"];

export default function LeaderboardPage() {
  const router = useRouter();
  const [board, setBoard]   = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const me = getStoredUser();

  useEffect(() => {
    if (!isLoggedIn()) { router.replace("/login"); return; }
    api.leaderboard()
      .then(setBoard)
      .finally(() => setLoading(false));
  }, [router]);

  return (
    <>
      <main className="flex flex-col min-h-screen pb-28" style={{ background: "#09090B" }}>

        {/* Header */}
        <div className="px-5 pt-14 pb-6">
          <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: "#52525B" }}>
            Top Earners
          </p>
          <h1 className="text-2xl font-black" style={{ color: "#F8F8F8" }}>Leaderboard</h1>
        </div>

        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full animate-spin"
              style={{ border: "2px solid #A8860C", borderTopColor: "#D4AF37" }} />
          </div>
        ) : board.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 px-10 text-center">
            <Trophy size={36} style={{ color: "#2A2A2F" }} />
            <p className="text-sm" style={{ color: "#52525B" }}>No earners yet. Be the first!</p>
          </div>
        ) : (
          <div className="px-5 flex flex-col gap-3 fade-up">

            {/* Top 3 podium */}
            {board.length >= 1 && (
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[1, 0, 2].map((idx) => {
                  const entry = board[idx];
                  if (!entry) return <div key={idx} />;
                  const isFirst = idx === 0;
                  return (
                    <div
                      key={idx}
                      className="flex flex-col items-center gap-1 rounded-2xl py-4 px-2"
                      style={{
                        background: isFirst ? "rgba(212,175,55,0.08)" : "rgba(26,26,31,0.8)",
                        border: isFirst ? "1px solid rgba(212,175,55,0.3)" : "1px solid rgba(255,255,255,0.05)",
                        order: idx === 0 ? 1 : idx === 1 ? 0 : 2,
                      }}
                    >
                      <span className="text-2xl">{MEDALS[idx]}</span>
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black"
                        style={{
                          background: `rgba(${idx === 0 ? "212,175,55" : idx === 1 ? "168,169,173" : "205,127,50"},0.15)`,
                          color: RANK_COLORS[idx],
                        }}
                      >
                        {entry.first_name?.[0]?.toUpperCase() ?? entry.email[0].toUpperCase()}
                      </div>
                      <p className="text-[10px] font-semibold text-center leading-tight" style={{ color: "#A1A1AA" }}>
                        {(entry.first_name || entry.email.split("@")[0]).slice(0, 8)}
                      </p>
                      <p className="text-[10px] font-black" style={{ color: RANK_COLORS[idx] }}>
                        {parseFloat(entry.btc_balance).toFixed(8)}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Full list */}
            {board.map((entry, i) => {
              const isMe = entry.email === me?.email;
              return (
                <div
                  key={entry.referral_code}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3.5"
                  style={{
                    background: isMe ? "rgba(212,175,55,0.07)" : "#1A1A1F",
                    border: isMe
                      ? "1px solid rgba(212,175,55,0.3)"
                      : "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  {/* Rank */}
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
                    style={{
                      background: i < 3 ? `rgba(${["212,175,55", "168,169,173", "205,127,50"][i]},0.12)` : "rgba(255,255,255,0.04)",
                      color: i < 3 ? RANK_COLORS[i] : "#52525B",
                    }}
                  >
                    {i < 3 ? MEDALS[i] : `#${i + 1}`}
                  </div>

                  {/* Avatar */}
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0"
                    style={{ background: "rgba(212,175,55,0.08)", color: "#D4AF37" }}
                  >
                    {entry.first_name?.[0]?.toUpperCase() ?? entry.email[0].toUpperCase()}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate" style={{ color: isMe ? "#D4AF37" : "#F8F8F8" }}>
                      {entry.first_name && entry.last_name ? `${entry.first_name} ${entry.last_name}` : entry.email.split("@")[0]}
                      {isMe && <span className="ml-1 text-[10px]" style={{ color: "#A8860C" }}>(you)</span>}
                    </p>
                    <p className="text-xs" style={{ color: "#52525B" }}>
                      Code: {entry.referral_code}
                    </p>
                  </div>

                  {/* Balance */}
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-black" style={{ color: i === 0 ? "#D4AF37" : "#A1A1AA" }}>
                      {formatBTC(entry.btc_balance)}
                    </p>
                    <p className="text-[10px]" style={{ color: "#3F3F46" }}>BTC</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
      <BottomNav />
    </>
  );
}
