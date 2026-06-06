const expandAbbreviations = (s: string): string =>
  s.replace(/\bste\b/g, "sainte").replace(/\bst\b/g, "saint");

export const normalizeAnswer = (raw: string): string => {
  const base = raw
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/['‘’–—`-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return expandAbbreviations(base);
};

export const answersMatch = (input: string, expected: string): boolean =>
  normalizeAnswer(input) === normalizeAnswer(expected);
