---
id: EVAL-009
type: eval
date: 2026-06-06
tags: [map, layout, viewport, tailwind]
---

# EVAL-009 — Carte Quiz viewport-contraint (EU + France) + fix 3 régressions — validé screenshots desktop+mobile

| Output                                                                                                                                                                             | Méthode eval                                                                                                                     | Anomalies | Action |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | --------- | ------ |
| MapQuizTab + FranceMapQuizTab contraints à la hauteur viewport sur desktop (plus de scroll pour voir la carte + sidebar) ; Liste et Flashcards sans scrollbar ; no overlap à 800px | Screenshots dev-browser : 1280×768 (desktop carte EU), 800×700 (mobile carte EU avant/après scroll interne), 1280×768 Flashcards | Aucune    | keep   |

## Détails

- Desktop 1280×768 : carte EU remplit la zone disponible, sidebar alignée à droite ✅
- Mobile 800px : carte + sidebar empilées sans overlap, scroll interne fonctionnel (contentRow scrollTop 297/711) ✅
- Flashcards 1280×768 : aucune scrollbar OS visible, "Union Européenne" sur une ligne ✅
- Carte France : même comportement que carte EU ✅
