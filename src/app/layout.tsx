import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flint",
  description:
    "Flint Media Group — health media that educates, empowers, and drives meaningful outcomes.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
