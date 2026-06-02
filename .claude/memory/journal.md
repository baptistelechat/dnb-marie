---
register: journal
last_updated: 2026-06-02
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
