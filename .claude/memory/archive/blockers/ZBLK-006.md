---
id: ZBLK-006
type: blocker
date: 2026-06-03
tags: [eslint, react-hooks, set-state-in-effect, timer]
status: résolu
---

# ZBLK-006 — ESLint `react-hooks/set-state-in-effect` (3ème occurrence) — setState fin de partie dans useEffect

## Friction

Ajout du timer + modal game-over dans `MapQuizTab/index.tsx`. La logique de fin de partie (`setTimerStoppedAt`, `setShowGameOver`) placée initialement dans le `useEffect` de détection de complétion → ESLint error `react-hooks/set-state-in-effect`.

## Tentative infructueuse

```ts
// ❌ Placé dans l'useEffect existant qui détecte la fin de partie
useEffect(() => {
  if (directedDone || freeDone) {
    if (!completedRef.current) {
      completedRef.current = true;
      success();
      launchConfetti();
      setTimerStoppedAt(Date.now()); // ← ESLint error
      setShowGameOver(true);          // ← ESLint error
    }
  }
}, [...]);
```

## Résolution

Déplacer les deux setState vers `handleNext`, déclenché quand `queue.length === 1` et `lastResult === "correct"` — l'event handler qui provoque la transition est l'endroit sémantiquement juste.

```ts
if (lastResult === "correct") {
  if (queue.length === 1) {
    setTimerStoppedAt(Date.now()); // ← dans l'event handler ✅
    setShowGameOver(true);
  }
  setQueue((prev) => prev.slice(1));
}
```

## Références

- [ZBLK-003](ZBLK-003.md) — 1ère et 2ème occurrences du même pattern ESLint
- [LRN-007](../../learnings/LRN-007.md) — pattern général de résolution
- [BDR-012](../../decisions/BDR-012.md) — décision architecturale résultante
