---
id: ZBLK-007
type: blocker
date: 2026-06-06
tags: [pnpm, path, launch-json, preview-start, subprocess]
status: résolu
---

# ZBLK-007 — pnpm absent du PATH subprocess → `preview_start` ENOENT + node_modules absents

## Friction

Tentative de lancer le dev server via `preview_start` (nom: "dev") après création de `.claude/launch.json` avec `runtimeExecutable: "pnpm"`. Deux problèmes distincts :

1. **ENOENT** : le binaire `pnpm` n'est pas dans le PATH du subprocess lancé par `preview_start` — même si `pnpm` est accessible dans le terminal utilisateur
2. **node_modules absents** : le projet venait d'être cloné / la session reprenait sur une machine fraîche — `node_modules/` non présent, build impossible

## Résolution

**Problème 1** — Modifier `.claude/launch.json` :

```json
{
  "runtimeExecutable": "npx",
  "runtimeArgs": ["pnpm", "run", "dev"]
}
```

`npx` est dans le PATH standard Node.js et peut résoudre `pnpm` sans installation globale.

**Problème 2** — Installer les dépendances avant de lancer :

```bash
npx pnpm install
```

Puis relancer `preview_start`.

## Références

- [BDR-014](../../decisions/BDR-014.md) — décision architecturale résultante (launch.json config)
