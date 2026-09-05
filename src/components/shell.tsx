import { Link } from "@tanstack/react-router";
import { BookOpen, ListChecks, Search } from "lucide-react";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <span className="grid size-9 place-items-center rounded-full bg-blue text-sheet shadow-[var(--shadow-mark)]">
              <BookOpen className="size-4" strokeWidth={2} />
            </span>
            <span className="min-w-0">
              <span className="block truncate font-display text-base font-semibold tracking-tight text-ink">
                Doraemon Vol. 1
              </span>
              <span className="block truncate text-xs text-muted">Corrected English script</span>
            </span>
          </Link>
          <nav className="flex items-center gap-1">
            <Link
              to="/"
              activeOptions={{ exact: true }}
              className="nav-link inline-flex h-11 items-center gap-2 rounded-[var(--radius-md)] px-3 text-sm font-medium text-ink-soft hover:bg-paper-deep hover:text-ink"
            >
              <Search className="size-4" />
              <span className="hidden sm:inline">Contents</span>
            </Link>
            <Link
              to="/review"
              className="nav-link inline-flex h-11 items-center gap-2 rounded-[var(--radius-md)] px-3 text-sm font-medium text-ink-soft hover:bg-paper-deep hover:text-ink"
            >
              <ListChecks className="size-4" />
              <span className="hidden sm:inline">Review</span>
            </Link>
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">{children}</div>
    </div>
  );
}
