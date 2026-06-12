---
register: learnings
last_updated: 2026-06-12
---

## Index

| ID                              | Date       | Pattern observé                                                                   | Tags                                                                     |
| ------------------------------- | ---------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [LRN-001](learnings/LRN-001.md) | 2026-06-02 | `vite-plugin-qrcode` requiert `server.host: true` pour afficher le QR code        | #vite #qrcode #mobile                                                    |
| [LRN-002](learnings/LRN-002.md) | 2026-06-02 | `react-simple-maps` v3 — créer .d.ts custom                                       | #typescript #react-simple-maps #types #declarations                      |
| [LRN-003](learnings/LRN-003.md) | 2026-06-03 | `world-atlas@2` — IDs pays zero-paddés à 3 chiffres                               | #world-atlas #geo #topojson #ids                                         |
| [LRN-004](learnings/LRN-004.md) | 2026-06-03 | SVG z-order = ordre DOM — petits pays EU rendus en dernier                        | #svg #z-order #react-simple-maps #rendering                              |
| [LRN-005](learnings/LRN-005.md) | 2026-06-03 | Diagnostiquer IDs JSON : `node -e fetch().then().then()`                          | #debugging #topojson #node #fetch                                        |
| [LRN-006](learnings/LRN-006.md) | 2026-06-03 | `<Marker>` react-simple-maps — cercle cliquable pour petits pays                  | #react-simple-maps #svg #marker #small-countries                         |
| [LRN-007](learnings/LRN-007.md) | 2026-06-03 | ESLint set-state-in-effect — setState dans event handlers                         | #react-hooks #eslint #set-state-in-effect                                |
| [LRN-008](learnings/LRN-008.md) | 2026-06-03 | `useCallback` dans les custom hooks pour stabiliser les refs exposées             | #react-hooks #useCallback #custom-hooks                                  |
| [LRN-009](learnings/LRN-009.md) | 2026-06-06 | Réduire EU_COUNTRIES pour tester la logique de fin de partie                      | #testing #quiz #data-reduction                                           |
| [LRN-010](learnings/LRN-010.md) | 2026-06-06 | `h-dvh flex-col` conditionnel par onglet (jamais global)                          | #layout #tailwind #viewport #multi-tab                                   |
| [LRN-011](learnings/LRN-011.md) | 2026-06-11 | `flex-1 min-h-0` en flex-col → compression + overlap visuel                       | #flexbox #tailwind #overflow #layout                                     |
| [LRN-012](learnings/LRN-012.md) | 2026-06-07 | GO! — timerStartedAt === null sépare prêt vs en cours                             | #timer #ux #react #quiz                                                  |
| [LRN-013](learnings/LRN-013.md) | 2026-06-07 | Dériver un composant — auditer labels hardcodés d'abord                           | #react #refactoring #composants #audit                                   |
| [LRN-014](learnings/LRN-014.md) | 2026-06-07 | `flex-col` + `mx-auto` → width intrinsèque, fix `w-full`                          | #tailwind #flexbox #mx-auto #layout                                      |
| [LRN-015](learnings/LRN-015.md) | 2026-06-07 | Colonnes sync replace-in-place → swap aléatoire obligatoire                       | #association #array #game-design #react                                  |
| [LRN-016](learnings/LRN-016.md) | 2026-06-09 | Rodin pré-dev — identifie bloquants + dépendances d'infra                         | #rodin #architecture #planning                                           |
| [LRN-017](learnings/LRN-017.md) | 2026-06-09 | WordPress `-WxH` thumbnail suffix → supprimer pour obtenir la full-res            | #images #wordpress #cdn #url-pattern #thumbnail                          |
| [LRN-018](learnings/LRN-018.md) | 2026-06-09 | Wikimedia HEAD → 429 (rate-limit) ≠ URL cassée — images OK en navigateur          | #wikimedia #http #head-request #429 #rate-limit                          |
| [LRN-019](learnings/LRN-019.md) | 2026-06-10 | Champ optionnel + display conditionnel = forward-compat                           | #typescript #scoring #optional-field #forward-compat #quiz #leaderboard  |
| [LRN-020](learnings/LRN-020.md) | 2026-06-10 | `right: calc(100% - Xpx)` = zone largeur fixe depuis le bord gauche               | #css #layout #absolute-positioning #calc #timeline                       |
| [LRN-021](learnings/LRN-021.md) | 2026-06-10 | Anti-collision greedy push-down pour événements sub-année sur axe vertical        | #timeline #histoire #algorithm #anti-collision #layout                   |
| [LRN-022](learnings/LRN-022.md) | 2026-06-10 | `whiteSpace: normal` + MIN_POINT_SPACING accru = labels lisibles sans scroll      | #css #timeline #mobile #whitespace #absolute-positioning #frise          |
| [LRN-023](learnings/LRN-023.md) | 2026-06-10 | `top: y + h/2` + translateY(-50%) = tooltip centré vertical                       | #css #tooltip #absolute-positioning #vertical-centering #timeline #frise |
| [LRN-024](learnings/LRN-024.md) | 2026-06-11 | `saveScreenshot(buf, name)` : buffer en premier, filename en second               | #dev-browser #screenshot #api #quickjs #playwright                       |
| [LRN-025](learnings/LRN-025.md) | 2026-06-12 | Anti-collision timeline unifiée : ancrer au début de l'élément, obstacles fixes   | #timeline #anti-collision #algorithm #layout #histoire                   |
| [LRN-026](learnings/LRN-026.md) | 2026-06-12 | `pointerWithin` dnd-kit retourne la zone de plus petite surface en overlap        | #dnd-kit #collision-detection #droppable #drag-drop #hit-area            |
| [LRN-027](learnings/LRN-027.md) | 2026-06-12 | Tooltip dans enfant `overflow:hidden` → état `hoveredId` dans le parent           | #tooltip #overflow #react #absolute-positioning #parent-state            |
| [LRN-028](learnings/LRN-028.md) | 2026-06-12 | Leaderboard dupliqué sans composant partagé → drift silencieux                    | #leaderboard #react #drift #composant-partage #duplication #game-design  |
| [LRN-029](learnings/LRN-029.md) | 2026-06-12 | 2 colonnes hauteurs variables → rows `grid-cols-2 items-stretch + h-full`         | #css #tailwind #layout #grid #items-stretch #height-sync #react          |
| [LRN-030](learnings/LRN-030.md) | 2026-06-12 | `flex-wrap + basis-full order-last` = expanded element sur sa propre ligne        | #css #tailwind #flexbox #layout #basis-full #order-last #responsive      |
| [LRN-031](learnings/LRN-031.md) | 2026-06-12 | Set anti-collision au tirage pour labels partagés dans jeux d'association         | #game-design #association #anti-collision #keywords #set #quiz #histoire |
| [LRN-032](learnings/LRN-032.md) | 2026-06-12 | `object-contain` + hauteur fixe = portrait entier visible (vs `object-cover`)     | #css #images #object-fit #object-contain #portrait #aspect-ratio #ux     |
| [LRN-033](learnings/LRN-033.md) | 2026-06-12 | Pool dynamique `buildRoundPool()` + `useMemo(roundMap)` : sélection par partie    | #react #game-design #pool #random #useMemo #useState #flashcards         |
| [LRN-034](learnings/LRN-034.md) | 2026-06-12 | `Map<id, T[]>` pour variantes mélangées par item, reset au replay                 | #react #game-design #shuffle #map #state #quiz #personnages              |
| [LRN-035](learnings/LRN-035.md) | 2026-06-12 | HintButton inline-first : wrapper vide → `basis-full order-last` après révélation | #css #tailwind #flexbox #hintbutton #quiz #ux #layout                    |
