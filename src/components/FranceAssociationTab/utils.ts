import { FRENCH_REGIONS } from "../../data/frenchRegions";
import type {
  AssociationBoardState,
  AssociationPair,
} from "../AssociationTab/types";

export { updateBoardAfterMatch } from "../AssociationTab/utils";

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
    FRENCH_REGIONS.map(
      (r): AssociationPair => ({
        countryCode: r.code,
        country: r.name,
        capital: r.capital,
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
