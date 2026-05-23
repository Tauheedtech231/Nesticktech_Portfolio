import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";
import RootLayoutClient from "./layout-client";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Nestick Tech - Your Digital Partner for Success",
  description: "Nestick - Complete digital solutions from idea to execution.",

  icons: {
    icon: "/nesticklogo.jpg",
    shortcut: "/nesticklogo.jpg",
    apple: "/nesticklogo.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased bg-[#020617] text-white`}
      >
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}