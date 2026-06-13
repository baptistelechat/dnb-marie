import { normalizeAnswer } from "./normalizeAnswer";

const MONTH_MAP: Record<string, number> = {
  janvier: 1,
  jan: 1,
  fevrier: 2,
  fev: 2,
  feb: 2,
  mars: 3,
  avril: 4,
  avr: 4,
  mai: 5,
  juin: 6,
  juillet: 7,
  juil: 7,
  jul: 7,
  aout: 8,
  septembre: 9,
  sept: 9,
  sep: 9,
  octobre: 10,
  oct: 10,
  novembre: 11,
  nov: 11,
  decembre: 12,
  dec: 12,
};

// Normalise une date pour la comparaison : tolérance sur le format, exactitude sur le contenu.
// Exemples : "11 novembre 1918" = "11/11/1918" = "11 nov 1918" = "11-11-1918" = "11/11/18"
//            "1924–1953" = "1924-1953" = "1924 1953" = "1924/1953"
const normalizeDateStr = (raw: string): string => {
  // normalizeAnswer : lowercase, sans accents, – → espace
  const base = normalizeAnswer(raw)
    .replace(/\//g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const tokens = base.split(" ");
  const mapped = tokens.map((token) => {
    const monthNum = MONTH_MAP[token];
    if (monthNum !== undefined) return String(monthNum);
    if (/^\d+$/.test(token)) return String(parseInt(token, 10));
    return token;
  });
  // Expand année 2 chiffres : "11/11/18" → ["11","11","18"] → "11 11 1918"
  if (mapped.length === 3 && /^\d{2}$/.test(mapped[2] ?? "")) {
    mapped[2] = `19${mapped[2]}`;
  }
  return mapped.join(" ");
};

export const datesMatch = (input: string, expected: string): boolean =>
  normalizeDateStr(input) === normalizeDateStr(expected);
