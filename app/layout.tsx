import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BTC — Big Terms & Conditions",
  description: "Earn BTC coins by referring friends and completing tasks on this platform.",
  openGraph: {
    title: "BTC — Big Terms & Conditions",
    description: "Earn BTC coins by referring friends and completing tasks on this platform.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "BTC — Big Terms & Conditions",
    description: "Earn BTC coins by referring friends and completing tasks on this platform.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#09090B",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
