---
id: EVAL-017
date: 2026-06-09
title: docs/roadmap-histoire.md — roadmap 12 phases, 9 décisions tranchées, interfaces TS définies, système score intégré
tags: [roadmap, histoire, planning]
action: keep
---

## Output

Fichier `docs/roadmap-histoire.md` — feuille de route complète pour le module Histoire de dnb-marie.

## Contenu

- **12 phases** : Phase 0 (nav refactoring) → Phase 1 (data + photos + validation) → Phase 1b (infrastructure HintButton/GameOverModal) → Phases 2–9 (mini-jeux Dates + Personnages) → Phase 10 (retrofit UE/France)
- **9 décisions tranchées** dans un tableau récapitulatif (dnd-kit, normalisation, scoring, HintButton, etc.)
- **Interfaces TypeScript** définies : `HistoricalDate` (avec `type`/`sortKey`/`endSortKey`) et `HistoricalFigure` (avec `keywords[]`, `photos[]`)
- **Table de données initiale** : 20 dates historiques + 11 personnages avec métadonnées
- **Système de score unifié** ★/💡/❌ documenté et intégré à toutes les phases concernées
- **Bloquants identifiés** : photos sourcing + validation pédagogique avec Marie (⛔ avant Phase 2)
- **Priorités de développement** : tableau 12 entrées ordonnées

## Statut au moment de l'éval

Roadmap challengée via session Rodin — cohérence interne vérifiée, nommage ambigu résolu (Frise/Ordonner), infrastructure partagée extraite en Phase 1b. Prête pour le développement.
