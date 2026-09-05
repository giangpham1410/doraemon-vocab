import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Type } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { Chapter } from "@/data/types";
import { getAdjacent } from "@/data/chapters";
import { Button } from "@/components/ui/button";
import {
  chapterToPlainText,
  readTypeSize,
  rememberChapter,
  saveTypeSize,
  type TypeSize,
} from "@/lib/reading";
import { cn } from "@/lib/utils";

const sizeClass: Record<TypeSize, string> = {
  sm: "text-sm leading-7",
  md: "text-base leading-8",
  lg: "text-lg leading-9",
};

export function ScriptView({ chapter }: { chapter: Chapter }) {
  const { prev, next } = getAdjacent(chapter.id);
  const [size, setSize] = useState<TypeSize>("md");

  useEffect(() => {
    setSize(readTypeSize());
    rememberChapter(chapter.id);
  }, [chapter.id]);

  const plain = useMemo(() => chapterToPlainText(chapter), [chapter]);

  function cycleSize() {
    const nextSize: TypeSize = size === "sm" ? "md" : size === "md" ? "lg" : "sm";
    setSize(nextSize);
    saveTypeSize(nextSize);
  }

  function download() {
    const blob = new Blob([plain], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `doraemon-vol1-${String(chapter.number).padStart(2, "0")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <article>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-widest text-blue">
            Chapter {String(chapter.number).padStart(2, "0")} · pp. {chapter.pages}
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {chapter.title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted">{chapter.summary}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={cycleSize} aria-label="Change type size">
            <Type className="size-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={download}>
            Download
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-[var(--radius-xl)] border border-line bg-sheet shadow-[var(--shadow-sheet)]">
        <div className="border-b border-line bg-blue-fog px-5 py-3 text-xs text-blue-deep sm:px-8">
          OCR title: {chapter.ocrTitle}
        </div>
        <ol className={cn("space-y-5 px-5 py-7 sm:px-10 sm:py-10", sizeClass[size])}>
          {chapter.lines.map((line, i) => (
            <li key={`${chapter.id}-${i}`}>
              {line.kind === "dialogue" ? (
                <div>
                  {line.speaker ? (
                    <p className="mb-0.5 font-sans text-xs font-semibold uppercase tracking-wider text-blue">
                      {line.speaker}
                    </p>
                  ) : null}
                  <p className="font-serif text-ink">{line.text}</p>
                  {line.phonetic ? (
                    <p className="mt-0.5 font-mono text-xs text-muted">{line.phonetic}</p>
                  ) : null}
                </div>
              ) : null}
              {line.kind === "narration" ? (
                <div>
                  <p className="font-serif italic text-ink-soft">{line.text}</p>
                  {line.phonetic ? (
                    <p className="mt-0.5 font-mono text-xs text-muted">{line.phonetic}</p>
                  ) : null}
                </div>
              ) : null}
              {line.kind === "sfx" ? (
                <div>
                  <p className="font-sans text-sm font-medium tracking-wide text-stamp">
                    {line.text}
                  </p>
                  {line.phonetic ? (
                    <p className="mt-0.5 font-mono text-xs text-muted">{line.phonetic}</p>
                  ) : null}
                </div>
              ) : null}
              {line.kind === "note" ? (
                <div className="rounded-[var(--radius-sm)] bg-paper-deep px-3 py-2">
                  <p className="font-sans text-sm text-muted">{line.text}</p>
                  {line.phonetic ? (
                    <p className="mt-0.5 font-mono text-xs text-muted/80">{line.phonetic}</p>
                  ) : null}
                </div>
              ) : null}
            </li>
          ))}
        </ol>
      </div>

      <nav className="mt-8 grid gap-3 sm:grid-cols-2">
        {prev ? (
          <Link
            to="/chapter/$id"
            params={{ id: prev.id }}
            className="flex min-h-14 items-center gap-2 rounded-[var(--radius-lg)] border border-line bg-sheet px-4 py-3 hover:bg-paper-deep"
          >
            <ChevronLeft className="size-4 shrink-0 text-muted" />
            <span className="min-w-0">
              <span className="block text-xs uppercase tracking-wider text-muted">Previous</span>
              <span className="block truncate font-medium text-ink">{prev.title}</span>
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            to="/chapter/$id"
            params={{ id: next.id }}
            className="flex min-h-14 items-center justify-end gap-2 rounded-[var(--radius-lg)] border border-line bg-sheet px-4 py-3 text-right hover:bg-paper-deep"
          >
            <span className="min-w-0">
              <span className="block text-xs uppercase tracking-wider text-muted">Next</span>
              <span className="block truncate font-medium text-ink">{next.title}</span>
            </span>
            <ChevronRight className="size-4 shrink-0 text-muted" />
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
