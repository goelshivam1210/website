"use client";
import { useState, useEffect } from "react";
import Header from "./Header";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      try {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
        setDark(isDark);
        document.documentElement.classList.toggle('dark', isDark);
      } catch {}
    }
  }, []);

  return (
    <>
      <Header dark={dark} setDark={setDark} mounted={mounted} />
      {children}
    </>
  );
}

