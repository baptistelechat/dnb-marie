---
id: ZBLK-004
type: blocker
date: 2026-06-02
tags: [typescript, build, react-simple-maps, naming]
status: résolu
---

# ZBLK-004 — Build TypeScript : 4 erreurs react-simple-maps (types + Map shadowing)

## Friction

Premier `pnpm build` après intégration de `react-simple-maps` → 4 erreurs TypeScript :

```
TS7016 : Could not find a declaration file for 'react-simple-maps'
TS7031 : Binding element 'geographies' implicitly has an 'any' type
TS7006 : Parameter 'geo' implicitly has an 'any' type
TS7009 : 'new' expression, whose target lacks a construct signature (Map<string, Country>)
TS2558 : Expected 0 type arguments, but got 2
```

## Cause racine

- **TS7016/7031/7006** : react-simple-maps v3 n'a pas de types bundlés
- **TS7009/TS2558** : `import { Map } from 'lucide-react'` shadow le constructor natif `Map` dans le même fichier

## Résolution

1. Créer `src/types/react-simple-maps.d.ts` → [LRN-002](../../learnings/LRN-002.md)
2. Renommer l'import icône : `import { Map as MapIcon } from 'lucide-react'` → voir aussi GLRN-058 dans la mémoire globale

## Références

- [ZBLK-003](ZBLK-003.md) — blocage ESLint précédent de cette session
