---
id: ZBLK-008
type: blocker
date: 2026-06-06
tags: [scoring, react-hooks, quiz, firstTryScore, failedCodes]
status: résolu
---

# ZBLK-008 — firstTryScore = 27/27 quelle que soit la performance

## Friction

Baptiste signale après une partie complète que le score `firstTryScore` affiche systématiquement 27/27, même après plusieurs mauvaises réponses. Le leaderboard était donc inutile.

## Root cause

La condition pour ajouter un pays à `firstAttemptCodes` était :

```ts
if (!answeredCodes.has(activeCountry.code)) {
  setFirstAttemptCodes((prev) => {
    const n = new Set(prev);
    n.add(code);
    return n;
  });
}
```

**Problème** : après une mauvaise réponse + nouvelle bonne réponse, `answeredCodes` ne contient pas encore le pays (il n'a pas encore été marqué correct). La condition est donc vraie, et le pays est compté comme "premier essai" — alors qu'il ne l'est pas.

## Résolution

Ajout d'un Set `failedCodes` qui marque les pays ayant reçu ≥1 mauvaise réponse ou skip. La condition devient :

```ts
if (
  !failedCodes.has(activeCountry.code) &&
  !answeredCodes.has(activeCountry.code)
) {
  setFirstAttemptCodes((prev) => {
    const n = new Set(prev);
    n.add(code);
    return n;
  });
}
// sur mauvaise réponse ou skip :
setFailedCodes((prev) => {
  const n = new Set(prev);
  n.add(code);
  return n;
});
```

Validé en réduisant EU_COUNTRIES à 5 pays pour test rapide (voir [LRN-009](../../learnings/LRN-009.md)).

## Références

- [BDR-013](../../decisions/BDR-013.md) — décision `failedCodes` Set séparé
- [LRN-009](../../learnings/LRN-009.md) — stratégie de test données réduites
