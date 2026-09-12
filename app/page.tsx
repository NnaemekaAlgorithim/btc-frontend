"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";
import Link from "next/link";
import GoldButton from "@/components/GoldButton";

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn()) router.replace("/dashboard");
  }, [router]);

  return (
    <main
      className="flex flex-col min-h-screen"
      style={{ background: "#09090B" }}
    >
      {/* Hero */}
      <div className="flex flex-col items-center justify-center flex-1 px-6 pt-16 pb-8 text-center">

        {/* Logo mark */}
        <div className="relative mb-8 fade-up">
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #1A1A1F 0%, #0D0D10 100%)",
              border: "2px solid transparent",
              backgroundClip: "padding-box",
              boxShadow: "0 0 0 2px rgba(212,175,55,0.4), 0 0 60px rgba(212,175,55,0.15)",
            }}
          >
            <span
              className="text-5xl font-black tracking-tighter"
              style={{
                background: "linear-gradient(135deg, #A8860C, #D4AF37, #F5D76E, #D4AF37)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ₿
            </span>
          </div>
          {/* Outer glow ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)",
              transform: "scale(1.8)",
            }}
          />
        </div>

        <h1 className="text-5xl font-black tracking-tight mb-1 fade-up-2 gold-text">
          BTC
        </h1>
        <p className="text-xs mb-4 fade-up-2" style={{ color: "#71717A" }}>
          Big Terms &amp; Conditions
        </p>

        <p className="text-sm leading-relaxed mb-12 fade-up-3" style={{ color: "#52525B", maxWidth: 280 }}>
          Agree to the terms, refer your friends, complete tasks — earn{" "}
          <span style={{ color: "#D4AF37" }}>BTC coins</span>.
        </p>

        {/* Stats strip */}
        <div
          className="flex gap-6 mb-12 fade-up-4 rounded-2xl px-8 py-4"
          style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.12)" }}
        >
          {[
            { label: "Per Referral", value: "0.00000000001" },
            { label: "Instant", value: "Rewards" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-lg font-bold" style={{ color: "#D4AF37" }}>{s.value}</div>
              <div className="text-xs mt-0.5" style={{ color: "#52525B" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 pb-12 flex flex-col gap-3 fade-up-4">
        <Link href="/register" className="block">
          <GoldButton>Create Account</GoldButton>
        </Link>
        <Link href="/login" className="block">
          <GoldButton variant="outline">Sign In</GoldButton>
        </Link>
      </div>
    </main>
  );
}
