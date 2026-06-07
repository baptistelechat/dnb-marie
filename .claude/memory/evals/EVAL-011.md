---
id: EVAL-011
type: eval
date: 2026-06-06
tags: [normalizeAnswer, testing, unicode, node]
---

# EVAL-011 — `normalizeAnswer` fix unicode mobile — validé via tests Node.js `.mjs`

| Output                                                                                                                                     | Méthode eval                                                                                                                                  | Anomalies | Action |
| ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------ |
| `normalizeAnswer` avec character class étendu (7 codepoints) couvrant les variantes unicode mobiles iOS/Android pour apostrophes et tirets | Script `.mjs` Node.js utilisant `String.fromCharCode(0x2019)` etc. pour tester chaque codepoint + simulate pipeline complet sur "Côte d'Azur" | Aucune    | keep   |

## Détails

Test positifs confirmés :

- `normalize("Côte d'Azur") === normalize("Côte d’Azur")` → `true`
- `normalize("saint-denis") === normalize("saint–denis")` → `true`
- `normalize("st denis") === normalize("st–denis")` → `true` (via expand)

> Méthode de test : écrire le script via `Write` tool avec `String.fromCharCode()` puis `node script.mjs` — évite les problèmes d'encodage shell/heredoc sur Windows.

## Références

- [BDR-020](../decisions/BDR-020.md) — décision d'extension du regex
