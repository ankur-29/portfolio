import { ReactNode } from "react";

import Navbar from "@/components/layout/Navbar";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <> 
      <Navbar />
      <main className="main-layout">
        {children}
      </main>
    </>
  );
}