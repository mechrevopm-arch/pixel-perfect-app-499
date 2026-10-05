import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold" aria-label="MindType home">
      <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand text-sm text-primary-foreground">M</span>
      MindType
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
      <Logo />
      <nav className="flex items-center gap-1 text-sm font-medium sm:gap-4">
        <Link to="/about" className="rounded-full px-3 py-2 text-muted-foreground hover:text-foreground">About</Link>
        <Link to="/test" className="rounded-full bg-primary-soft px-4 py-2 text-primary">Take Test</Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t bg-card/60">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-[1fr_auto]">
        <div className="max-w-md">
          <Logo />
          <p className="mt-2 text-sm text-muted-foreground">Understand yourself. Understand others.</p>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            MindType is an informational personality assessment inspired by the MBTI framework. It is not a clinical
            psychological test or professional diagnosis.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <Link to="/test" className="hover:text-foreground">Take Test</Link>
          <Link to="/about" className="hover:text-foreground">About</Link>
          <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
          <Link to="/disclaimer" className="hover:text-foreground">Disclaimer</Link>
        </nav>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-hero">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}

export function ProseCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <h1 className="text-4xl font-bold">{title}</h1>
      <div className="card-soft mt-8 space-y-4 p-8 leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}
