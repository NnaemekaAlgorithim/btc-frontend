"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, ArrowLeft, Gift, UserRound } from "lucide-react";
import { api } from "@/lib/api";
import { saveAuth, isLoggedIn } from "@/lib/auth";
import GoldInput from "@/components/GoldInput";
import GoldButton from "@/components/GoldButton";

const COUNTRY_CODES = [
  { code: "+234", flag: "🇳🇬", name: "NG" },
  { code: "+1",   flag: "🇺🇸", name: "US" },
  { code: "+44",  flag: "🇬🇧", name: "GB" },
  { code: "+233", flag: "🇬🇭", name: "GH" },
  { code: "+27",  flag: "🇿🇦", name: "ZA" },
];

export default function RegisterForm() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    countryCode: "+234",
    password: "",
    agreed_to_terms: false,
    referral_code: searchParams.get("ref") ?? "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => { if (isLoggedIn()) router.replace("/dashboard"); }, [router]);

  function set(field: string, value: string | boolean) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => { const n = { ...e }; delete n[field]; return n; });
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.agreed_to_terms) {
      setErrors({ agreed_to_terms: "You must agree to the terms to register." });
      return;
    }
    setLoading(true);
    setErrors({});
    try {
      const { token, user } = await api.register({
        first_name:      form.first_name,
        last_name:       form.last_name,
        email:           form.email,
        phone_number:    form.countryCode + form.phone,
        password:        form.password,
        agreed_to_terms: form.agreed_to_terms,
        referral_code:   form.referral_code || undefined,
      });
      saveAuth(token, user);
      router.replace("/dashboard");
    } catch (err: unknown) {
      const raw = err as Record<string, string[]>;
      const mapped: Record<string, string> = {};
      for (const [k, v] of Object.entries(raw)) mapped[k] = Array.isArray(v) ? v[0] : String(v);
      setErrors(mapped);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col min-h-screen px-6 pt-14 pb-10" style={{ background: "#09090B" }}>
      <Link href="/" className="flex items-center gap-2 mb-8 fade-up" style={{ color: "#52525B" }}>
        <ArrowLeft size={18} />
        <span className="text-sm">Back</span>
      </Link>

      <div className="fade-up mb-8">
        <h1 className="text-3xl font-black tracking-tight mb-2" style={{ color: "#F8F8F8" }}>
          Join BTC
        </h1>
        <p className="text-sm" style={{ color: "#52525B" }}>
          Create your account and start earning coins
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 fade-up-2">
        <div className="grid grid-cols-2 gap-3">
          <GoldInput label="First Name" type="text" placeholder="" value={form.first_name}
            onChange={(e) => set("first_name", e.target.value)} icon={<UserRound size={16} />}
            error={errors.first_name} required />
          <GoldInput label="Last Name" type="text" placeholder="" value={form.last_name}
            onChange={(e) => set("last_name", e.target.value)} icon={<UserRound size={16} />}
            error={errors.last_name} required />
        </div>

        <GoldInput label="Email" type="email" placeholder="you@example.com" value={form.email}
          onChange={(e) => set("email", e.target.value)} icon={<Mail size={16} />}
          error={errors.email} required />

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#A8860C" }}>
            Phone Number
          </label>
          <div className="flex gap-2">
            <select value={form.countryCode} onChange={(e) => set("countryCode", e.target.value)}
              className="rounded-xl px-3 py-3.5 text-sm font-medium border appearance-none text-center"
              style={{ background: "#111114", borderColor: "rgba(212,175,55,0.3)", color: "#F8F8F8", minWidth: 90, outline: "none" }}>
              {COUNTRY_CODES.map((c) => (
                <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
              ))}
            </select>
            <input type="tel" placeholder="8012345678" value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              className="flex-1 rounded-xl px-4 py-3.5 text-sm font-medium border"
              style={{ background: "#111114", borderColor: errors.phone_number ? "#EF4444" : "rgba(212,175,55,0.3)", color: "#F8F8F8", outline: "none" }}
              required />
          </div>
          {errors.phone_number && <p className="text-xs text-red-400">{errors.phone_number}</p>}
        </div>

        <GoldInput label="Password" type="password" placeholder="Min 8 characters" value={form.password}
          onChange={(e) => set("password", e.target.value)} icon={<Lock size={16} />}
          error={errors.password} required />

        <GoldInput label="Referral Code (optional)" type="text" placeholder="Enter code if you have one"
          value={form.referral_code} onChange={(e) => set("referral_code", e.target.value)}
          icon={<Gift size={16} />} error={errors.referral_code} />

        <div className="flex items-center gap-3">
          <button type="button" onClick={() => set("agreed_to_terms", !form.agreed_to_terms)}
            className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center transition-all duration-200"
            style={{ background: form.agreed_to_terms ? "#D4AF37" : "transparent",
              border: `1.5px solid ${form.agreed_to_terms ? "#D4AF37" : "rgba(212,175,55,0.4)"}` }}>
            {form.agreed_to_terms && (
              <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                <path d="M1 4L4 7L10 1" stroke="#09090B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
          <p className="text-xs" style={{ color: "#71717A" }}>
            I agree to the{" "}
            <Link href="/terms" style={{ color: "#D4AF37" }} className="font-semibold underline underline-offset-2">
              Terms &amp; Conditions
            </Link>
          </p>
        </div>
        {errors.agreed_to_terms && <p className="text-xs text-red-400 -mt-2">{errors.agreed_to_terms}</p>}

        {(errors.non_field_errors || errors.detail) && (
          <div className="rounded-xl px-4 py-3 text-sm text-red-300"
            style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
            {errors.non_field_errors ?? errors.detail}
          </div>
        )}

        <div className="mt-2">
          <GoldButton type="submit" loading={loading}>Create Account</GoldButton>
        </div>
      </form>

      <p className="text-center mt-6 text-sm fade-up-3" style={{ color: "#52525B" }}>
        Already have an account?{" "}
        <Link href="/login" style={{ color: "#D4AF37" }} className="font-semibold">Sign in</Link>
      </p>
    </main>
  );
}
