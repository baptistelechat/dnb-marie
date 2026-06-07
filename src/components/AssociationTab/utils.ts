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
    const next = newPool.pop()!;

    // Left: replace in place — le nouveau pays hérite de la position de l'ancien (stabilité visuelle)
    const newLeftOrder = prev.leftOrder.map((c) =>
      c === matchedCode ? next.countryCode : c,
    );

    // Right: replace puis swap aléatoire pour que la capitale n'arrive jamais au même slot que le pays
    const newRightOrder = [...prev.rightOrder];
    const matchedIdx = newRightOrder.indexOf(matchedCode);
    newRightOrder[matchedIdx] = next.countryCode;
    if (newRightOrder.length > 1) {
      let swapIdx = Math.floor(Math.random() * (newRightOrder.length - 1));
      if (swapIdx >= matchedIdx) swapIdx++;
      const tmp = newRightOrder[matchedIdx]!;
      newRightOrder[matchedIdx] = newRightOrder[swapIdx]!;
      newRightOrder[swapIdx] = tmp;
    }

    return {
      pool: newPool,
      display: prev.display.map((p) =>
        p.countryCode === matchedCode ? next : p,
      ),
      leftOrder: newLeftOrder,
      rightOrder: newRightOrder,
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
