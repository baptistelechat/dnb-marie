---
id: EVAL-010
type: eval
date: 2026-06-06
tags: [map, react-simple-maps, dom-tom, france]
---

# EVAL-010 — FranceMapQuizTab avec 5 DOM-TOM en overlay, projections individuelles et centrage équilibré

| Output                                                                                                                                                                                                                | Méthode eval                                                           | Anomalies | Action |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | --------- | ------ |
| 5 DOM-TOM cliquables (mode libre) / pulsants (mode dirigé) / colorés comme la métropole. Canvas `1000×700` avec zone océan exploitée. Centrage `center_lon=0.44°`, overlay `width=27%` → marges ~17.5% des deux côtés | Lint ESLint 0 erreur ; validation Baptiste de l'ensemble de la feature | Aucune    | keep   |

## Détails

- Guadeloupe, Martinique, Guyane, La Réunion, Mayotte — chacun avec projection individuelle calculée depuis bounding box GeoJSON
- Pas de labels sur les DOM (quiz de mémorisation — l'utilisateur doit les identifier)
- Source GeoJSON : `france-regions-all.geojson` (18 régions incluant outre-mer)
- Métropole : filtrée par `!DOM_CODES.has(code)` dans FranceMap ; DOM filtrés par code individuel dans DomMiniMap

## Références

- [BDR-017](../decisions/BDR-017.md) — architecture overlay
- [BDR-018](../decisions/BDR-018.md) — projections individuelles
