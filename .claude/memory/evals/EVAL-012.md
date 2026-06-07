---
id: EVAL-012
type: eval
date: 2026-06-06
tags: [logos, dom-tom, france, screenshot]
---

# EVAL-012 — Logos DOM-TOM intégrés et validés screenshot dev-browser dans FranceTab

| Output                                                                                                                 | Méthode eval                                          | Anomalies | Action |
| ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | --------- | ------ |
| 5 drapeaux/blasons DOM-TOM (Guadeloupe, Martinique, Guyane, La Réunion, Mayotte) affichés dans les RegionCards de FranceTab | Screenshot dev-browser sur l'onglet France (checklist régions) | Aucune    | keep   |

## Détails

- Source : Wikimedia Commons, format SVG converti en PNG via le pattern thumbnail URL Wikimedia
- Fallback `MapPin` (Lucide) préservé via `onError` dans `RegionCard` — aucun changement dans `RegionCard.tsx` nécessaire
- Les 13 régions métropole + 5 DOM-TOM toutes affichées avec leurs logos

## Références

- [BDR-019](../decisions/BDR-019.md) — décision d'ajout des URLs
