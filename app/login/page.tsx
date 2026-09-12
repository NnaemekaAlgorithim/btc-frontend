"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, ArrowLeft } from "lucide-react";
import { api } from "@/lib/api";
import { saveAuth, isLoggedIn } from "@/lib/auth";
import GoldInput from "@/components/GoldInput";
import GoldButton from "@/components/GoldButton";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm]   = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => { if (isLoggedIn()) router.replace("/dashboard"); }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { token, user } = await api.login(form);
      saveAuth(token, user);
      router.replace("/dashboard");
    } catch (err: unknown) {
      const msg = (err as Record<string, string[]>)?.non_field_errors?.[0] ?? "Login failed. Check your credentials.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col min-h-screen px-6 pt-14 pb-10" style={{ background: "#09090B" }}>
      <Link href="/" className="flex items-center gap-2 mb-10 fade-up" style={{ color: "#52525B" }}>
        <ArrowLeft size={18} />
        <span className="text-sm">Back</span>
      </Link>

      <div className="fade-up mb-10">
        <h1 className="text-3xl font-black tracking-tight mb-2" style={{ color: "#F8F8F8" }}>
          Welcome back
        </h1>
        <p className="text-sm" style={{ color: "#52525B" }}>
          Sign in to access your BTC wallet
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 fade-up-2">
        <GoldInput
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          icon={<Mail size={16} />}
          required
        />
        <GoldInput
          label="Password"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          icon={<Lock size={16} />}
          required
        />

        {error && (
          <div
            className="rounded-xl px-4 py-3 text-sm text-red-300"
            style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}
          >
            {error}
          </div>
        )}

        <div className="mt-2">
          <GoldButton type="submit" loading={loading}>Sign In</GoldButton>
        </div>
      </form>

      <p className="text-center mt-8 text-sm fade-up-3" style={{ color: "#52525B" }}>
        No account?{" "}
        <Link href="/register" style={{ color: "#D4AF37" }} className="font-semibold">
          Create one
        </Link>
      </p>
    </main>
  );
}
