import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DEFENCEPREP – Your Gateway to the Indian Armed Forces",
  description: "Complete CDS & AFCAT preparation platform with mock tests, 180-day roadmap, previous year questions, SSB prep and analytics.",
  icons: { icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🛡</text></svg>" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-navy-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
