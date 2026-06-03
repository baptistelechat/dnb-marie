---
id: EVAL-005
type: eval
date: 2026-06-03
tags: [map, quiz, react-simple-maps, build]
---

# EVAL-005 — Carte Europe N&B + markers + layout full-width + mode dirigé Option B + nav clavier

| Output                                                                                                                                                                                                    | Fichiers clés                                                                      | Action |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------ |
| Carte N&B avec pays trouvés en candy-purple, markers SVG pour petits pays EU, layout full-width flex-row desktop, mode dirigé continue jusqu'à 100% avec score premier essai, navigation clavier complète | `EuropeMap.tsx`, `MapQuizTab/index.tsx`, `QuizPanel.tsx`, `shared/ProgressBar.tsx` | keep   |

## État au 2026-06-03

- Lint : 0 erreur ✅
- Build : 0 erreur, 350 kB / 114 kB gzip ✅
- 27 IDs world-atlas vérifiés (tous matchent après fix `"040"`/`"056"`) ✅
- Markers : BE, LU, SI, MT, CY ✅
- Mode dirigé : requeue aléatoire + écran de fin + score premier essai ✅
- Nav clavier : Tab nom → Tab capitale → Enter soumettre → Enter pays suivant ✅

## À surveiller

- `error()` haptic non câblé sur réponse incorrecte en mode dirigé (voir [EVAL-004](EVAL-004.md))
- Markers : taille `r=6` à ajuster si retour mobile indique une cible trop petite
