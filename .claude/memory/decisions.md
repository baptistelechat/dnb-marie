---
register: decisions
last_updated: 2026-06-13
---

## Index

| ID                              | Date       | Titre                                                                            | Tags                                                                       | Statut |
| ------------------------------- | ---------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------ |
| [BDR-001](decisions/BDR-001.md) | 2026-06-02 | pnpm utilisé à la place de npm (bug arborist npm 10.8.3)                         | #pnpm #npm #vite                                                           | actif  |
| [BDR-002](decisions/BDR-002.md) | 2026-06-02 | Design direction : Fredoka+Nunito, palette candy 6 couleurs cycliques            | #design #fonts #tailwind                                                   | actif  |
| [BDR-003](decisions/BDR-003.md) | 2026-06-02 | shadcn différé : installé seulement quand Dialog/Toast/Select nécessaire         | #shadcn #dependencies                                                      | actif  |
| [BDR-004](decisions/BDR-004.md) | 2026-06-02 | react-simple-maps pour la carte EU                                               | #react-simple-maps #svg #geo                                               | actif  |
| [BDR-005](decisions/BDR-005.md) | 2026-06-02 | Geo data : fetch CDN world-atlas@2 + filtre client 27 pays (vs fichier local)    | #geo #cdn #world-atlas                                                     | actif  |
| [BDR-006](decisions/BDR-006.md) | 2026-06-03 | `useHaptics()` — cancel() avant trigger()                                        | #haptics #web-haptics #ux                                                  | actif  |
| [BDR-007](decisions/BDR-007.md) | 2026-06-03 | Carte N&B — pays non trouvés en gris, trouvés en candy-purple-vivid `#7e57c2`    | #design #map #tailwind                                                     | actif  |
| [BDR-008](decisions/BDR-008.md) | 2026-06-03 | Layout MapQuizTab full-width + flex-row desktop (max-w-2xl retiré côté App)      | #layout #tailwind #map                                                     | actif  |
| [BDR-009](decisions/BDR-009.md) | 2026-06-03 | Mode dirigé : continue jusqu'à 100% + requeue aléatoire + score "premier essai"  | #quiz #game-design #directed                                               | actif  |
| [BDR-010](decisions/BDR-010.md) | 2026-06-03 | Markers SVG `<Marker>` pour les petits pays EU (BE, LU, SI, MT, CY)              | #map #svg #small-countries                                                 | actif  |
| [BDR-011](decisions/BDR-011.md) | 2026-06-07 | GO! — remplace composant tant que timerStartedAt null                            | #timer #ux #directed-mode #go-button                                       | actif  |
| [BDR-012](decisions/BDR-012.md) | 2026-06-03 | Détection fin de partie dans handleNext, pas dans useEffect                      | #timer #react-hooks #game-design                                           | actif  |
| [BDR-013](decisions/BDR-013.md) | 2026-06-06 | `failedCodes` Set séparé pour scorer les premières tentatives                    | #quiz #game-design #react-hooks                                            | actif  |
| [BDR-014](decisions/BDR-014.md) | 2026-06-06 | launch.json — `npx pnpm run dev`                                                 | #pnpm #launch-json #devserver                                              | actif  |
| [BDR-015](decisions/BDR-015.md) | 2026-06-06 | Toggle Pays/Capitales — prop showCapitalFirst                                    | #ux #react #checklist #study-mode                                          | actif  |
| [BDR-016](decisions/BDR-016.md) | 2026-06-06 | `h-dvh flex-col` conditionnel sur Carte Quiz                                     | #layout #tailwind #viewport #map                                           | actif  |
| [BDR-017](decisions/BDR-017.md) | 2026-06-06 | DOM-TOM intégrés comme overlay absolu dans la zone océan du canvas SVG principal | #map #react-simple-maps #overlay #dom-tom                                  | actif  |
| [BDR-018](decisions/BDR-018.md) | 2026-06-06 | Projections DOM-TOM depuis bounding box GeoJSON                                  | #map #react-simple-maps #projection #dom-tom                               | actif  |
| [BDR-019](decisions/BDR-019.md) | 2026-06-06 | Logos DOM-TOM dans REGION_LOGOS (codes 01→06)                                    | #logos #dom-tom #wikimedia #france                                         | actif  |
| [BDR-020](decisions/BDR-020.md) | 2026-06-06 | `normalizeAnswer` — variantes unicode mobiles                                    | #normalizeAnswer #unicode #quiz #mobile-keyboard                           | actif  |
| [BDR-021](decisions/BDR-021.md) | 2026-06-07 | AssociationBoardState — pool + display + ordres indépendants                     | #association #game-design #react #state                                    | actif  |
| [BDR-022](decisions/BDR-022.md) | 2026-06-07 | Association — replace-in-place pour stabilité positionnelle                      | #association #state #ux #array                                             | actif  |
| [BDR-023](decisions/BDR-023.md) | 2026-06-07 | FranceAssociationTab — FRENCH_REGIONS + labels génériques                        | #association #france #react #game-design                                   | actif  |
| [BDR-024](decisions/BDR-024.md) | 2026-06-07 | Association — swap aléatoire rightOrder anti-cheat                               | #association #game-design #array #ux                                       | actif  |
| [BDR-025](decisions/BDR-025.md) | 2026-06-07 | `lang="fr" translate="no"` + notranslate meta pour bloquer Chrome auto-translate | #chrome #translate #html #mobile                                           | actif  |
| [BDR-026](decisions/BDR-026.md) | 2026-06-09 | Score unifié ★/💡/❌ — freeScore × 2 + hintScore                                 | #game-design #scoring #leaderboard                                         | actif  |
| [BDR-027](decisions/BDR-027.md) | 2026-06-09 | Frise lecture — Option B lanes chronologiques                                    | #histoire #game-design #timeline                                           | actif  |
| [BDR-028](decisions/BDR-028.md) | 2026-06-09 | Frise Ordonner — Option D, dnd-kit, snap début range                             | #histoire #dnd-kit #timeline                                               | actif  |
| [BDR-029](decisions/BDR-029.md) | 2026-06-09 | Phase 1b — infra partagée HintButton/GameOverModal                               | #architecture #refactoring #hint                                           | actif  |
| [BDR-030](decisions/BDR-030.md) | 2026-06-09 | HistoricalDate — type point\|range + endSortKey                                  | #typescript #data #histoire                                                | actif  |
| [BDR-031](decisions/BDR-031.md) | 2026-06-09 | `keywords[]` 2-4 par personnage — primaryKeyword provisoire                      | #histoire #data #personnages                                               | actif  |
| [BDR-032](decisions/BDR-032.md) | 2026-06-09 | `handleHistorySubjectChange` — reset atomique historySubject + historyTab        | #histoire #react-hooks #state #handler                                     | actif  |
| [BDR-033](decisions/BDR-033.md) | 2026-06-09 | Photos non-Wikimedia acceptées — app privée Marie uniquement                     | #histoire #photos #sourcing #licences #wikimedia                           | actif  |
| [BDR-034](decisions/BDR-034.md) | 2026-06-10 | "Voir le drapeau" tracké comme hintScore dans MapQuizTab                         | #scoring #quiz #hint #map-quiz #leaderboard #react                         | actif  |
| [BDR-035](decisions/BDR-035.md) | 2026-06-10 | Frise verticale : AXIS_X=380, labels multi-lignes gauche, périodes droite        | #histoire #timeline #layout #design                                        | actif  |
| [BDR-036](decisions/BDR-036.md) | 2026-06-10 | Tooltip pour toutes les barres de période                                        | #histoire #timeline #tooltip #ux #frise                                    | actif  |
| [BDR-037](decisions/BDR-037.md) | 2026-06-11 | HistoirePersonnagesTab : liste 1-colonne vs grid                                 | #histoire #layout #react #checklist #mobile                                | actif  |
| [BDR-038](decisions/BDR-038.md) | 2026-06-12 | `pointerWithin` + HIT_R=22 pour précision drop zones dnd-kit                     | #dnd-kit #collision-detection #ux #drag-drop                               | actif  |
| [BDR-039](decisions/BDR-039.md) | 2026-06-12 | Labels de ranges ancrés au HAUT de la barre dans GameTimeline                    | #timeline #layout #anti-collision #histoire                                | actif  |
| [BDR-040](decisions/BDR-040.md) | 2026-06-12 | Tooltip rendu dans GameTimeline (parent), pas dans DropZone                      | #tooltip #react #overflow #histoire #timeline                              | actif  |
| [BDR-041](decisions/BDR-041.md) | 2026-06-12 | `HistoryDatesAssociationTab` : event→country, date→capital dans AssociationPair  | #histoire #association #data-mapping #react                                | actif  |
| [BDR-042](decisions/BDR-042.md) | 2026-06-12 | AssociationBoard row-by-row layout pour synchronisation hauteurs colonnes        | #association #layout #tailwind #css #height-sync                           | actif  |
| [BDR-043](decisions/BDR-043.md) | 2026-06-12 | `normalizeDateAnswer` : datesMatch avec mois FR, `/`, 0-padding, années 2ch      | #normalizeAnswer #date #flashcards #histoire #quiz                         | actif  |
| [BDR-044](decisions/BDR-044.md) | 2026-06-12 | Phase 6 : toggle direction `date-to-event` / `event-to-date`                     | #flashcards #histoire #direction #game-design                              | actif  |
| [BDR-045](decisions/BDR-045.md) | 2026-06-12 | HintButton inline avec Valider : `flex-wrap` + `basis-full order-last`           | #hint #ux #layout #tailwind #flashcards #flexbox                           | actif  |
| [BDR-046](decisions/BDR-046.md) | 2026-06-12 | Option B + anti-collision keywords personnages : Set unicité garantie au tirage  | #histoire #association #game-design #keywords #anti-collision #personnages | actif  |
| [BDR-047](decisions/BDR-047.md) | 2026-06-12 | `buildRoundPool()` : 1 photo aléatoire par personnage par partie                 | #game-design #flashcards #photos #pool #random #personnages                | actif  |
| [BDR-048](decisions/BDR-048.md) | 2026-06-12 | `PhotoCard` : `object-contain` + hauteur fixe 300px pour portraits non coupés    | #css #images #object-fit #portrait #photocard #ux #flashcards              | actif  |
| [BDR-049](decisions/BDR-049.md) | 2026-06-12 | `QuiSuisJeTab` : clues[] + 5 indices mélangés par partie                         | #histoire #game-design #quiz #clues #personnages #shuffle                  | actif  |
| [BDR-050](decisions/BDR-050.md) | 2026-06-12 | `hintUsed: boolean` dans `onSubmit` vs état parent                               | #react #quiz #hints #scoring #flashcards #callback #state-management       | actif  |
| [BDR-051](decisions/BDR-051.md) | 2026-06-12 | react-doctor score 44→60, 125 warnings déférés intentionnellement                | #react-doctor #code-quality #technical-debt #deferred                      | actif  |
| [BDR-052](decisions/BDR-052.md) | 2026-06-12 | Faux positifs react-doctor documentés dans `.react-doctor/false-positives.md`    | #react-doctor #false-positives #documentation #process                     | actif  |
| [BDR-053](decisions/BDR-053.md) | 2026-06-12 | Guide `ajouter-donnees-historiques.md` — workflow photos 2 phases                | #docs #guide #photos #workflow #contribution #histoire #validate-photos    | actif  |
| [BDR-054](decisions/BDR-054.md) | 2026-06-13 | Période `"Guerre froide"` pour les dates mondiales Thème 2                       | #histoire #data #periode #theme2 #dnb #classification                      | actif  |
| [BDR-055](decisions/BDR-055.md) | 2026-06-13 | Portraits Élysée = source primaire présidents Ve République                      | #elysee #photos #presidents #cdn #ve-republique #historicalFigures         | actif  |
| [BDR-056](decisions/BDR-056.md) | 2026-06-13 | `canvasHeight` dynamique dans FriseLectureTab, sans DISPLAY_END                  | #timeline #frise #react #layout #historicalDates #canvasHeight             | actif  |
| [BDR-057](decisions/BDR-057.md) | 2026-06-13 | DateListView + toggle Frise/Liste, état `seen` partagé                           | #frise #liste #react #toggle #ux #sharedState #datelist                    | actif  |
