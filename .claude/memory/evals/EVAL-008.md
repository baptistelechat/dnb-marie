---
id: EVAL-008
date: 2026-06-06
title: EuropTab enrichi — capitales affichées + toggle Pays/Capitales
tags: [react, checklist, capitals, ux]
action: keep
---

## Output

Deux ajouts sur l'onglet checklist UE :

1. **Capitales affichées** : champ `capital` de `euCountries.ts` (déjà présent) branché à l'affichage dans `CountryCard` — texte secondaire `text-[10px]` sous le nom du pays.
2. **Toggle Pays/Capitales** : switch binaire dans `EuropTab` (`showCapitalFirst` state) propagé via prop à `CountryCard`. Inverse le texte primaire/secondaire pour deux modes d'étude distincts.

Retrait du `text-decoration: line-through` sur les cartes cochées (lisibilité conservée).

## Statut

Lint clean. Validé visuellement par Baptiste.

## Références

- [BDR-015](../decisions/BDR-015.md) — décision toggle Pays/Capitales
