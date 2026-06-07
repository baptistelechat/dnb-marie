---
register: blockers
last_updated: 2026-06-07
---

## Index

| ID                             | Date       | Friction                                                                                                  | Tags                                          | Statut |
| ------------------------------ | ---------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------- | ------ |
| [BLK-001](blockers/BLK-001.md) | 2026-06-02 | npm 10.8.3 crash `Cannot read properties of null (reading 'matches')`                                     | #npm #arborist                                | résolu |
| [BLK-002](blockers/BLK-002.md) | 2026-06-02 | dev-browser Playwright require() : chemin introuvable, 3+ tentatives                                      | #dev-browser #playwright #windows             | résolu |
| [BLK-003](blockers/BLK-003.md) | 2026-06-02 | ESLint `react-hooks/set-state-in-effect` : 2 occurrences MapQuizTab → refactoring dérivé + key prop       | #eslint #react-hooks #set-state-in-effect     | résolu |
| [BLK-004](blockers/BLK-004.md) | 2026-06-02 | Build TS : react-simple-maps sans types + `Map` natif shadowé par Lucide (4 erreurs)                      | #typescript #build #react-simple-maps #naming | résolu |
| [BLK-005](blockers/BLK-005.md) | 2026-06-03 | Belgique et Autriche invisibles — IDs `"40"`/`"56"` vs `"040"`/`"056"` world-atlas (3+ tentatives)        | #world-atlas #geo #ids                        | résolu |
| [BLK-006](blockers/BLK-006.md) | 2026-06-03 | ESLint `react-hooks/set-state-in-effect` (3ème occurrence) — setTimerStoppedAt + setShowGameOver          | #eslint #react-hooks #set-state-in-effect     | résolu |
| [BLK-007](blockers/BLK-007.md) | 2026-06-06 | pnpm absent du PATH subprocess → `preview_start` ENOENT + node_modules absents                            | #pnpm #path #launch-json                      | résolu |
| [BLK-008](blockers/BLK-008.md) | 2026-06-06 | firstTryScore = 27/27 quelle que soit la performance — `!answeredCodes.has()` insuffisant après erreur    | #scoring #react-hooks #quiz                   | résolu |
| [BLK-009](blockers/BLK-009.md) | 2026-06-06 | Layout `h-dvh flex-col` global → 3 régressions (scrollbar OS, overlap mobile, texte wrappé)               | #layout #viewport #tailwind #regression       | résolu |
| [BLK-010](blockers/BLK-010.md) | 2026-06-06 | La Réunion coupée — scale=6500 couvre 0.608° mais île fait 0.620° → débordement minimap                   | #react-simple-maps #projection #dom-tom       | résolu |
| [BLK-011](blockers/BLK-011.md) | 2026-06-06 | "Provence-Alpes-Côte d'Azur" refusé au quiz : apostrophe U+2019 mobile absente du regex `normalizeAnswer` | #normalizeAnswer #quiz #unicode #apostrophe   | résolu |
| [BLK-012](blockers/BLK-012.md) | 2026-06-06 | "St Denis" rejeté : tiret iOS U+2013 non couvert + `\bst\b` sans frontière mot avant `–`                  | #normalizeAnswer #quiz #unicode #ios          | résolu |
| [BLK-013](blockers/BLK-013.md) | 2026-06-07 | `dev-browser` absent du PATH — `command not found`, import ESM chemin absolu Windows échoue               | #dev-browser #playwright #windows #esm        | résolu |
