---
register: journal
last_updated: 2026-06-07
---

## 2026-06-02

Création complète de l'app dnb-marie de zéro. Scaffolding Vite React TypeScript, installation des dépendances (tailwindcss v4, lucide-react, canvas-confetti, react-country-flag, web-haptics). Blocage sur npm 10.8.3 (bug arborist null.matches) → migration pnpm. Implémentation de l'onglet Érurop : grille 27 pays UE, drapeaux SVG via react-country-flag svg prop, checkbox animée, barre de progression pastel, confetti double salve à 27/27, haptics trigger(40)/trigger("success"). Ajout vite-plugin-qrcode avec server.host:true pour accès mobile LAN. Lint 0 erreur, build 0 erreur (215 KB, 1748 modules).

**Entrées clés :**

- [BDR-001](decisions/BDR-001.md) — pnpm remplace npm (bug arborist)
- [BLK-001](blockers/BLK-001.md) — npm 10.8.3 crash résolu
- [LRN-001](learnings/LRN-001.md) — vite-plugin-qrcode + host:true
- [EVAL-001](evals/EVAL-001.md) — build propre session initiale

---

Redesign complet de l'interface sur demande de Baptiste (`/frontend-design`). Direction esthétique choisie : "aesthetic study" pour collégienne — police Fredoka (titres bubbly) + Nunito (corps arrondi), palette candy 6 teintes cycliques assignées par index modulo 6 (rose → violet → bleu → mint → peach → lemon). Les cartes pays passent d'un layout horizontal (drapeau | nom) à vertical (drapeau centré → nom), plus app-like sur mobile. Barre de progression refaite en h-6 avec gradient rose→violet→indigo et label % intégré. Header redesigné avec Sparkles + Globe (Lucide), badge "3ème", fond gradient pastel. Navigation en pill colorée. CLAUDE.md corrigé : "déploiement local/LAN" → "Vercel (production)".

Un warning CSS au premier build : `@import url()` Google Fonts placé après `@import "tailwindcss"` — inversé au second build (résolu). Blocage screenshot dev-browser : 3+ tentatives pour localiser Playwright (`C:/Users/ASUS/.dev-browser/node_modules/playwright`). Screenshots finaux validés visuellement mobile 390px + desktop 768px. Lint 0 erreur, build 0 warning.

**Entrées clés :**

- [BDR-002](decisions/BDR-002.md) — design direction Fredoka+Nunito, candy cyclique
- [BDR-003](decisions/BDR-003.md) — shadcn différé
- [BLK-002](blockers/BLK-002.md) — Playwright chemin dev-browser
- [EVAL-002](evals/EVAL-002.md) — redesign UI candy pastel validé

---

Implémentation complète du nouvel onglet "Carte Quiz" sur demande de Baptiste. Planification via `/plan` avec deux questions de clarification (mode de sélection, tolérance saisie) → Baptiste veut les deux modes (libre + dirigé) et une saisie tolérante aux accents.

Architecture : `MapQuizTab/` avec 6 sous-composants (`EuropeMap`, `QuizPanel`, `ModeToggle`, `FlagHint`, `ResultBadge`, `QuizProgress`), `utils/normalizeAnswer.ts`, `src/types/react-simple-maps.d.ts`. Dépendances ajoutées : `react-simple-maps` 3.0.0 + `topojson-client`. Données géographiques via CDN world-atlas@2 (filtre client sur les 27 codes ISO numériques UE). Capitalisation enrichie dans `euCountries.ts`.

Deux séries de bugs avant build clean. ESLint `react-hooks/set-state-in-effect` (x2) : `QuizPanel` résolu par `key` prop pour remount forcé, `index.tsx` résolu en dérivant `activeCode` depuis `queue` (suppression du state + useEffect). TypeScript (4 erreurs) : types manquants `react-simple-maps` → `.d.ts` custom, `Map` Lucide shadowing le constructeur natif → `as MapIcon`. Lint 0 erreur, build clean (346 kB / 113 kB gzip).

**Entrées clés :**

- [BDR-004](decisions/BDR-004.md) — react-simple-maps pour la carte EU
- [BLK-003](blockers/BLK-003.md) — ESLint set-state-in-effect
- [BLK-004](blockers/BLK-004.md) — Build TS : types + Map shadowing
- [EVAL-003](evals/EVAL-003.md) — MapQuizTab complet

## 2026-06-03

