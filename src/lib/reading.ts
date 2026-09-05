const KEY = "doraemon-vol1:last-chapter";
const SIZE_KEY = "doraemon-vol1:type-size";

export function rememberChapter(id: string) {
  try {
    localStorage.setItem(KEY, id);
  } catch {
    /* ignore */
  }
}

export function lastChapter(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export type TypeSize = "sm" | "md" | "lg";

export function readTypeSize(): TypeSize {
  try {
    const v = localStorage.getItem(SIZE_KEY);
    if (v === "sm" || v === "md" || v === "lg") return v;
  } catch {
    /* ignore */
  }
  return "md";
}

export function saveTypeSize(size: TypeSize) {
  try {
    localStorage.setItem(SIZE_KEY, size);
  } catch {
    /* ignore */
  }
}

export function chapterToPlainText(params: {
  number: number;
  title: string;
  ocrTitle: string;
  pages: string;
  summary: string;
  lines: { kind: string; speaker?: string; text: string }[];
}): string {
  const body = params.lines
    .map((line) => {
      if (line.kind === "sfx") return `(SFX: ${line.text})`;
      if (line.kind === "note") return `[Note] ${line.text}`;
      if (line.kind === "narration") return line.text;
      return line.speaker ? `${line.speaker.toUpperCase()}\n${line.text}` : line.text;
    })
    .join("\n\n");
  return [
    `${params.number}. ${params.title}`,
    `Original TOC: ${params.ocrTitle}`,
    `Pages ${params.pages}`,
    "",
    params.summary,
    "",
    body,
  ].join("\n");
}
