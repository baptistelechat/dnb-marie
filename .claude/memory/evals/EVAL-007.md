---
id: EVAL-007
type: eval
date: 2026-06-06
tags: [leaderboard, quiz, react, scoring, directed-mode]
---

# EVAL-007 — LeaderboardPanel mode dirigé + fix firstTryScore (`failedCodes` Set)

| Output | Fichiers clés | Action |
| --- | --- | --- |
| `LeaderboardPanel` affiché sous `QuizPanel` en mode dirigé (entrées vides = non rendu). Fix du scoring `firstTryScore` : ajout `failedCodes` Set pour corriger le comptage premier essai. Validé par Baptiste avec 5 pays réduits puis restauration 27 pays. | `MapQuizTab/index.tsx`, `components/LeaderboardPanel.tsx` | keep |

## État au 2026-06-06

- `LeaderboardPanel` rendu sous `QuizPanel` uniquement en mode dirigé ✅
- Retourne `null` si aucune entrée localStorage ✅
- Affichage : 🥇🥈🥉 top 3, numéros pour le reste ✅
- Colonnes : rang · nom · ancienneté · score X/27 · temps MM:SS ✅
- `firstTryScore` corrigé : `failedCodes.has(code)` exclut les pays déjà ratés/passés ✅
- Testé avec 5 pays réduits + restauration 27 pays ✅
- Lint : non vérifié cette session (pas de modifications de types ou imports)

## Références

- [BDR-013](../decisions/BDR-013.md) — décision `failedCodes`
- [BLK-008](../blockers/BLK-008.md) — bug initial firstTryScore
- [EVAL-006](EVAL-006.md) — état du leaderboard avant cette session
