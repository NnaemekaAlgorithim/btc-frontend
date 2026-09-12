"use client";
import { type InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export default function GoldInput({ label, error, icon, ...props }: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#A8860C" }}>
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "#D4AF37" }}>
            {icon}
          </div>
        )}
        <input
          {...props}
          className={`w-full rounded-xl px-4 py-3.5 text-sm font-medium text-white placeholder-zinc-600 transition-all duration-200
            focus:ring-0 border
            ${icon ? "pl-10" : ""}
            ${props.className ?? ""}`}
          style={{
            background: "#111114",
            borderColor: error ? "#EF4444" : "rgba(212,175,55,0.3)",
            outline: "none",
            ...props.style,
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#D4AF37";
            e.currentTarget.style.boxShadow = "0 0 0 2px rgba(212,175,55,0.15)";
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = error ? "#EF4444" : "rgba(212,175,55,0.3)";
            e.currentTarget.style.boxShadow = "none";
            props.onBlur?.(e);
          }}
        />
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
