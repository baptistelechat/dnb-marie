---
id: ZBLK-001
type: blocker
date: 2026-06-02
tags: [npm, arborist, windows]
---

# ZBLK-001 — npm 10.8.3 crash `Cannot read properties of null (reading 'matches')`

| Friction                                             | Cause réelle                                                                          | Solution                                                     | Statut |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------ |
| `npm install` et `npm add` échouent systématiquement | Bug dans `@npmcli/arborist` `Link.matches()` — null reference dans `pruneDedupable()` | Remplacer npm par pnpm (projet sur disque local, pas de SMB) | résolu |
