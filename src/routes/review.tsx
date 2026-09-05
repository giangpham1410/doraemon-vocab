import { createFileRoute, Link } from "@tanstack/react-router";
import { grammarNotes, headlineFixes, sampleFixes } from "@/data/fixes";
import { chapters } from "@/data/chapters";
import { chapterToPlainText } from "@/lib/reading";

export const Route = createFileRoute("/review")({
  component: ReviewPage,
  head: () => ({
    meta: [{ title: "English review — Doraemon Vol. 1" }],
  }),
});

function ReviewPage() {
  function downloadAll() {
    const text = [
      "DORAEMON VOLUME 1 — CORRECTED ENGLISH SCRIPT",
      "Joined broken balloon lines. Fixed OCR, spelling, and grammar.",
      "",
      ...chapters.map((ch) => `${chapterToPlainText(ch)}\n\n${"─".repeat(48)}\n`),
    ].join("\n");
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "doraemon-vol1-corrected-english.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="space-y-10">
      <header>
        <p className="text-xs font-medium uppercase tracking-widest text-blue">English check</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-ink">What was fixed</h1>
        <p className="mt-3 max-w-2xl font-serif text-lg leading-8 text-ink-soft">
          The source file is a scanlation OCR dump. Complete sentences were wrapped to the shape of
          manga balloons. This pass joins those sentences, then repairs spelling, names, and grammar
          without rewriting the stories.
        </p>
        <button
          type="button"
          onClick={downloadAll}
          className="mt-6 inline-flex h-12 items-center rounded-[var(--radius-md)] bg-ink px-5 text-sm font-semibold text-sheet hover:opacity-90"
        >
          Download full corrected script
        </button>
      </header>

      <section>
        <h2 className="font-display text-2xl font-semibold text-ink">Work done</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {headlineFixes.map((item) => (
            <li key={item.title} className="rounded-[var(--radius-lg)] border border-line bg-sheet p-5">
              <h3 className="font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{item.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-display text-2xl font-semibold text-ink">Before / after</h2>
        <p className="mt-2 text-sm text-muted">Representative OCR lines. The same treatment was applied throughout.</p>
        <ol className="mt-5 space-y-4">
          {sampleFixes.map((fix, i) => (
            <li key={i} className="overflow-hidden rounded-[var(--radius-lg)] border border-line bg-sheet">
              <div className="grid gap-0 md:grid-cols-2">
                <div className="border-b border-line p-4 md:border-b-0 md:border-r">
                  <p className="text-xs font-semibold uppercase tracking-wider text-stamp">Original OCR</p>
                  <pre className="mt-2 whitespace-pre-wrap font-sans text-sm leading-6 text-ink-soft">{fix.original}</pre>
                </div>
                <div className="p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-ok">Corrected</p>
                  <p className="mt-2 font-serif text-base leading-7 text-ink">{fix.corrected}</p>
                </div>
              </div>
              <p className="border-t border-line bg-paper-deep px-4 py-2.5 text-sm text-muted">{fix.reason}</p>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="font-display text-2xl font-semibold text-ink">Grammar notes</h2>
        <ul className="mt-4 divide-y divide-line overflow-hidden rounded-[var(--radius-lg)] border border-line bg-sheet">
          {grammarNotes.map((n) => (
            <li key={n.issue} className="px-5 py-4">
              <p className="font-semibold text-ink">{n.issue}</p>
              <p className="mt-1 text-sm text-muted">{n.example}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-display text-2xl font-semibold text-ink">Standardized names</h2>
        <p className="mt-2 text-sm text-muted">Honorifics from the scanlation are kept.</p>
        <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[
            ["Doraemon", "was Doremon / DORAEMON"],
            ["Nobita", "NOBITA / Nobi-chan"],
            ["Shizu-chan", "SHIZLU-CHAN"],
            ["Sewashi", "grandson’s grandson"],
            ["Suneo", "SUNEO-SAN"],
            ["Gian / Jaian", "JAIAN kept in speech"],
            ["Jaiko", "Gian’s sister"],
            ["Nobisaku", "NOBISAKL"],
            ["Hideyoshi", "HIPEYOSHI"],
          ].map(([name, note]) => (
            <div key={name} className="rounded-[var(--radius-md)] border border-line bg-sheet px-4 py-3">
              <dt className="font-semibold text-ink">{name}</dt>
              <dd className="text-xs text-muted">{note}</dd>
            </div>
          ))}
        </dl>
      </section>

      <p className="text-sm text-muted">
        Ready to read?{" "}
        <Link
          to="/chapter/$id"
          params={{ id: chapters[0].id }}
          className="font-medium text-blue underline-offset-2 hover:underline"
        >
          Open Chapter 1
        </Link>
        .
      </p>
    </main>
  );
}
