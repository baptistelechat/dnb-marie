---
register: decisions
last_updated: 2026-06-07
---

## Index

| ID                              | Date       | Titre                                                                                                         | Tags                                             | Statut |
| ------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ------ |
| [BDR-001](decisions/BDR-001.md) | 2026-06-02 | pnpm utilisé à la place de npm (bug arborist npm 10.8.3)                                                      | #pnpm #npm #vite                                 | actif  |
| [BDR-002](decisions/BDR-002.md) | 2026-06-02 | Design direction : Fredoka+Nunito, palette candy 6 couleurs cycliques                                         | #design #fonts #tailwind                         | actif  |
| [BDR-003](decisions/BDR-003.md) | 2026-06-02 | shadcn différé : installé seulement quand Dialog/Toast/Select nécessaire                                      | #shadcn #dependencies                            | actif  |
| [BDR-004](decisions/BDR-004.md) | 2026-06-02 | react-simple-maps choisi pour la carte EU (SVG pur, React-friendly, vs Leaflet/D3)                            | #react-simple-maps #svg #geo                     | actif  |
| [BDR-005](decisions/BDR-005.md) | 2026-06-02 | Geo data : fetch CDN world-atlas@2 + filtre client 27 pays (vs fichier local)                                 | #geo #cdn #world-atlas                           | actif  |
| [BDR-006](decisions/BDR-006.md) | 2026-06-03 | Haptics centralisés dans `useHaptics()` — cancel() avant trigger() pour taps rapides                          | #haptics #web-haptics #ux                        | actif  |
| [BDR-007](decisions/BDR-007.md) | 2026-06-03 | Carte N&B — pays non trouvés en gris, trouvés en candy-purple-vivid `#7e57c2`                                 | #design #map #tailwind                           | actif  |
| [BDR-008](decisions/BDR-008.md) | 2026-06-03 | Layout MapQuizTab full-width + flex-row desktop (max-w-2xl retiré côté App)                                   | #layout #tailwind #map                           | actif  |
| [BDR-009](decisions/BDR-009.md) | 2026-06-03 | Mode dirigé : continue jusqu'à 100% + requeue aléatoire + score "premier essai"                               | #quiz #game-design #directed                     | actif  |
| [BDR-010](decisions/BDR-010.md) | 2026-06-03 | Markers SVG `<Marker>` pour les petits pays EU (BE, LU, SI, MT, CY)                                           | #map #svg #small-countries                       | actif  |
| [BDR-011](decisions/BDR-011.md) | 2026-06-07 | Timer démarre au clic sur "GO !" — bouton remplace le composant interactif tant que `timerStartedAt === null` | #timer #ux #directed-mode #go-button             | actif  |
| [BDR-012](decisions/BDR-012.md) | 2026-06-03 | Détection fin de partie dans handleNext, pas dans useEffect                                                   | #timer #react-hooks #game-design                 | actif  |
| [BDR-013](decisions/BDR-013.md) | 2026-06-06 | `failedCodes` Set séparé pour scorer correctement les premières tentatives                                    | #quiz #game-design #react-hooks                  | actif  |
| [BDR-014](decisions/BDR-014.md) | 2026-06-06 | `.claude/launch.json` configuré avec `npx pnpm run dev` (pnpm absent PATH subprocess)                         | #pnpm #launch-json #devserver                    | actif  |
| [BDR-015](decisions/BDR-015.md) | 2026-06-06 | Toggle Pays/Capitales dans EuropTab — prop `showCapitalFirst` inversant affichage primaire/secondaire         | #ux #react #checklist #study-mode                | actif  |
| [BDR-016](decisions/BDR-016.md) | 2026-06-06 | Layout App `h-dvh flex-col` conditionnel — actif uniquement sur l'onglet Carte Quiz                           | #layout #tailwind #viewport #map                 | actif  |
| [BDR-017](decisions/BDR-017.md) | 2026-06-06 | DOM-TOM intégrés comme overlay absolu dans la zone océan du canvas SVG principal                              | #map #react-simple-maps #overlay #dom-tom        | actif  |
| [BDR-018](decisions/BDR-018.md) | 2026-06-06 | Projections DOM-TOM individuelles (center, scale, width) calculées depuis bounding box GeoJSON                | #map #react-simple-maps #projection #dom-tom     | actif  |
| [BDR-019](decisions/BDR-019.md) | 2026-06-06 | Logos DOM-TOM ajoutés dans `REGION_LOGOS` via Wikimedia Commons (codes `"01"`→`"06"`)                         | #logos #dom-tom #wikimedia #france               | actif  |
| [BDR-020](decisions/BDR-020.md) | 2026-06-06 | `normalizeAnswer` étendu aux variantes unicode mobiles (U+2018/U+2019 apostrophes, U+2013/U+2014 tirets iOS)  | #normalizeAnswer #unicode #quiz #mobile-keyboard | actif  |
| [BDR-021](decisions/BDR-021.md) | 2026-06-07 | AssociationTab — `AssociationBoardState` avec pool + display + leftOrder/rightOrder indépendants              | #association #game-design #react #state          | actif  |
| [BDR-022](decisions/BDR-022.md) | 2026-06-07 | AssociationTab — replace-in-place `array.map` pour stabilité positionnelle lors d'un match                    | #association #state #ux #array                   | actif  |
| [BDR-023](decisions/BDR-023.md) | 2026-06-07 | FranceAssociationTab — variante Association France avec FRENCH_REGIONS, leaderboard séparé, labels génériques | #association #france #react #game-design         | actif  |
