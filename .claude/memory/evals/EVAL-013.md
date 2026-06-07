---
id: EVAL-013
type: eval
date: 2026-06-07
tags: [quiz, timer, react, ux]
---

# EVAL-013 — Bouton GO! ajouté aux 4 onglets quiz

| Output                                                                                                                                                                                                                                   | Statut |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| Bouton GO! implémenté dans MapQuizTab (Carte EU), FranceMapQuizTab (Carte France), CapitalsQuizTab (Flashcards UE) et FranceCapitalsQuizTab (Flashcards France). Timer démarre au clic GO au lieu de la première réponse. Lint 0 erreur. | keep   |

## Détail

- `handleGo` callback (`useCallback(() => setTimerStartedAt(Date.now()), [])`) ajouté dans les 4 composants
- `timerStartedAt` retiré des deps arrays de `handleSubmit` et `handleSkip` (plus utilisé à l'intérieur)
- JSX conditionnel : bloc GO affiché tant que `timerStartedAt === null`, composant interactif affiché sinon
- Labels contextuels : "X pays à identifier" (Carte EU + Flashcards UE), "X régions à identifier" (Carte France + Flashcards France)
- Pour les flashcards (toujours en mode dirigé implicite), le GO remplace `QuizCard + AnswerInput` dans un fragment `<></>`

## Références

- [BDR-011](../decisions/BDR-011.md)
- [LRN-012](../learnings/LRN-012.md)
