export const normalizeAnswer = (raw: string): string =>
  raw
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[''`-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export const answersMatch = (input: string, expected: string): boolean =>
  normalizeAnswer(input) === normalizeAnswer(expected);
