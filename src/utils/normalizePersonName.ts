import { normalizeAnswer } from "./normalizeAnswer";

export const normalizePersonName = (raw: string): string =>
  normalizeAnswer(raw);

// Accepte les noms partiels : "De Gaulle" valide pour "Le général de Gaulle"
export const personNamesMatch = (input: string, expected: string): boolean => {
  const normInput = normalizePersonName(input);
  const normExpected = normalizePersonName(expected);
  if (normInput.length < 3) return false;
  return normExpected === normInput || normExpected.includes(normInput);
};
