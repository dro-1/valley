import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "@next/font/local";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const montreal = localFont({
  src: [
    {
      path: "../assets/fonts/ppneuemontreal-book.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/ppneuemontreal-bold.woff",
      weight: "700",
      style: "normal",
    },

    {
      path: "../assets/fonts/ppneuemontreal-medium.woff",
      weight: "500",
    },
  ],
  variable: "--font-montreal",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montreal.className}>
      <body>{children}</body>
    </html>
  );
}
