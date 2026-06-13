import { HISTORICAL_FIGURES } from "../../data/historicalFigures";
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

// Chaque partie, tire un keyword aléatoire par personnage en garantissant
// l'unicité sur l'ensemble des 11 paires — évite d'afficher deux fois le même
// mot-clé dans la colonne droite, même quand plusieurs personnages partagent un
// concept (ex: "Résistance" pour de Gaulle et Moulin).
const buildUniqueKeywordPairs = (): AssociationPair[] => {
  const used = new Set<string>();
  return shuffle([...HISTORICAL_FIGURES]).map((f): AssociationPair => {
    const keyword =
      shuffle([...f.keywords]).find((kw) => !used.has(kw)) ?? f.primaryKeyword;
    used.add(keyword);
    return { countryCode: f.id, country: f.name, capital: keyword };
  });
};

export const initBoard = (): AssociationBoardState => {
  const all = shuffle(buildUniqueKeywordPairs());
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
