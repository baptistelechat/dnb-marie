---
register: journal
last_updated: 2026-06-03
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
