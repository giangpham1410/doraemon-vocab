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

// --- Read-aloud (Web Speech API) -------------------------------------------
//
// Browser-native TTS: free, no server, no API key. The tricky part is picking
// an actual English voice — left to its default, some browsers speak English
// text using the OS/browser display-language voice (e.g. a Vietnamese voice
// reading English letters phonetically), which is worse than no audio at all.

let cachedVoices: SpeechSynthesisVoice[] = [];
let voicesPromise: Promise<SpeechSynthesisVoice[]> | null = null;

function hasSpeechSynthesis(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  if (!hasSpeechSynthesis()) return Promise.resolve([]);
  const existing = window.speechSynthesis.getVoices();
  if (existing.length) {
    cachedVoices = existing;
    return Promise.resolve(existing);
  }
  if (!voicesPromise) {
    voicesPromise = new Promise((resolve) => {
      const finish = () => {
        cachedVoices = window.speechSynthesis.getVoices();
        resolve(cachedVoices);
      };
      window.speechSynthesis.addEventListener("voiceschanged", finish, { once: true });
      // Some browsers never fire voiceschanged if the list is already cached
      // internally by the time we ask again — don't hang forever on those.
      setTimeout(finish, 500);
    });
  }
  return voicesPromise;
}

function pickEnglishVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  return (
    voices.find((v) => v.lang?.toLowerCase() === "en-us") ??
    voices.find((v) => v.lang?.toLowerCase().startsWith("en")) ??
    undefined
  );
}

/**
 * Speak `text` as American English. Cancels whatever was playing first, so
 * only one line is ever audible at a time. Returns the SpeechSynthesisUtterance
 * so callers can listen for "end"/"error" to clear their own "now playing" state
 * (resolves to null when the browser has no speech support, e.g. during SSR).
 */
export async function speakEnglish(
  text: string,
  handlers?: { onEnd?: () => void },
): Promise<SpeechSynthesisUtterance | null> {
  if (!hasSpeechSynthesis()) return null;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 1;
  const voices = cachedVoices.length ? cachedVoices : await loadVoices();
  const voice = pickEnglishVoice(voices);
  if (voice) utterance.voice = voice;
  if (handlers?.onEnd) {
    utterance.addEventListener("end", handlers.onEnd);
    utterance.addEventListener("error", handlers.onEnd);
  }
  window.speechSynthesis.speak(utterance);
  return utterance;
}

export function stopSpeaking() {
  if (hasSpeechSynthesis()) window.speechSynthesis.cancel();
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