Session courte et ciblée sur un bug haptics dans l'onglet Union Européenne. Baptiste signale des vibrations manquantes sur les taps rapides. Diagnostic : `trigger()` de `web-haptics` appelle `navigator.vibrate()` directement sans annuler la vibration précédente. Sur de nombreux Android, si une vibration de 40 ms est en cours et qu'un nouvel appel arrive avant la fin, il est silencieusement ignoré — comportement contraire à la spec W3C mais très répandu en pratique. La lib expose `cancel()` mais le code ne l'utilisait pas.

Fix : `cancel()` systématique avant `trigger()` dans les actions rapides répétables. Création de `src/utils/hapticPatterns.ts` qui centralise les patterns (SUCCESS, ERROR fournis par Baptiste, TICK) et expose `useHaptics()` avec `tick()` / `success()` / `error()`. Les deux composants concernés (`EuropTab`, `MapQuizTab`) migrés sur le nouveau hook. Lint 0 erreur, build 0 erreur.

**Entrées clés :**

- [BDR-006](decisions/BDR-006.md) — haptics centralisés, cancel avant trigger
- [EVAL-004](evals/EVAL-004.md) — useHaptics() hook, build clean

---

Session longue centrée sur l'onglet Carte Quiz. Baptiste demande un redesign complet de la carte : N&B pour les pays non trouvés, couleur primary (candy-purple-vivid `#7e57c2`) pour les trouvés, et un layout "full" — la carte prend toute la largeur disponible sur desktop avec le panel quiz en sidebar droite.

