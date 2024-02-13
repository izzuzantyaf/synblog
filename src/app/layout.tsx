import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Synblog",
  description: "A blog about anything.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Why wrapped with Suspense?. Because in Next.js 14 the useSearchParams() required to be used inside <Suspense> */}
        <Suspense>
          {children}
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}
