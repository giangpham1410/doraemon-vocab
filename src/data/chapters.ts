import { chapters1to8 } from "./chapters-1-8";
import { chapters9to16 } from "./chapters-9-16";
import type { Chapter } from "./types";

export const chapters: Chapter[] = [...chapters1to8, ...chapters9to16];

export function getChapter(id: string): Chapter | undefined {
  return chapters.find((c) => c.id === id);
}

export function getAdjacent(id: string): { prev?: Chapter; next?: Chapter } {
  const i = chapters.findIndex((c) => c.id === id);
  if (i < 0) return {};
  return { prev: chapters[i - 1], next: chapters[i + 1] };
}

export function searchChapters(q: string): { chapter: Chapter; line: string; speaker?: string }[] {
  const needle = q.trim().toLowerCase();
  if (needle.length < 2) return [];
  const hits: { chapter: Chapter; line: string; speaker?: string }[] = [];
  for (const chapter of chapters) {
    for (const line of chapter.lines) {
      if (line.text.toLowerCase().includes(needle) || line.speaker?.toLowerCase().includes(needle)) {
        hits.push({ chapter, line: line.text, speaker: line.speaker });
        if (hits.length >= 40) return hits;
      }
    }
  }
  return hits;
}
