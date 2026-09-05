import type { Fix } from "./types";

export const headlineFixes: { title: string; detail: string }[] = [
  {
    title: "Broken line wraps",
    detail:
      "OCR kept manga balloon line breaks, so complete sentences were split across many short lines. Those have been joined into normal English sentences.",
  },
  {
    title: "OCR letter errors",
    detail:
      "Common scan mistakes: U/V, I/L, O/D, S/F, and all-caps page headers (FIABAL, FRAGA, FIAGAT) that were not dialogue.",
  },
  {
    title: "Names and titles",
    detail:
      "Doremon → Doraemon, SHIZLU-chan → Shizu-chan, KOBE ABE → Abekonbe, UMA-TAKE → bamboo horse (stilts), OO WILL AA WITH XX → The Anything-Goes Memo Pad.",
  },
  {
    title: "SFX labels",
    detail:
      "Several sound-effect tags were read as SEX: instead of SFX:. Those are restored.",
  },
  {
    title: "Upside-down page",
    detail:
      "The Reverse Cream page was printed upside-down on purpose. The OCR came out as reversed letters; the English is restored in reading order.",
  },
];

export const sampleFixes: Fix[] = [
  {
    original: "PLEASE, DON'T ASK\nSO MANY GUESTIONS,\nAT ONCE, YOU'LL GIVE.",
    corrected: "Please, don’t ask so many questions at once. You’ll give me a headache.",
    reason: "Joined three balloon lines; GUESTIONS → questions; restored the missing word “headache” from context.",
  },
  {
    original: "HANGING IN 30,\nBURNING IN 40,\nIS My FATE\nTHAT TERRIBLES?",
    corrected: "Hanging at thirty, burning at forty… is my fate that terrible?",
    reason: "Joined the sentence; TERRIBLES → terrible.",
  },
  {
    original: "I'M SUCH AN\nLiam IDIOT! 1 WAS\nWAY I WOULD\nHANG MYSELF. JUST DREAMING.",
    corrected: "I’m such an idiot! I was just dreaming. No way I would hang myself.",
    reason: "OCR junk (“Liam”, “1 WAS”) removed; clauses put back in spoken order.",
  },
  {
    original: "YOU ALWAYS LOSES",
    corrected: "You always lose!",
    reason: "Subject-verb agreement.",
  },
  {
    original: "I'D NEVER MARRY\nAN AWEFUL GIRL\nLIKE YOU!",
    corrected: "I’d never marry an awful girl like you!",
    reason: "Joined lines; AWEFUL → awful.",
  },
  {
    original: "YOU DION'T HAVE\nTO PAINT MY FACE\nBLACK FOR REAL,",
    corrected: "You didn’t have to paint my face black for real!",
    reason: "DION'T → didn’t.",
  },
  {
    original: "YOU SHOULD ALWAYS LOOK\nAHEAD WHEN YOU'RE *F,\nWALKING. YOU COULD RLIN",
    corrected: "You should always look ahead when you’re walking. You could run into something.",
    reason: "Joined the sentence; RLIN → run; dropped OCR noise *F.",
  },
  {
    original: "WHAT'RE YOU POING!?\nI'M BEING SCOLDED\nOWER HERE, AND ALL\nYOU'RE BOING IS\nPLAYING A FLUTE!",
    corrected: "What are you doing!? I’m being scolded over here, and all you’re doing is playing a flute!",
    reason: "POING/BOING → doing; OWER → over.",
  },
  {
    original: "SEX: PIEEEEE",
    corrected: "SFX: Pieeeee—",
    reason: "Sound-effect tag, not the word “sex”.",
  },
  {
    original: "TOYOTOMI\nHIPEYOSHI",
    corrected: "Toyotomi Hideyoshi",
    reason: "Historical name; HIPEYOSHI → Hideyoshi.",
  },
  {
    original: "TM NOBISAKL,\nA HUNTER.",
    corrected: "I’m Nobisaku, a hunter.",
    reason: "TM → I’m; NOBISAKL → Nobisaku.",
  },
  {
    original: "I'M A BAP\nWIPDLE",
    corrected: "I’m a bad person.",
    reason: "BAP WIPDLE → bad person.",
  },
  {
    original: "KOUSE Me le a? ese LET'S GO\nHave some | iee| | ~PUtet BUY MORE.\nPFEFFER?",
    corrected: "Excuse me. Let’s go buy more. Do you have some pepper?",
    reason: "Heavy OCR damage; reconstructed from remaining words (pepper / buy more).",
  },
  {
    original: "OTOSHIDAMA* OF\nONE MILLION YEN",
    corrected: "an otoshidama of one million yen",
    reason: "Kept the Japanese New Year term and joined the broken line.",
  },
  {
    original: "KOBE ABE",
    corrected: "Abekonbe (The Opposite Flute)",
    reason: "Table-of-contents OCR of あべこんべ, the opposite-flute gadget.",
  },
  {
    original: "OO WILL AA WITH & &",
    corrected: "The Anything-Goes Memo Pad",
    reason: "Illegible TOC line; title taken from the actual story (the memo pad that grants appointments).",
  },
  {
    original: "SHIZLU-CHAN",
    corrected: "Shizu-chan",
    reason: "Name OCR; L for K-like scan noise.",
  },
  {
    original: "HOLISE / RLIN / BIPN'T / DISTINGLIISHED / FEUPAL",
    corrected: "house / run / didn’t / distinguished / feudal",
    reason: "Typical I/L/U scan substitutions.",
  },
];

export const grammarNotes: { issue: string; example: string }[] = [
  {
    issue: "Subject–verb agreement",
    example: "“You always loses” → “You always lose.”",
  },
  {
    issue: "Missing articles and prepositions",
    example: "“save you from your terrible” → “save you from your terrible fate.”",
  },
  {
    issue: "Tense consistency",
    example: "Prophecy lines mixed past and present; kept present for live warnings, past for the future album.",
  },
  {
    issue: "Comma splices after joining balloons",
    example: "Balloon fragments became one sentence with a comma or a period, not a stack of clauses.",
  },
  {
    issue: "Honorifics",
    example: "Kept -chan / -kun / -san as in the scanlation (Shizu-chan, Sewashi-kun, Suneo-san).",
  },
];