Plusieurs fixes en parallèle via sub-agents : double passe de rendu SVG (non-EU d'abord pour éviter la superposition sur les petits pays), prop `isInteractive` sur EuropeMap pour désactiver le clic en mode dirigé, déplacement de ProgressBar vers `shared/`, reset bouton dans les deux modes, navigation clavier complète (focus auto sur le premier input + focus auto sur "Pays suivant" après soumission → flux entier sans souris).

Blocage majeur sur la Belgique et l'Autriche : invisibles sur la carte malgré leur présence dans le mapping. Trois tentatives (z-order, pointer-events) avant diagnostic : world-atlas stocke les IDs en strings zero-paddées `"040"` et `"056"`, pas `"40"` et `"56"`. Fix en 2 lignes dans constants.ts, vérifié par inspection directe du JSON via `node -e fetch`.

Ajout de marqueurs `<Marker>` pour les 5 petits pays EU (BE, LU, SI, MT, CY) : cercle r=6 cliquable positionné au centroïde géographique, indépendant de la résolution des geodata.

Implémentation de l'Option B pour le mode dirigé : la partie continue jusqu'à ce que tous les pays soient réussis, les pays ratés sont réinsérés aléatoirement dans la queue, et un écran de fin affiche le score "premier essai" (X/27 réussis du premier coup). Build clean à 350 kB / 114 kB gzip.

**Entrées clés :**

- [BLK-005](blockers/BLK-005.md) — Belgique/Autriche invisibles, root cause IDs zero-paddés world-atlas
- [LRN-003](learnings/LRN-003.md) — world-atlas IDs format `"040"` pas `"40"`
- [BDR-009](decisions/BDR-009.md) — mode dirigé continue jusqu'à 100%
- [EVAL-005](evals/EVAL-005.md) — carte N&B + markers + Option B, build clean

---

Session centrée sur l'ajout d'une dimension jeu au mode dirigé. Baptiste demande un chronomètre + leaderboard localStorage + saisie de prénom en fin de partie. Les sous-composants (`Timer.tsx`, `GameOverModal.tsx`, `hooks/useLeaderboard.ts`) étaient pré-construits mais non intégrés.

Intégration dans `MapQuizTab/index.tsx` : 4 nouveaux states (timerStartedAt, timerStoppedAt, showGameOver, leaderboard), totalTimeSeconds dérivé, handleSave + handleReplay. Blocage ESLint `react-hooks/set-state-in-effect` (3ème occurrence dans ce projet) : setTimerStoppedAt + setShowGameOver placés initialement dans l'useEffect de complétion. Fix : déplacés dans handleNext quand `queue.length === 1` et `lastResult === "correct"`. `useCallback` ajouté dans useLeaderboard pour stabiliser les refs.

Ajout du bouton "Passer →" : nouvelle valeur `"skipped"` dans le type LastResult, style ambre dans ResultBadge (distinct de l'erreur rouge), même logique de requeue que la mauvaise réponse.

Preview du leaderboard : Baptiste demande de voir la modal avec de faux scores. Code temporaire ajouté (showGameOver=true, fake timestamps, fake leaderboard, saved=true dans modal), screenshot via dev-browser, reversion complète, build vérifié clean.

Ajout de l'ancienneté relative sous chaque nom du classement : `formatAge(dateISO)` — 5 buckets de diffDays (aujourd'hui / hier / il y a Xj / il y a X sem / il y a X mois).

**Entrées clés :**

- [BDR-011](decisions/BDR-011.md) — timer démarre au premier submit
- [BDR-012](decisions/BDR-012.md) — fin de partie dans handleNext, pas useEffect
- [BLK-006](blockers/BLK-006.md) — ESLint set-state-in-effect, 3ème occurrence
- [EVAL-006](evals/EVAL-006.md) — chronomètre + leaderboard + passer + ancienneté

## 2026-06-06

Session en deux temps. D'abord, lancement du serveur de dev via `preview_start` — blocage sur pnpm absent du PATH subprocess (ENOENT). Contournement : `.claude/launch.json` créé avec `runtimeExecutable: "npx"` et `runtimeArgs: ["pnpm", "run", "dev"]`. Dépendances manquantes installées via `npx pnpm install`.

Baptiste signale ensuite un bug de scoring : après une partie complète, `firstTryScore` affiche systématiquement 27/27. Root cause : la condition `!answeredCodes.has(code)` est insuffisante — après une mauvaise réponse suivie d'une bonne réponse, le pays n'est pas encore dans `answeredCodes` lors de la 2ème tentative → faussement compté comme premier essai. Fix : ajout d'un Set `failedCodes` qui marque chaque pays ayant reçu ≥1 mauvaise réponse ou skip. La garde devient `!failedCodes.has(code) && !answeredCodes.has(code)`.

Ajout simultané du composant `LeaderboardPanel` affiché en sidebar sous `QuizPanel` en mode dirigé. Validé par Baptiste après test rapide avec 5 pays (EU_COUNTRIES réduite temporairement), puis restauration des 27 pays.

**Entrées clés :**

- [BDR-013](decisions/BDR-013.md) — `failedCodes` Set pour scoring premier essai correct
- [BDR-014](decisions/BDR-014.md) — `.claude/launch.json` avec `npx pnpm run dev`
- [BLK-007](blockers/BLK-007.md) — pnpm absent PATH subprocess, résolution launch.json
- [BLK-008](blockers/BLK-008.md) — firstTryScore toujours 27/27, fix failedCodes
- [EVAL-007](evals/EVAL-007.md) — LeaderboardPanel + fix scoring validé

---

Courte session UI sur l'onglet checklist UE. Trois ajouts successifs : affichage de la capitale sous le nom du pays dans `CountryCard` (champ `capital` déjà présent dans `euCountries.ts`, il suffisait de le brancher), retrait du `text-decoration: line-through` sur les cartes cochées, puis ajout d'un toggle switch Pays/Capitales. Le toggle contrôle une prop `showCapitalFirst` propagée à chaque `CountryCard` qui inverse le texte primaire/secondaire — deux modes d'étude depuis la même vue sans duplication de composant. Lint clean.

**Entrées clés :**

- [BDR-015](decisions/BDR-015.md) — toggle Pays/Capitales, prop showCapitalFirst
- [EVAL-008](evals/EVAL-008.md) — EuropTab enrichi capitales + toggle

---

Session de correction de régressions suite à l'implémentation du layout viewport-contraint pour les onglets Carte Quiz. Trois régressions identifiées : scrollbar OS visible sur les onglets Liste/Flashcards, éléments qui se chevauchent à fenêtre réduite (< lg), texte "Union Européenne" wrappé sur 2 lignes dans le bouton de navigation.

Root cause commune : `h-dvh flex-col` appliqué globalement sur le conteneur racine de l'App. Fix central dans `App.tsx` : conditionnement de cette classe sur `activeTab === "map-quiz"`, sinon `min-h-dvh` sans flex. Fix secondaire dans `FranceMapQuizTab/index.tsx` : `lg:flex-1 lg:min-h-0` au lieu de `flex-1 min-h-0` sur la colonne gauche pour éviter la compression en dessous du breakpoint lg. Fix cosmétique : `whitespace-nowrap` sur les labels longs des boutons de navigation.

Validé par screenshots dev-browser sur les deux onglets Carte Quiz (EU + France) et sur les onglets Liste/Flashcards (absence de scrollbar OS).

**Entrées clés :**

- [BDR-016](decisions/BDR-016.md) — `h-dvh flex-col` conditionnel par onglet
- [BLK-009](blockers/BLK-009.md) — 3 régressions layout viewport, root cause + fix
- [LRN-010](learnings/LRN-010.md) — pattern layout conditionnel multi-onglets
- [LRN-011](learnings/LRN-011.md) — pattern flex-1 min-h-0 compression + overlap
- [EVAL-009](evals/EVAL-009.md) — régressions fixées, validé screenshots

---

Session focalisée sur la feature `FranceMapQuizTab` — intégration complète des 5 DOM-TOM (Guadeloupe, Martinique, Guyane, La Réunion, Mayotte). Quatre améliorations successives : correction de la carte métropole coupée (scale 2700→2400, canvas 800×620→1000×700), création de `DomMiniMap.tsx` avec projections individuelles calculées depuis les bounding box GeoJSON, suppression des labels (quiz de mémorisation), et centrage mathématique de l'ensemble. La Réunion était coupée lors du calibrage initial — `scale=6500` couvrait 0.608° pour une île de 0.620° — recalculé à `scale=6000, width=78`. Centrage final : `center_lon` ajusté de `2.5°` → `0.44°` et overlay DOM passé de `18%` → `27%` pour équilibrer les marges gauche/droite (~17.5% chacune). Deux learnings globaux extraits (formule de projection react-simple-maps et pattern overlay CSS dans zone vide SVG).

**Entrées clés :**

- [BDR-017](decisions/BDR-017.md) — DOM overlay absolu dans zone océan
- [BDR-018](decisions/BDR-018.md) — projections individuelles depuis bounding box
- [BLK-010](blockers/BLK-010.md) — La Réunion coupée, fix projection
- [EVAL-010](evals/EVAL-010.md) — FranceMapQuizTab complet validé

---

Session courte centrée sur deux bugs quiz signalés par Baptiste en conditions réelles d'utilisation mobile.

Premier bug : "Provence-Alpes-Côte d'Azur" refusé malgré une saisie visuellement correcte. Diagnostic : iOS substitue `'` (U+0027) par `'` (U+2019, right single quotation mark) lors de la frappe. Le character class dans `normalizeAnswer` ne contenait que U+0027 en doublon — U+2018 et U+2019 absents. Plusieurs tentatives de fix via shell/heredoc échouent à cause de l'encodage Windows qui réencoderait silencieusement les caractères non-ASCII. Solution fiable : script `.mjs` écrit via l'outil `Write` avec `String.fromCharCode()` pour chaque codepoint, puis exécuté via `node`.

Deuxième bug : "st denis" rejeté — double problème. iOS remplace aussi `-` par `–` (U+2013, en-dash), et `\bst\b` en JS ne reconnaît pas U+2013 comme séparateur de mot. Résultat : "st–denis" → `expandAbbreviations` ne développe pas "st" → jamais transformé en "saint". Fix : ajout de U+2013 et U+2014 au character class → convertis en espace avant la phase d'expansion d'abréviations.

Entre les deux, intégration des logos DOM-TOM dans `REGION_LOGOS` : recherche des URLs Wikimedia Commons pour chaque territoire (Guadeloupe, Martinique, Guyane, La Réunion, Mayotte), ajout des 5 entrées dans `frenchRegions.ts`, validé screenshot dev-browser.

**Entrées clés :**

- [BDR-020](decisions/BDR-020.md) — normalizeAnswer étendu aux variantes unicode mobiles
- [BLK-011](blockers/BLK-011.md) — PACA refusé, U+2019 mobile
- [BLK-012](blockers/BLK-012.md) — Saint-Denis, tiret iOS U+2013

## 2026-06-07

Session courte en deux temps. D'abord, modification du démarrage du chrono en mode dirigé pour les deux onglets Carte Quiz (EU + France) : remplacement du démarrage automatique au premier submit/skip par un bouton "GO !" explicite. Le bouton remplace le `QuizPanel` / `FranceQuizPanel` tant que `timerStartedAt === null`. Clic GO → `setTimerStartedAt(Date.now())` → quiz et chrono s'activent simultanément. `handleGo` ajouté, `timerStartedAt` retiré des deps arrays de `handleSubmit` et `handleSkip`. Lint 0 erreur.

Ensuite, même traitement appliqué aux deux onglets Flashcards (CapitalsQuizTab UE + FranceCapitalsQuizTab). Les flashcard étant toujours en mode dirigé implicite, le GO remplace `QuizCard + AnswerInput` (ou `RegionQuizCard + FranceAnswerInput`) dans un fragment `<></>`. Même pattern, mêmes modifications. Lint 0 erreur.

**Entrées clés :**

- [BDR-011](decisions/BDR-011.md) — décision mise à jour : GO! remplace le démarrage au premier submit
- [LRN-012](learnings/LRN-012.md) — pattern garde `timerStartedAt === null` pour démarrage explicite
- [EVAL-013](evals/EVAL-013.md) — GO! implémenté sur les 4 onglets quiz

---

Implémentation complète de l'onglet Association — nouveau mini-jeu de mise en correspondance pays/capitales UE. Architecture à 4 tableaux (`pool`, `display`, `leftOrder`, `rightOrder`) : `display` stocke les données, `leftOrder`/`rightOrder` gèrent la présentation dans deux ordres aléatoires indépendants. Plateau de 5 paires sur 27, remplacement au fil des matchs depuis le pool. Feedback : fade-out 350 ms sur match correct, `@keyframes shake` + fond rouge sur erreur. Score `firstTryCodes` (exclut les pays ayant déjà une erreur), timer GO!, leaderboard localStorage.

Bug signalé par Baptiste en cours de session : les positions des boutons se déplaçaient lors d'un match. Root cause : `updateBoardAfterMatch` utilisait `filter` (supprime l'item) + insert aléatoire → les voisins se décalaient. Fix : `array.map(c => c === matchedCode ? next : c)` replace-in-place sur les 3 tableaux simultanément — le nouvel item hérite exactement de la position de l'item retiré.

