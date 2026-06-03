---
id: EVAL-006
type: eval
date: 2026-06-03
tags: [game, leaderboard, react, build, timer]
---

# EVAL-006 — Chronomètre + Leaderboard + Bouton Passer + Ancienneté scores

| Output                                                                                                                                                                                                                            | Fichiers clés                                                                                                                                                       | Action |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| Mode dirigé enrichi : Timer (MM:SS, tabular-nums), modal GameOver avec saisie prénom + leaderboard localStorage top-10 trié, bouton "Passer" qui requeue et affiche la réponse, ancienneté relative sous chaque nom du classement | `MapQuizTab/index.tsx`, `components/Timer.tsx`, `components/GameOverModal.tsx`, `hooks/useLeaderboard.ts`, `components/QuizPanel.tsx`, `components/ResultBadge.tsx` | keep   |

## État au 2026-06-03

- Lint : 0 erreur ✅
- Build : 0 erreur ✅
- Timer démarre au premier submit (pas à l'activation du mode) ✅
- Leaderboard trié : `firstTryScore DESC, totalTimeSeconds ASC`, top 10 localStorage ✅
- Entrée courante surlignée en violet clair dans le classement post-save ✅
- Bouton Passer : compte comme tentative, pas dans `firstAttemptCodes`, requeue aléatoire ✅
- Ancienneté : `formatAge()` — 5 buckets (aujourd'hui / hier / il y a Xj / il y a X sem / il y a X mois) ✅
- Screenshot validé visuellement (preview avec scores simulés) ✅

## À surveiller

- Pas de confirmation avant "Rejouer" (perte du score courant sans sauvegarde) — non signalé comme problème pour l'instant
