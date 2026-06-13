---
id: ZBLK-011
type: blocker
date: 2026-06-06
tags: [normalizeAnswer, quiz, unicode, apostrophe]
status: résolu
---

# ZBLK-011 — "Provence-Alpes-Côte d'Azur" refusé au quiz : U+2019 mobile absent du regex

| Friction                                                                                                        | Cause réelle                                                                                                                                                                                                  | Solution                                                               | Statut |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------ |
| "Provence-Alpes-Côte d'Azur" saisi correctement rejeté en quiz sur mobile (et parfois desktop avec autocorrect) | iOS/Android remplacent `'` (U+0027) par `'` (U+2019, right single quotation mark) lors de la frappe. Le regex `['''–—\`-]`dans`normalizeAnswer` ne contenait que U+0027 (dupliqué) — U+2018 et U+2019 absents | Ajout de U+2018 et U+2019 dans le character class de `normalizeAnswer` | résolu |

## Détail

Le regex original contenait les codepoints : U+0027, U+0027 (doublon), U+2014, U+0060, U+002D.
Après fix, 7 codepoints : U+0027, U+2018, U+2019, U+2013, U+2014, U+0060, U+002D.

Vérification byte-by-byte via Node.js `.mjs` avec `String.fromCharCode()` pour chaque codepoint pour contourner les problèmes d'encodage shell.

## Références

- [BDR-020](../../decisions/BDR-020.md) — décision d'extension du regex
- [ZBLK-012](ZBLK-012.md) — même root cause, variante tiret iOS