Deux blocages sur les screenshots dev-browser : commande absente du PATH, puis `ERR_UNSUPPORTED_ESM_URL_SCHEME` sur `import chromium from 'C:/...'`. Résolu : `createRequire(import.meta.url)` + `require('C:/...')` dans un script `.mjs`, exécuté via `node`. Lint 0 erreur, build clean (432 kB / 128 kB gzip).

**Entrées clés :**

- [BDR-021](decisions/BDR-021.md) — architecture AssociationBoardState
- [BDR-022](decisions/BDR-022.md) — replace-in-place stabilité positionnelle
- [BLK-013](blockers/BLK-013.md) — dev-browser PATH, contournement createRequire
- [EVAL-014](evals/EVAL-014.md) — AssociationTab complet validé

---

Session courte et ciblée. Baptiste signale que l'onglet Association affiche les pays UE quel que soit le sujet sélectionné — sur France, on attendait les régions et leurs chef-lieux.

Diagnostic : `App.tsx` instanciait `AssociationTab` sur `activeTab === "association"` sans conditionner sur `subject`. À l'intérieur, `AssociationBoard` avait "Pays"/"Capitales" hardcodés et `AssociationGameOverModal` avait `/27` hardcodé à deux endroits — invisibles depuis l'index du composant parent.

Fix en trois temps : généralisation des sous-composants partagés (`leftLabel`/`rightLabel` dans `AssociationBoard`, `totalCountries` dans `AssociationGameOverModal`), création de `FranceAssociationTab/` (utils initBoard depuis `FRENCH_REGIONS`, hook leaderboard avec clé `dnb-france-association-leaderboard`, composant principal avec labels "Régions"/"Chef-lieux"), dispatch par `subject` dans `App.tsx`. Aucun blocker. Lint 0 erreur, build clean 437 kB.

**Entrées clés :**

- [BDR-023](decisions/BDR-023.md) — FranceAssociationTab, architecture et décisions
- [LRN-013](learnings/LRN-013.md) — auditer sous-composants pour labels hardcodés avant de dériver

---

Session de 2 messages. Baptiste demande de centrer les onglets de jeu (Liste, Carte Quiz, Flashcards, Association) et de les faire passer sur plusieurs lignes sur les petits écrans. Fix : `<nav>` dans `App.tsx`, remplacement de `overflow-x-auto` par `flex-wrap justify-center`. Aucun blocker, aucune décision structurante.
