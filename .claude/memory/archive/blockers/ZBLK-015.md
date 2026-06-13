---
id: ZBLK-015
type: blocker
date: 2026-06-12
tags: [timeline, anti-collision, algorithm, histoire, debugging]
---

# ZBLK-015 — Anti-collision labels timeline : 4 itérations pour converger

| Friction                                                              | Cause réelle                                                                                                                                                                                                                                                           | Solution                                                                                                                                                                 | Statut |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| Labels dates/ranges se chevauchent malgré plusieurs tentatives de fix | 4 root causes successives indépendantes : (1) maps séparées ranges/points (ignorance mutuelle), (2) tracking top-to-top au lieu de bottom-to-top, (3) badges de graduation non traités comme obstacles, (4) label de range ancré au centre de la barre au lieu du haut | Algorithme unifié `computeAllLabelsYMap` : une seule map pour tous les types, tracking `lastBottom`, `badgeZones` comme obstacles fixes, ancrage au haut pour les ranges | résolu |

## Références

- [LRN-025](../../learnings/LRN-025.md) — algorithme anti-collision unifié
- [BDR-039](../../decisions/BDR-039.md) — ancrage au haut de la barre
