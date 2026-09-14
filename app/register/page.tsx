import type { Metadata } from "next";
import { Suspense } from "react";
import RegisterForm from "./RegisterForm";

export const metadata: Metadata = {
  title: "Create Account — BTC",
  description: "Join BTC and start earning coins by referring friends and completing tasks.",
  openGraph: {
    title: "Join BTC — Create your account",
    description: "Join BTC and start earning coins by referring friends and completing tasks.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Join BTC — Create your account",
    description: "Join BTC and start earning coins by referring friends and completing tasks.",
  },
};

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
