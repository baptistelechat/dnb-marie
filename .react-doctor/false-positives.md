# React Doctor — False Positives

## react-doctor/no-gray-on-colored-background

Pattern: `text-slate-{400,600}` + `hover:bg-rose-50` sur le même élément

Raison : React-doctor analyse statiquement les classes Tailwind sans comprendre les
modificateurs `hover:`. Le texte `text-slate-600` est sur fond transparent (état normal),
et `hover:bg-rose-50` n'est actif que lorsque `hover:text-rose-500` est aussi actif —
donc le texte n'est jamais gris sur fond rose en pratique.

Fichiers concernés : tous les boutons "Recommencer" en bas des onglets (`hover:bg-rose-50`).

## react-doctor/js-set-map-lookups

Pattern : `lower.includes(name)` à l'intérieur d'un `for...of` sur `Object.entries(FRENCH_MONTHS)`

Raison : `lower` est une **string** (String.prototype.includes), pas un Array.
La règle se déclenche à tort sur ce pattern — ce n'est pas un `Array.includes()` coûteux
mais une recherche de sous-chaîne sur 12 entrées max.

Fichiers : `FriseLectureTab/components/TimelineCanvas.tsx`,
`FriseOrdonnnerTab/components/GameTimeline.tsx`

## deslop/unused-export

Pattern : exports utilisés via imports normaux mais non détectés par deslop

- `CANDY_COLORS` dans `MapQuizTab/constants.ts` : importé dans 5 fichiers
  (`FriseLectureTab`, `GameTimeline`, `FigureCard`, `RegionCard`, `CountryCard`)
- `normalizePersonName` dans `utils/normalizePersonName.ts` : importé dans
  `QuiSuisJeTab/index.tsx` et `PhotoFlashcardTab/index.tsx`
