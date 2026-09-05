import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { changelog } from "@/data/changelog";
import { chapters } from "@/data/chapters";

export const Route = createFileRoute("/whats-new")({
  component: WhatsNewPage,
  head: () => ({
    meta: [{ title: "What's new — Doraemon Vol. 1" }],
  }),
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return Number.isNaN(d.getTime()) ? iso : dateFormatter.format(d);
}

function WhatsNewPage() {
  return (
    <main className="space-y-8">
      <header>
        <p className="text-xs font-medium uppercase tracking-widest text-blue">Changelog</p>
        <h1 className="mt-2 flex items-center gap-2 font-display text-4xl font-semibold tracking-tight text-ink">
          <Sparkles className="size-7 text-blue" />
          What&apos;s new
        </h1>
        <p className="mt-3 max-w-2xl font-serif text-lg leading-8 text-ink-soft">
          New releases and features, newest first.
        </p>
      </header>

      <ol className="relative space-y-8 border-l border-line pl-6 sm:pl-8">
        {changelog.map((entry) => (
          <li key={entry.version} className="relative">
            <span className="absolute -left-[31px] top-1 size-3 rounded-full border-2 border-sheet bg-blue sm:-left-[39px]" />
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="rounded-full bg-blue-fog px-2.5 py-0.5 text-xs font-semibold text-blue-deep">
                v{entry.version}
              </span>
              <time className="text-xs font-medium uppercase tracking-wider text-muted">
                {formatDate(entry.date)}
              </time>
            </div>
            <h2 className="mt-1.5 font-display text-xl font-semibold text-ink">{entry.title}</h2>
            <ul className="mt-2 space-y-1.5">
              {entry.changes.map((change, i) => (
                <li key={i} className="flex gap-2 text-sm leading-6 text-ink-soft">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-faint" />
                  <span>{change}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <p className="text-sm text-muted">
        Back to{" "}
        <Link
          to="/chapter/$id"
          params={{ id: chapters[0].id }}
          className="font-medium text-blue underline-offset-2 hover:underline"
        >
          Chapter 1
        </Link>
        .
      </p>
    </main>
  );
}
