import type { Metadata } from "next";
import { ReactNode } from "react";

import AppProviders from "@/providers/AppProviders";
import { geistMono, geistSans } from "@/lib/fonts";

import "@/styles/globals.css";
import BackgroundCanvas from "./background/canvas/BackgroundCanvas";

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Ankur Anand",
  description: "Senior Full Stack MERN Developer",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`} >
        <AppProviders>
          <BackgroundCanvas />
          {children}      
        </AppProviders>
      </body>
    </html>
  );
}