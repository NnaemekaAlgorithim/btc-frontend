"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CheckSquare, Trophy, User } from "lucide-react";

const tabs = [
  { href: "/dashboard", icon: Home,        label: "Home"       },
  { href: "/tasks",     icon: CheckSquare,  label: "Tasks"      },
  { href: "/leaderboard", icon: Trophy,     label: "Rank"       },
  { href: "/profile",   icon: User,         label: "Profile"    },
];

export default function BottomNav() {
  const path = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: "linear-gradient(to top, #0D0D10 80%, transparent)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div
        style={{
          background: "#111114",
          borderTop: "1px solid rgba(212,175,55,0.18)",
        }}
        className="flex items-center justify-around px-2 pt-2 pb-3"
      >
        {tabs.map(({ href, icon: Icon, label }) => {
          const active = path === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-all duration-200"
              style={{ minWidth: 60 }}
            >
              <div
                className="rounded-xl p-2 transition-all duration-200"
                style={{
                  background: active ? "rgba(212,175,55,0.15)" : "transparent",
                }}
              >
                <Icon
                  size={22}
                  style={{ color: active ? "#D4AF37" : "#52525B" }}
                  strokeWidth={active ? 2.2 : 1.8}
                />
              </div>
              <span
                className="text-[10px] font-semibold tracking-wide"
                style={{ color: active ? "#D4AF37" : "#52525B" }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
