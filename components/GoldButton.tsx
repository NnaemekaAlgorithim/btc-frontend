"use client";
import { type ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: "primary" | "outline" | "ghost";
}

export default function GoldButton({ loading, variant = "primary", children, className, ...props }: Props) {
  const base = "relative w-full py-4 rounded-2xl font-bold text-sm tracking-wider uppercase transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";

  const styles: Record<string, React.CSSProperties> = {
    primary: {
      background: loading
        ? "rgba(212,175,55,0.4)"
        : "linear-gradient(135deg, #A8860C 0%, #D4AF37 40%, #F5D76E 60%, #D4AF37 80%, #A8860C 100%)",
      backgroundSize: "200% 100%",
      color: "#09090B",
      boxShadow: "0 4px 24px rgba(212,175,55,0.25)",
    },
    outline: {
      background: "transparent",
      border: "1px solid rgba(212,175,55,0.5)",
      color: "#D4AF37",
    },
    ghost: {
      background: "transparent",
      color: "#D4AF37",
    },
  };

  return (
    <button
      {...props}
      disabled={props.disabled || loading}
      className={`${base} ${className ?? ""}`}
      style={styles[variant]}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          Processing…
        </span>
      ) : children}
    </button>
  );
}
