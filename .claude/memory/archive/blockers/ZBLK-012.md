---
id: ZBLK-012
type: blocker
date: 2026-06-06
tags: [normalizeAnswer, quiz, unicode, en-dash, ios]
status: résolu
---

# ZBLK-012 — "St Denis" rejeté : tiret iOS U+2013 + `\bst\b` sans frontière mot

| Friction                                                                                                    | Cause réelle                                                                                                                                                                                                                                              | Solution                                                                                                                        | Statut |
| ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------ |
| "st denis" (abréviation de Saint-Denis) rejeté sur mobile ; l'app attendait la forme complète "saint-denis" | Double problème : (1) iOS/Android remplacent `-` (U+002D) par `–` (U+2013, en-dash) lors de la frappe rapide → "st–denis" avec U+2013. (2) `\bst\b` ne reconnaît pas U+2013 comme séparateur de mot en JS → `expandAbbreviations()` ne développe pas "st" | Ajout de U+2013 et U+2014 dans le character class → U+2013 converti en espace avant `expandAbbreviations`, `\bst\b` matche "st" | résolu |

## Pipeline après fix

`"st–denis"` → replace U+2013→` ` → `"st denis"` → `\bst\b` matche → `"saint denis"` ✓

## Références

- [BDR-020](../../decisions/BDR-020.md) — décision d'extension du regex
- [ZBLK-011](ZBLK-011.md) — même root cause, variante apostrophe
