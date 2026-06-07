---
id: EVAL-016
date: 2026-06-07
output: Fix cheat association — `updateBoardAfterMatch` avec swap aléatoire `rightOrder`, lint clean
action: keep
tags: [association, fix, game-design]
---

## Description

Correction du cheat positionnel dans `AssociationTab/utils.ts` : `rightOrder` reçoit un swap aléatoire après le remplacement en-place, de sorte que la nouvelle capitale (ou chef-lieu) n'atterrit plus au même slot visuel que le nouveau pays (ou région). Fix en un seul fichier, couvre les deux onglets (EU + France). Lint 0 erreur.

## Critères de qualité

- `leftOrder` : stabilité conservée (pas de déplacement des items existants)
- `rightOrder` : nouveau code replacé puis swappé avec un index aléatoire ≠ matchedIdx
- Guard `if (newRightOrder.length > 1)` pour éviter le swap sur le dernier item
- Lint 0 erreur après modification

## Notes

Bug signalé par Baptiste en conditions réelles d'utilisation (Marie avait trouvé le cheat pendant une session de révision). Fix rapide, 1 seule passe de diagnostic.
