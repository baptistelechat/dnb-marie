import { EU_COUNTRIES } from "../../data/euCountries";
import type { AssociationBoardState, AssociationPair } from "./types";

const DISPLAY_SIZE = 5;

const shuffle = <T>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = a[i];
    a[i] = a[j]!;
    a[j] = tmp!;
  }
  return a;
};

export const initBoard = (): AssociationBoardState => {
  const all = shuffle(
    EU_COUNTRIES.map(
      (c): AssociationPair => ({
        countryCode: c.code,
        country: c.name,
        capital: c.capital,
      }),
    ),
  );
  const display = all.slice(0, DISPLAY_SIZE);
  const pool = all.slice(DISPLAY_SIZE);
  const codes = display.map((p) => p.countryCode);
  return {
    pool,
    display,
    leftOrder: shuffle([...codes]),
    rightOrder: shuffle([...codes]),
  };
};

export const updateBoardAfterMatch = (
  prev: AssociationBoardState,
  matchedCode: string,
): AssociationBoardState => {
  const newPool = [...prev.pool];

  if (newPool.length > 0) {
    // Remplace en place : le nouvel item prend exactement la position de l'item retiré
    const next = newPool.pop()!;
    return {
      pool: newPool,
      display: prev.display.map((p) =>
        p.countryCode === matchedCode ? next : p,
      ),
      leftOrder: prev.leftOrder.map((c) =>
        c === matchedCode ? next.countryCode : c,
      ),
      rightOrder: prev.rightOrder.map((c) =>
        c === matchedCode ? next.countryCode : c,
      ),
    };
  }

  // Pool vide → retire simplement (colonne rétrécit en fin de partie)
  return {
    pool: newPool,
    display: prev.display.filter((p) => p.countryCode !== matchedCode),
    leftOrder: prev.leftOrder.filter((c) => c !== matchedCode),
    rightOrder: prev.rightOrder.filter((c) => c !== matchedCode),
  };
};
