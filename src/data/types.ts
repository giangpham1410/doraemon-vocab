export type LineKind = "dialogue" | "sfx" | "narration" | "note";

export type Line = {
  speaker?: string;
  kind: LineKind;
  text: string;
  /** American English (GA) IPA transcription of `text`, e.g. "/trʌst mi ｜ ju woʊnt bi ˈɡetɪŋ ˈeniθɪŋ ɡʊd/". */
  phonetic?: string;
  /** Vietnamese translation of the whole sentence in `text`, shown on demand as a reading aid. */
  meaning?: string;
};

export type Fix = {
  original: string;
  corrected: string;
  reason: string;
};

export type Chapter = {
  id: string;
  number: number;
  title: string;
  ocrTitle: string;
  pages: string;
  summary: string;
  lines: Line[];
};
