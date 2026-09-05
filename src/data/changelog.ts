export type ChangelogEntry = {
  version: string;
  date: string; // e.g. "2026-09-05"
  title: string;
  changes: string[];
};

/**
 * Newest first. Add a new entry here whenever a shipped change is worth
 * telling readers about — the `/whats-new` page just renders this list.
 */
export const changelog: ChangelogEntry[] = [
  {
    version: "1.3.0",
    date: "2026-09-05",
    title: "Vietnamese meaning",
    changes: [
      "Added a translate button next to every line — tap it to reveal the Vietnamese meaning of the whole sentence, in context.",
      "Hidden by default, so you can try reading and listening first, then check yourself.",
    ],
  },
  {
    version: "1.2.0",
    date: "2026-09-05",
    title: "Read-aloud",
    changes: [
      "Added a speaker button next to every line — hear it read aloud in American English (browser text-to-speech, no download needed).",
      "Only one line plays at a time; starting a new one stops whatever was playing.",
    ],
  },
  {
    version: "1.1.0",
    date: "2026-09-05",
    title: "American-English phonetics",
    changes: [
      "Every line now has a General American IPA transcription underneath the English text.",
      '"｜" marks a natural speech pause (comma, dash, sentence break) inside a line.',
    ],
  },
  {
    version: "1.0.0",
    date: "2026-09-05",
    title: "Launch",
    changes: [
      "Doraemon Volume 1 (16 chapters) as a clean, readable English script.",
      "OCR line-breaks joined into full sentences; spelling, names, and grammar corrected.",
      'Chapter search, adjustable type size, and a "What was fixed" page explaining the corrections.',
    ],
  },
];
