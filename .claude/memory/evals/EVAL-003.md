---
id: EVAL-003
type: eval
date: 2026-06-02
tags: [react, map, quiz, build]
action: keep
---

# EVAL-003 — MapQuizTab : quiz carte Europe interactive

## Output

Nouvel onglet "Carte Quiz" complet pour dnb-marie :

- **Carte SVG** interactive via `react-simple-maps` (27 pays UE, candy colors cycliques)
- **Mode libre** : clic sur un pays → formulaire nom + capitale
- **Mode dirigé** : pays sélectionné aléatoirement qui pulse (Fisher-Yates) → file de 27 pays
- **Indice drapeau** : toggle affiche `<CountryFlag svg />` du pays ciblé
- **Normalisation** : accent/casse tolérante (`answersMatch` via NFD + strip diacritiques)
- **Haptics** : `trigger(40)` sur chaque réponse, `trigger("success")` + confetti double salve à 27/27
- **Build** : lint 0 erreur, build clean — 346 kB JS / 113 kB gzip (+131 kB vs session précédente)

## Dépendances ajoutées

- `react-simple-maps` 3.0.0
- `topojson-client` 3.1.0
- `@types/topojson-client` 3.1.5
- `@types/d3-geo` 3.1.0

## Fichiers clés

`src/components/MapQuizTab/` (index + 6 sous-composants) · `src/utils/normalizeAnswer.ts` · `src/types/react-simple-maps.d.ts`
