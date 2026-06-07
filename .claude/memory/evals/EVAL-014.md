---
id: EVAL-014
type: eval
date: 2026-06-07
tags: [association, game, react, leaderboard, build]
---

# EVAL-014 — AssociationTab — mini-jeu association pays/capitales UE complet

| Output                                                                                                                                                                                                                                                                                                                     | Statut |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| Implémentation complète de l'onglet Association : 5 paires sur 27 affichées simultanément, 2 colonnes indépendamment brassées, sélection bidirectionnelle avec auto-évaluation, fade-out sur match, shake rouge sur erreur, haptics, score premier essai, timer GO!, leaderboard localStorage. Lint 0 erreur, build clean. | keep   |

## Détail

- **Plateau** : `pool` (22 paires en attente) + `display` (5 actives) + `leftOrder`/`rightOrder` indépendants — replace-in-place sur match
- **Interaction** : clic colonne gauche puis droite (ou inversement), évaluation automatique dès que les deux colonnes ont une sélection active
- **Feedback** : `fadingOut` Set → opacity 0 + scale 0.9 en 350 ms ; `shakingPair` → `@keyframes shake` 500 ms + fond rouge ; haptics tick/success/error
- **Score** : `firstTryCodes` Set — un pays n'est compté que si `!failedCodes.has(code)` au moment du match
- **Timer + GO!** : même pattern que les autres onglets (`timerStartedAt === null` → bloc GO)
- **Leaderboard** : `useAssociationLeaderboard` hook, localStorage clé `dnb-association-leaderboard`, top 10, `AssociationLeaderboardEntry` inclut `totalCountries: 27`
- Build : 432 kB / 128 kB gzip

## Références

- [BDR-021](../decisions/BDR-021.md) — architecture AssociationBoardState
- [BDR-022](../decisions/BDR-022.md) — replace-in-place stabilité positionnelle
- [BLK-013](../blockers/BLK-013.md) — dev-browser absent PATH
