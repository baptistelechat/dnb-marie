---
id: EVAL-004
type: eval
date: 2026-06-03
tags: [haptics, react, refactoring, web-haptics]
---

# EVAL-004 — `useHaptics()` hook centralisé — fix cancel+trigger, patterns success/error

| Output                                                                                                          | Fichier                       | Action |
| --------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------ |
| Hook `useHaptics()` exposant `tick()` / `success()` / `error()` avec `cancel()` avant `trigger()` dans `tick()` | `src/utils/hapticPatterns.ts` | keep   |

## État au 2026-06-03

- Lint : 0 erreur ✅
- Build : 0 erreur, 347 kB ✅
- `EuropTab` et `MapQuizTab` migrés sur `useHaptics()`
- Pattern `error()` défini mais non câblé dans l'UI (pas de feedback erreur encore dans MapQuizTab)

## À faire si `error()` est utilisé

Câbler `error()` dans `handleSubmit` de `MapQuizTab` quand `!correct`.
