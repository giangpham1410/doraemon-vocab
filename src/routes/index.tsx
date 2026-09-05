import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookMarked, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { chapters, searchChapters } from "@/data/chapters";
import { lastChapter } from "@/lib/reading";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [q, setQ] = useState("");
  const [resumeId, setResumeId] = useState<string | null>(null);
  const resumeChapter = chapters.find((c) => c.id === resumeId);
  const hits = useMemo(() => searchChapters(q), [q]);

  useEffect(() => {
    setResumeId(lastChapter());
  }, []);

  return (
    <main>
      <section className="overflow-hidden rounded-[var(--radius-xl)] border border-line bg-sheet px-5 py-8 shadow-[var(--shadow-sheet)] sm:px-10 sm:py-12">
        <p className="text-xs font-medium uppercase tracking-widest text-blue">English review</p>
        <h1 className="mt-3 max-w-xl font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Doraemon Volume 1, read as English.
        </h1>
        <p className="mt-4 max-w-2xl font-serif text-lg leading-8 text-ink-soft">
          The scan file broke complete sentences across balloon lines and filled the page with OCR noise.
          This reader joins those sentences, corrects spelling and grammar, and keeps the original stories
          in chapter order.
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          File gốc bị xuống hàng giữa câu hoàn chỉnh, lỗi nhận dạng chữ (OCR), và tên riêng sai. Bản này
          đã nối câu, sửa chính tả, và chuẩn hoá tên nhân vật.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/chapter/$id"
            params={{ id: chapters[0].id }}
            className="inline-flex h-12 items-center gap-2 rounded-[var(--radius-md)] bg-blue px-5 text-sm font-semibold text-sheet hover:opacity-90"
          >
            Start Chapter 1
            <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/review"
            className="inline-flex h-12 items-center gap-2 rounded-[var(--radius-md)] border border-line-strong bg-sheet px-5 text-sm font-semibold text-ink hover:bg-paper-deep"
          >
            See what was fixed
          </Link>
          {resumeChapter ? (
            <Link
              to="/chapter/$id"
              params={{ id: resumeChapter.id }}
              className="inline-flex h-12 items-center gap-2 rounded-[var(--radius-md)] px-4 text-sm font-medium text-blue-deep hover:bg-blue-fog"
            >
              <BookMarked className="size-4" />
              Resume {resumeChapter.title}
            </Link>
          ) : null}
        </div>
      </section>

      <label className="relative mt-8 block">
        <span className="sr-only">Search the script</span>
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-faint" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search dialogue, names, gadgets…"
          className="h-12 w-full rounded-[var(--radius-lg)] border border-line bg-sheet pl-11 pr-4 text-sm text-ink outline-none placeholder:text-faint focus:border-blue"
        />
      </label>

      {q.trim().length >= 2 ? (
        <ul className="mt-4 space-y-2">
          {hits.length === 0 ? (
            <li className="rounded-[var(--radius-md)] border border-line bg-sheet px-4 py-3 text-sm text-muted">
              No lines match “{q}”.
            </li>
          ) : (
            hits.map((hit, i) => (
              <li key={`${hit.chapter.id}-${i}`}>
                <Link
                  to="/chapter/$id"
                  params={{ id: hit.chapter.id }}
                  className="block rounded-[var(--radius-md)] border border-line bg-sheet px-4 py-3 hover:bg-paper-deep"
                >
                  <span className="text-xs font-medium uppercase tracking-wider text-blue">
                    Ch. {hit.chapter.number} · {hit.chapter.title}
                  </span>
                  <span className="mt-1 block text-sm text-ink">
                    {hit.speaker ? <strong className="font-semibold">{hit.speaker}: </strong> : null}
                    {hit.line}
                  </span>
                </Link>
              </li>
            ))
          )}
        </ul>
      ) : (
        <ol className="mt-6 grid gap-3 sm:grid-cols-2">
          {chapters.map((ch) => (
            <li key={ch.id}>
              <Link
                to="/chapter/$id"
                params={{ id: ch.id }}
                className="flex h-full flex-col rounded-[var(--radius-lg)] border border-line bg-sheet p-5 hover:border-line-strong hover:bg-paper-deep"
              >
                <span className="text-xs font-medium uppercase tracking-wider text-muted">
                  {String(ch.number).padStart(2, "0")} · pp. {ch.pages}
                </span>
                <span className="mt-2 font-display text-xl font-semibold tracking-tight text-ink">{ch.title}</span>
                <span className="mt-2 flex-1 text-sm leading-6 text-muted">{ch.summary}</span>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue">
                  Read script
                  <ArrowRight className="size-3.5" />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </main>
  );
}
