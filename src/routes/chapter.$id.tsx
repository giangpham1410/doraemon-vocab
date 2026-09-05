import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ScriptView } from "@/components/script-view";
import { getChapter } from "@/data/chapters";

export const Route = createFileRoute("/chapter/$id")({
  component: ChapterPage,
  notFoundComponent: ChapterMissing,
  loader: ({ params }) => {
    const chapter = getChapter(params.id);
    if (!chapter) throw notFound();
    return { chapter };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.chapter.title ?? "Chapter"} — Doraemon Vol. 1` }],
  }),
});

function ChapterPage() {
  const { chapter } = Route.useLoaderData();
  return <ScriptView chapter={chapter} />;
}

function ChapterMissing() {
  return (
    <div className="rounded-[var(--radius-xl)] border border-line bg-sheet px-6 py-12 text-center">
      <h1 className="font-display text-2xl font-semibold text-ink">Chapter not found</h1>
      <p className="mt-2 text-sm text-muted">That story is not in this volume.</p>
      <Link to="/" className="mt-6 inline-flex h-11 items-center rounded-[var(--radius-md)] bg-blue px-4 text-sm font-semibold text-sheet">
        Back to contents
      </Link>
    </div>
  );
}
