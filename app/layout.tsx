import type { Metadata } from "next";
import { Geist, Geist_Mono, Fredoka, Nunito } from "next/font/google";
import "./globals.css";
import CartProvider from "@/context/CartContext";
import Navbar from "@/components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kibo Shop",
  description: "A shopping cart built for the Kibo take-home assignment.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html
    lang="en"
    className={`${geistSans.variable} ${geistMono.variable} ${fredoka.variable} ${nunito.variable} h-full antialiased`}
  >
    <body className="min-h-full flex flex-col" style={{ fontFamily: 'var(--font-nunito), sans-serif', backgroundColor: '#caf0f8' }}>
      <CartProvider>
        <Navbar />
        <main className="flex-1 w-full mx-auto pb-24">
          {children}
        </main>
      </CartProvider>
    </body>
  </html>
);

export default RootLayout;
