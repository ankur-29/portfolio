"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { ReactNode } from "react";

interface AppProvidersProps {
  children: ReactNode;
}

export default function AppProviders({ children, }: AppProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}

      <Toaster richColors closeButton position="top-right" />
    </ThemeProvider>
  );
}