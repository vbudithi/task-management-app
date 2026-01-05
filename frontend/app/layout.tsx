import type { Metadata } from "next";
import Providers from "@/providers";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Management App",
  description: "Create and share your tasks",
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) 
{ 
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen overflow-auto`}
      >
        <Providers>
          <div className="flex flex-col h-full">
            <Navbar />
            <main className="flex-1 overflow-hidden">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
