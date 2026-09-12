"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Copy, Check, Users, Zap, Share2 } from "lucide-react";
import { api, type User } from "@/lib/api";
import { isLoggedIn, getStoredUser, saveAuth, formatBTC } from "@/lib/auth";
import BottomNav from "@/components/BottomNav";

export default function DashboardPage() {
  const router  = useRouter();
  const [user, setUser]       = useState<User | null>(getStoredUser());
  const [copiedLink, setCopiedLink] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      const u = await api.profile();
      setUser(u);
      const token = localStorage.getItem("btc_token") ?? "";
      saveAuth(token, u);
    } catch {
      router.replace("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (!isLoggedIn()) { router.replace("/login"); return; }
    fetchProfile();
  }, [router, fetchProfile]);

  // The referral_url from the API is the canonical shareable link.
  // Fallback to constructing it from the current origin if needed.
  const referralLink = user?.referral_url
    ?? (user ? `${window.location.origin}/register?ref=${user.referral_code}` : "");

  async function copyLink() {
    if (!referralLink) return;
    await navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  }

  async function shareLink() {
    if (!referralLink) return;
    if (navigator.share) {
      await navigator.share({
        title: "Join BTC — Big Terms & Conditions",
        text: "I'm earning BTC coins on this Nigerian social experiment. Use my link to join and we both earn!",
        url: referralLink,
      });
    } else {
      await copyLink();
    }
  }

  return (
    <>
      <main className="flex flex-col min-h-screen pb-28" style={{ background: "#09090B" }}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-14 pb-4">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#52525B" }}>My Wallet</p>
            <h1 className="text-lg font-bold" style={{ color: "#F8F8F8" }}>BTC Balance</h1>
          </div>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)" }}
          >
            <span className="text-base font-black" style={{ color: "#D4AF37" }}>₿</span>
          </div>
        </div>

        {/* Balance Card */}
        <div className="px-5 mb-5 fade-up">
          <div className="gold-card p-6 text-center">
            {loading && !user ? (
              <div className="h-16 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full animate-spin"
                  style={{ border: "2px solid #A8860C", borderTopColor: "#D4AF37" }} />
              </div>
            ) : (
              <>
                <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#F8F8F8" }}>
                  Total Earned
                </p>
                <div className="text-4xl font-black tracking-tight mb-1"
                  style={{ color: "#F8F8F8", fontVariantNumeric: "tabular-nums" }}>
                  {formatBTC(user?.btc_balance ?? "0")}
                </div>
                <p className="text-xs" style={{ color: "#52525B" }}>BTC Coins</p>
              </>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 px-5 mb-5 fade-up-2">
          {[
            { icon: <Users size={16} style={{ color: "#D4AF37" }} />, label: "Referrals", value: "—" },
            { icon: <Zap   size={16} style={{ color: "#D4AF37" }} />, label: "Tasks Done", value: "—" },
          ].map((s) => (
            <div key={s.label} className="subtle-card p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(212,175,55,0.1)" }}>
                {s.icon}
              </div>
              <div>
                <p className="text-xs" style={{ color: "#52525B" }}>{s.label}</p>
                <p className="text-base font-bold" style={{ color: "#F8F8F8" }}>{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Referral section */}
        <div className="px-5 fade-up-3">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#52525B" }}>
            Invite Friends
          </p>

          {/* Link display box */}
          <div
            className="rounded-2xl p-4 mb-3"
            style={{ background: "#1A1A1F", border: "1px solid rgba(212,175,55,0.25)" }}
          >
            <p className="text-xs mb-2" style={{ color: "#71717A" }}>Your referral link — send this to friends:</p>
            <p
              className="text-xs font-mono break-all leading-relaxed"
              style={{ color: "#D4AF37" }}
            >
              {referralLink || "Loading…"}
            </p>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={copyLink}
              className="flex items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold active:scale-[0.98] transition-all"
              style={{
                background: copiedLink ? "rgba(74,222,128,0.1)" : "rgba(212,175,55,0.1)",
                border: `1px solid ${copiedLink ? "rgba(74,222,128,0.3)" : "rgba(212,175,55,0.25)"}`,
                color: copiedLink ? "#4ADE80" : "#D4AF37",
              }}
            >
              {copiedLink ? <Check size={15} /> : <Copy size={15} />}
              {copiedLink ? "Copied!" : "Copy Link"}
            </button>

            <button
              onClick={shareLink}
              className="flex items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold active:scale-[0.98] transition-all"
              style={{
                background: "linear-gradient(135deg, rgba(168,134,12,0.3), rgba(212,175,55,0.2))",
                border: "1px solid rgba(212,175,55,0.35)",
                color: "#D4AF37",
              }}
            >
              <Share2 size={15} />
              Share
            </button>
          </div>

          <p className="text-center text-xs mt-4" style={{ color: "#3F3F46" }}>
            When a friend registers via your link, you both earn{" "}
            <span style={{ color: "#D4AF37" }}>0.00000000001 BTC</span>
          </p>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
