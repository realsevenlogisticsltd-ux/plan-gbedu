import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "40 & Flourishing — Celebrating a Woman of Purpose",
    template: "%s · 40 & Flourishing",
  },
  description:
    "The Ruby Jubilee of a woman of purpose — 40 years of grace, 15 years of teaching, 5 years of legacy, 5 years of motherhood.",
  icons: {
    icon: "/mark.svg",
  },
};

export const viewport = {
  themeColor: "#0f0a0a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
