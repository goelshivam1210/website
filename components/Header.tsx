"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, Moon, SunMedium } from "lucide-react";
import { Button } from "@/components/ui/button";

function NavItem({ href, children, isActive }: { href: string; children: React.ReactNode; isActive?: boolean }) {
  return (
    <a 
      href={href} 
      className={`px-3 py-2 rounded-xl transition ${
        isActive 
          ? "bg-[#E5E1EE] dark:bg-[#E5E1EE]/30 text-zinc-900 dark:text-zinc-100 font-medium" 
          : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
      }`}
    >
      {children}
    </a>
  );
}

export default function Header({ dark, setDark, mounted }: { dark: boolean; setDark: (v: boolean) => void; mounted: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isProjectPage = pathname?.startsWith('/projects/');
  
  return (
    <header className="sticky top-0 z-50 bg-[#E0E1E9] dark:bg-[#2A3D42] border-b dark:border-zinc-700/50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="font-semibold tracking-tight text-lg" />
          <nav className="hidden md:flex items-center gap-1 text-sm">
            <NavItem href="/#top">Home</NavItem>
            <NavItem href="/#research">Research</NavItem>
            <NavItem href="/#publications">Publications</NavItem>
            <NavItem href="/#projects" isActive={isProjectPage}>Projects</NavItem>
            <NavItem href="/#teaching">Teaching</NavItem>
            <NavItem href="/#news">News</NavItem>
            <NavItem href="/#contact">Contact</NavItem>
          </nav>
          <div className="flex items-center gap-2">
            {mounted && (
              <Button variant="ghost" size="icon" onClick={() => { const next = !dark; setDark(next); const root = document.documentElement; root.classList.toggle('dark', next); try { localStorage.setItem('theme', next ? 'dark' : 'light'); } catch {} }} aria-label="Toggle theme">
                {dark ? <SunMedium className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            )}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
        {open && (
          <div className="md:hidden pb-3 flex flex-col gap-1 text-sm">
            <NavItem href="/#top">Home</NavItem>
            <NavItem href="/#research">Research</NavItem>
            <NavItem href="/#publications">Publications</NavItem>
            <NavItem href="/#projects" isActive={isProjectPage}>Projects</NavItem>
            <NavItem href="/#teaching">Teaching</NavItem>
            <NavItem href="/#news">News</NavItem>
            <NavItem href="/#contact">Contact</NavItem>
          </div>
        )}
      </div>
    </header>
  );
}

