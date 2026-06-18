import type { Metadata } from "next";
import { Goudy_Bookletter_1911, Inter, Quicksand } from "next/font/google";
import { ToastProvider } from "@/context/ToastContext";
import "./globals.css";

const goudyBookletter = Goudy_Bookletter_1911({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-goudy",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://theactionlist.com"),
  title: {
    template: "%s | The Action List",
    default: "The Action List",
  },
  description: "Browse 100+ curated, research-backed actions for a life well lived.",
  openGraph: {
    siteName: "The Action List",
    type: "website",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${goudyBookletter.variable} ${quicksand.variable} ${inter.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col max-w-360 mx-auto w-full bg-white" suppressHydrationWarning>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
