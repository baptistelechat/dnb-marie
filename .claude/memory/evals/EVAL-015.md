---
id: EVAL-015
type: eval
date: 2026-06-07
tags: [association, france, react, build]
---

# EVAL-015 — FranceAssociationTab — 18 paires région ↔ chef-lieu

| Output                                                                                                                                                                                                                                     | Statut |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| Onglet Association France opérationnel : 18 régions (13 métropole + 5 DOM) associées à leur chef-lieu, plateau de 5 paires simultanées, leaderboard localStorage séparé, labels "Régions"/"Chef-lieux". Lint 0 erreur, build clean 437 kB. | keep   |

## Détail

- **Données** : `FRENCH_REGIONS` (18 entrées), `countryCode = region.code` INSEE
- **Labels** : `leftLabel="Régions"` / `rightLabel="Chef-lieux"` via props `AssociationBoard`
- **Leaderboard** : clé `dnb-france-association-leaderboard` — isolé du leaderboard UE
- **Modal fin de partie** : `totalCountries={18}` — plus de `/27` hardcodé
- **Réutilisation** : `AssociationBoard`, `AssociationGameOverModal`, `AssociationBoardState`, `updateBoardAfterMatch` — zéro duplication de logique

## Références

- [BDR-023](../decisions/BDR-023.md) — décision d'architecture FranceAssociationTab
