# 📋 Feuille de route — Module Histoire

## Vue d'ensemble

Le module Histoire s'ajoute à côté du module Géographie. Le badge `3ème` dans le header devient un **sélecteur de domaine** (`Géographie` / `Histoire`). Chaque domaine a sa propre navigation interne et ses propres mini-jeux.

---

## Architecture cible

```
App.tsx
├── domain: "geo" | "histoire"           ← NOUVEAU (remplace le badge "3ème")
│
├── [GEO] geoSubject: "eu" | "france"    ← existant, inchangé
├── [GEO] geoTab: "checklist" | "map-quiz" | "capitals-quiz" | "association"
│
├── [HISTOIRE] historySubject: "dates" | "personnages"   ← NOUVEAU
└── [HISTOIRE] historyTab (dates):       "frise" | "ordonner" | "flashcard" | "association"
    [HISTOIRE] historyTab (personnages): "liste" | "association" | "photo"
```

```
src/data/
├── historicalDates.ts       ← { id, type, date, sortKey, endSortKey?, event, period? }[]
└── historicalFigures.ts     ← { id, name, primaryKeyword, keywords[], photos[], period, role }[]

src/components/
├── FriseLectureTab/              ← lecture + validation (Option B lanes)
├── FriseOrdonnnerTab/            ← jeu drag & drop (Option D)
├── HistoirePersonnagesTab/       ← checklist personnages
├── HistoryDatesAssociationTab/
├── HistoryDatesFlashcardTab/
├── HistoryPersonnagesAssociationTab/
└── PhotoFlashcardTab/
```

---

## Phase 0 — Refactoring navigation `App.tsx`

> **Prérequis de toutes les autres phases.** Aucun nouveau jeu n'est développé ici.

### Tâches

- [x] Remplacer le badge `3ème` dans le header par deux boutons pill (`Géographie` / `Histoire`), même style visuel que le sélecteur EU/France actuel
- [x] Ajouter le state `domain: "geo" | "histoire"` dans `App.tsx`
- [x] Conditionner l'affichage du sélecteur EU/France uniquement quand `domain === "geo"` (comportement inchangé)
- [x] Ajouter un sélecteur `Dates` / `Personnages` affiché uniquement quand `domain === "histoire"` (même composant pill — `Calendar` pour Dates, `User` pour Personnages)
- [x] Créer un state `historySubject: "dates" | "personnages"` et un state `historyTab`
- [x] Définir `HISTORY_TABS_DATES` et `HISTORY_TABS_PERSONNAGES` séparés de `GEO_TABS` :

| Domaine                | Onglet          | Icône         | Description                          |
| ---------------------- | --------------- | ------------- | ------------------------------------ |
| Histoire / Dates       | `"Frise"`       | `AlignCenter` | Frise lecture + validation (tap)     |
| Histoire / Dates       | `"Ordonner"`    | `ArrowUpDown` | Jeu drag & drop frise                |
| Histoire / Dates       | `"Flashcards"`  | `Layers`      | Saisie libre date ↔ événement        |
| Histoire / Dates       | `"Association"` | `Link2`       | Jeu association date ↔ événement     |
| Histoire / Personnages | `"Liste"`       | `List`        | Checklist personnages                |
| Histoire / Personnages | `"Association"` | `Link2`       | Jeu association personnage ↔ mot-clé |
| Histoire / Personnages | `"Photos"`      | `Camera`      | Flashcard photo → nom                |

- [x] La navigation des onglets affiche les tabs correspondant à `domain` + `historySubject`
- [x] Le `<main>` dispatche sur `domain` en premier, puis sur les sub-states
- [x] Reset `historyTab` sur `"frise"` quand `historySubject === "dates"`, sur `"liste"` quand `"personnages"`

---

## Phase 1 — Données

> Définir les types, les données statiques, sourcer les ressources. **Bloc bloquant** — aucune phase suivante ne commence sans que les trois sections ci-dessous soient complètes.

### `src/data/historicalDates.ts`

```ts
interface HistoricalDate {
  id: string;
  type: "point" | "range"; // point = date précise, range = période
  date: string; // ex: "11 novembre 1918" ou "1939–1945"
  sortKey: number; // année de début (pour tri chronologique)
  endSortKey?: number; // année de fin — obligatoire si type === "range"
  event: string; // ex: "Armistice de la Première Guerre mondiale"
  period?: string; // ex: "Première Guerre mondiale"
}
```

**Données à intégrer** (doublons nettoyés) :

| Type    | Date             | Événement                                                     |
| ------- | ---------------- | ------------------------------------------------------------- |
| `point` | Août 1914        | Début de la Première Guerre mondiale                          |
| `point` | 1915             | Le génocide arménien                                          |
| `point` | 1916             | La bataille de Verdun                                         |
| `point` | 1917             | La révolution russe                                           |
| `point` | 11 novembre 1918 | Armistice de la Première Guerre mondiale                      |
| `range` | 1924–1953        | Staline au pouvoir en URSS                                    |
| `range` | 1933–1945        | L'Allemagne d'Hitler                                          |
| `point` | 1936             | Le Front populaire                                            |
| `point` | 1 septembre 1939 | Début de la Seconde Guerre mondiale                           |
| `range` | 1939–1945        | La Seconde Guerre mondiale                                    |
| `point` | 18 juin 1940     | Appel du général de Gaulle à la résistance sur la BBC         |
| `point` | 24 octobre 1940  | Entrevue de Montoire — début de la collaboration              |
| `point` | 6 juin 1944      | Débarquement en Normandie                                     |
| `range` | 1944–1945        | La Libération — de Gaulle à la tête du GPRF, programme du CNR |
| `range` | 1944–1946        | Le GPRF : gouvernement provisoire de la République française  |
| `point` | Janvier 1945     | Libération des camps de concentration                         |
| `point` | 8 mai 1945       | Fin de la Seconde Guerre mondiale en Europe                   |
| `point` | Août 1945        | Bombes atomiques sur Hiroshima et Nagasaki                    |
| `range` | 1945–1946        | Création de la Sécurité sociale et droit de vote des femmes   |
| `range` | 1946–1958        | La Quatrième République                                       |

### `src/data/historicalFigures.ts`

```ts
interface HistoricalFigure {
  id: string;
  name: string; // ex: "Jean Moulin"
  primaryKeyword: string; // mot-clé utilisé comme paire dans le jeu Association
  keywords: string[]; // liste complète des mots-clés — à définir en Phase 7 (2-4 par personnage)
  photos: string[]; // URLs Wikimedia Commons (2-3 par personnage) — à sourcer en Phase 1
  period: string; // ex: "Seconde Guerre mondiale"
  role: string; // description courte du rôle historique
}
```

> ⚠️ **`keywords[]` à compléter en Phase 7.** Un seul mot-clé ne résume pas un personnage. La liste complète (2-4 mots-clés par personne) sera définie lors du développement de l'onglet Association Personnages, sur la base du cours de Marie. Le tableau ci-dessous liste uniquement le `primaryKeyword` provisoire.

**`primaryKeyword` provisoire** (à affiner en Phase 7) :

| Personnage                   | primaryKeyword (provisoire)  |
| ---------------------------- | ---------------------------- |
| Pétain                       | Collaboration                |
| Lénine                       | Révolution russe             |
| Staline                      | Totalitarisme / URSS         |
| Hitler                       | Nazisme                      |
| Léon Blum                    | Front populaire              |
| Le général de Gaulle         | Résistance / GPRF            |
| Jean Moulin                  | CNR / Martyr                 |
| Raphaël Élizé                | Premier maire noir de France |
| Germaine Tillion             | Déportée / Ethnologue        |
| Geneviève de Gaulle-Antonioz | Résistante / Ravensbrück     |
| Joséphine Baker              | Espionne / Droits civiques   |

### Ressources photos — tâches obligatoires

- [x] Sourcer 2-3 photos libres de droits (Wikimedia Commons, licence CC) par personnage = 22 à 33 images
- [x] Vérifier le chargement de chaque URL (pas de 404, résolution correcte sur mobile)
- [x] Documenter les URLs validées directement dans `historicalFigures.ts`

### Validation pédagogique — ⛔ bloquant

- [x] Faire valider les données (dates, mots-clés personnages) par Marie ou sur la base de son cours avant de coder quoi que ce soit
- [x] Un scan du cahier d'histoire suffit — l'app doit refléter ce que le prof attend au DNB, pas la culture générale

---

## Phase 1b — Infrastructure partagée (scoring + hint)

> À réaliser **avant** la Phase 2. Toutes les phases de jeu avec saisie libre buildent sur ces composants dès le départ — le retrofit tardif est un risque de régression.

### Tâches

- [x] Créer `src/components/shared/HintButton.tsx`
  - Props : `pool: string[]`, `answer: string`, `onHintUsed: () => void`
  - Génère 3 distracteurs aléatoires + la bonne réponse, dans un ordre shufflé
  - Réutilisé dans `CapitalsQuizTab`, `FranceCapitalsQuizTab`, `HistoryDatesFlashcardTab`, `PhotoFlashcardTab`
- [x] Mettre à jour le contrat `useLeaderboard` : ajouter `hintScore` dans l'entrée sauvegardée
  - Les anciennes entrées sans ce champ affichent `hintScore = 0` par défaut (rétrocompatibilité)
  - _(Extension décidée en session : "voir le drapeau" dans MapQuizTab compte aussi comme hint)_
- [x] Mettre à jour `GameOverModal` (et variantes) pour afficher `freeScore ★ · hintScore 💡 · missedScore ❌`
- [x] Vérifier lint + build clean avant de passer à la Phase 2

---

## Phase 2 — Frise Lecture (onglet `"Frise"`)

> **Remplace la checklist dates.** Format pédagogiquement supérieur à une liste — montre les relations temporelles et les chevauchements de périodes. Composant nouveau, prévoir une session dédiée.

### Concept

- Frise chronologique complète affichant les 20 dates/périodes
- **`type: "point"`** → pastille ronde sur l'axe
- **`type: "range"`** → pilule colorée sur une **lane dédiée** (Option B) pour éviter les chevauchements visuels
- Les lanes sont calculées algorithmiquement : un range occupe la lane la plus basse disponible sur son intervalle
- Marie **tape** sur une pastille ou une pilule pour la marquer comme vue → feedback visuel (couleur validée), haptics `tick()`
- Barre de progression `shared/ProgressBar`, confetti + `success()` à 100%
- Responsive : frise **horizontale** desktop, **verticale** sur mobile

### Tâches

- [ ] Créer `src/components/FriseLectureTab/`
  - `index.tsx` — orchestrateur, gestion de l'état "vues"
  - `components/FriseAxis.tsx` — axe temporel avec graduation annuelle
  - `components/PointMarker.tsx` — pastille ronde, tap pour valider
  - `components/RangeBar.tsx` — pilule colorée sur sa lane, tap pour valider
  - `utils/computeLanes.ts` — algorithme de packing : assigne chaque range à la lane la plus basse disponible sur son intervalle
- [ ] Gérer le scroll horizontal (desktop) / vertical (mobile) sur l'axe
- [ ] Tap sur un item déjà validé → toggle (décocher possible)
- [ ] Barre de progression, confetti, haptics (pattern identique aux checklists existantes)

---

## Phase 3 — Checklist Personnages (onglet `"Liste"`)

> **Modèle :** `EuropTab` / `FranceTab`. Réutilisation directe.

### Tâches

- [ ] Créer `src/components/HistoirePersonnagesTab/`
  - `index.tsx`
  - `components/FigureCard.tsx` — nom + rôle/période, checkbox
- [ ] Afficher nom, période, rôle court
- [ ] Même mécanique de progression, confetti, haptics

---

## Phase 4 — Frise Ordonner (onglet `"Ordonner"`)

> **Jeu drag & drop.** Nouveau territoire technique — prévoir une session dédiée.

### Concept

- 5 à 7 événements tirés aléatoirement présentés comme cartes flottantes à côté d'une frise
- La frise affiche les emplacements vides avec les dates visibles
- Marie glisse chaque carte vers le bon emplacement
- **`type: "point"`** → drop zone = pastille cible, snap sur la date exacte
- **`type: "range"`** → drop zone = zone étendue de la date de début à la date de fin, pilule qui s'anime pour s'étirer après placement correct (Option D)
- Feedback : ✅ vert si correct, ❌ shake rouge + retour à la pile si incorrect
- Score `freeScore` (pas de hint dans ce jeu), timer GO!, leaderboard localStorage

### Tâches

- [ ] Créer `src/components/FriseOrdonnnerTab/`
  - `index.tsx`
  - `components/GameTimeline.tsx` — frise avec drop zones positionnées
  - `components/DraggableEventCard.tsx` — carte draggable (événement sans la date)
  - `components/DropZone.tsx` — cible sur la frise (pastille ou zone étendue selon `type`)
- [ ] Installer et configurer `@dnd-kit/core` + `@dnd-kit/utilities`
- [ ] Gérer le responsive : frise horizontale desktop, verticale sur mobile
- [ ] Animation d'extension de la pilule sur placement correct d'un range
- [ ] Timer GO! + leaderboard localStorage

---

## Phase 5 — Association Dates (onglet `"Association"`)

> **Modèle :** `AssociationTab` existant. Réutilisation quasi-directe.

### Concept

- Colonne gauche : **dates** (ex : `"11 novembre 1918"`)
- Colonne droite : **événements** dans un ordre aléatoire différent
- Même mécanique de match, feedback shake, replace-in-place, timer GO!, leaderboard

### Tâches

- [ ] Créer `src/components/HistoryDatesAssociationTab/`
- [ ] Adapter `utils/initBoard` depuis `historicalDates` (paires `date` ↔ `event`)
- [ ] Labels : `"Dates"` / `"Événements"`
- [ ] Clé leaderboard : `"dnb-histoire-dates-association-leaderboard"`
- [ ] Pool complet, tirage 5 paires par round

---

## Phase 6 — Flashcards Dates (onglet `"Flashcards"`)

> **Modèle :** `CapitalsQuizTab` / `FranceCapitalsQuizTab`. Pattern flashcard avec saisie texte + `HintButton` (Phase 1b).

### Concept

- **Mode A :** date affichée → saisir l'événement
- **Mode B :** événement affiché → saisir la date
- Toggle de direction (`DirectionToggle` existant)
- `HintButton` disponible (4 propositions) → `hintScore 💡` si utilisé
- Timer GO!, leaderboard localStorage

### Tâches

- [ ] Créer `src/components/HistoryDatesFlashcardTab/`
  - `components/DateQuizCard.tsx` — face avant (date ou événement)
  - `components/DateAnswerInput.tsx` — saisie + validation + `HintButton`
  - Réutiliser `shared/ProgressBar`, pattern GO!, `GameOverModal` unifié (Phase 1b)
- [ ] Implémenter `normalizeDateAnswer` — tolérance sur le format, exactitude sur le contenu :
  - `"11 novembre 1918"` = `"11/11/1918"` = `"11/11/18"` = `"11 nov 1918"` = `"11-11-1918"`
  - Pour les ranges (`"1924–1953"`), accepter `"1924 1953"`, `"1924/1953"`, tiret ou espace
- [ ] Toggle A/B direction

---

## Phase 7 — Association Personnages (onglet `"Association"`)

> **Modèle :** `AssociationTab` existant. Même réutilisation que Phase 5.

### Concept

- Colonne gauche : **noms des personnages**
- Colonne droite : **mots-clés biographiques** (`primaryKeyword`)
- Ex : `"Jean Moulin"` ↔ `"CNR / Martyr"`

### Tâches

- [ ] **Définir la liste complète des mots-clés** pour chacun des 11 personnages (2-4 mots-clés par personne), sur la base du cours de Marie — à faire avant de coder
- [ ] Décider comment le jeu utilise les mots-clés multiples : toujours `primaryKeyword` ? tirage aléatoire dans `keywords[]` à chaque round ? → décision à prendre en début de phase
- [ ] Créer `src/components/HistoryPersonnagesAssociationTab/`
- [ ] Paires depuis `historicalFigures.ts` (`name` ↔ mot-clé selon décision ci-dessus)
- [ ] Pool 5 paires par round (11 personnages total)
- [ ] Labels : `"Personnages"` / `"Mots-clés"`
- [ ] Clé leaderboard : `"dnb-histoire-personnages-association-leaderboard"`

---

## Phase 8 — Flashcards Photos Personnages (onglet `"Photos"`)

> **Nouveau type de jeu.** Ressources images à sourcer en Phase 1.

### Concept

- Une photo du personnage s'affiche (plein cadre dans une carte)
- Marie saisit librement le nom du personnage
- Bouton **"Proposition"** optionnel : affiche 4 noms au choix → `hintScore 💡` si utilisé
- Plusieurs photos par personnage (pool shufflé) pour éviter la mémorisation d'une seule image
- Nom partiel accepté : `"De Gaulle"` valide pour `"Le général de Gaulle"`
- Feedback : nom attendu affiché en cas d'erreur
- Timer GO!, leaderboard localStorage

### Tâches

- [ ] Créer `src/components/PhotoFlashcardTab/`
  - `index.tsx` — construit un pool de photos shufflé à partir de `historicalFigures`
  - `components/PhotoCard.tsx` — image plein cadre arrondie, sans label
  - `components/PersonNameInput.tsx` — saisie nom + validation + `HintButton` (Phase 1b)
- [ ] `normalizeAnswer` adapté aux noms propres (accents, majuscules, tirets, noms partiels)
- [ ] Fallback placeholder avec initiales si image introuvable
- [ ] Progression : `X / total photos` (pas `X / 11 personnages`)
- [ ] Timer GO!, leaderboard localStorage

---

## Phase 9 — Jeu bonus "Qui suis-je ?" _(optionnel)_

> Faible priorité. À implémenter après validation des phases 2–8.

### Concept

- 3 à 4 indices textuels se dévoilent progressivement (clic sur "Indice suivant")
- Exemple pour Jean Moulin :
  1. _"Je suis mort en 1943, arrêté à Caluire."_
  2. _"J'ai unifié la Résistance intérieure française."_
  3. _"Je présidais le Conseil National de la Résistance."_
- Saisie libre après chaque indice ou à la fin
- Score basé sur le nombre d'indices utilisés (moins = meilleur)

---

## Phase 10 — Rétrofit Proposition sur UE et France (cohérence globale)

> À réaliser après la Phase 8, une fois le système "Proposition" stabilisé sur le module Histoire. Le `HintButton` est déjà construit en Phase 1b — il s'agit ici de le brancher sur les composants existants.

### Jeux concernés

| Composant                                   | Type de proposition   |
| ------------------------------------------- | --------------------- |
| `CapitalsQuizTab` (UE Flashcards)           | 4 capitales au choix  |
| `FranceCapitalsQuizTab` (France Flashcards) | 4 chef-lieux au choix |

### Tâches

- [ ] Brancher `HintButton` dans `CapitalsQuizTab` (composant déjà prêt depuis Phase 1b)
- [ ] Brancher `HintButton` dans `FranceCapitalsQuizTab`
- [ ] Mettre à jour le scoring dans les deux composants : `freeScore ★` / `hintScore 💡`
- [ ] Vérifier la rétrocompatibilité leaderboard (anciennes entrées → `hintScore = 0` implicite)

---

## Système de score unifié

> Applicable à tous les jeux de saisie libre : Flashcards UE, Flashcards France, Flashcards Dates, Photos Personnages.

### Règles par item

| Situation                                          | `freeScore` | `hintScore` |
| -------------------------------------------------- | ----------- | ----------- |
| Saisie libre correcte au 1er essai                 | +1 ★        | —           |
| Proposition ouverte, réponse correcte au 1er essai | —           | +1 💡       |
| Incorrect ou passé                                 | —           | —           |

### Affichage GameOverModal

```
23 ★  ·  3 💡  ·  1 ❌
```

Pas de décimales, lisible immédiatement. Le total (`23 + 3 + 1 = 27`) correspond toujours au nombre d'items.

### Tri leaderboard

```
score_pondéré = freeScore × 2 + hintScore
```

| Critère         | Ordre | Signification              |
| --------------- | ----- | -------------------------- |
| `score_pondéré` | desc  | D'abord, tu sais           |
| `freeScore` (★) | desc  | Ensuite, tu sais sans aide |
| `temps`         | asc   | Enfin, tu sais vite        |

Chaque critère affine le précédent sans jamais le contredire. Le temps n'intervient qu'en cas d'égalité parfaite.

### Rétrocompatibilité

Les entrées leaderboard existantes (format `{ name, time, firstTryScore }`) s'affichent avec `hintScore = 0` implicitement — aucune migration localStorage nécessaire.

---

## Ordre recommandé de développement

| Priorité | Phase                                   | Complexité | Valeur pédagogique |
| -------- | --------------------------------------- | ---------- | ------------------ |
| 1        | Phase 0 — Navigation                    | Moyenne    | Prérequis          |
| 2        | Phase 1 — Données + Photos + Validation | Faible ⛔  | Prérequis          |
| 3        | Phase 1b — Infrastructure partagée      | Moyenne    | Prérequis          |
| 4        | Phase 2 — Frise Lecture                 | Haute 🆕   | ⭐⭐⭐⭐⭐         |
| 5        | Phase 3 — Checklist Personnages         | Faible ♻️  | ⭐⭐⭐             |
| 6        | Phase 5 — Association Dates             | Faible ♻️  | ⭐⭐⭐             |
| 7        | Phase 7 — Association Personnages       | Faible ♻️  | ⭐⭐⭐             |
| 8        | Phase 6 — Flashcards Dates              | Moyenne ♻️ | ⭐⭐⭐⭐           |
| 9        | Phase 8 — Photos Personnages            | Haute 🆕   | ⭐⭐⭐⭐           |
| 10       | Phase 4 — Frise Ordonner (drag & drop)  | Haute 🆕   | ⭐⭐⭐⭐⭐         |
| 11       | Phase 9 — Qui suis-je ?                 | Haute 🆕   | ⭐⭐               |
| 12       | Phase 10 — Rétrofit Proposition UE/FR   | Faible ♻️  | ⭐⭐⭐⭐           |

♻️ = réutilise un pattern existant | 🆕 = nouveau territoire technique | ⛔ = bloquant

---

## Points de décision ✅ Tranchés

| #   | Question                     | Décision retenue                                                                                  |
| --- | ---------------------------- | ------------------------------------------------------------------------------------------------- |
| 1   | **Drag & drop frise**        | `@dnd-kit/core` — UX tactile mobile correcte                                                      |
| 2   | **Tolérance réponse "date"** | Correspondance exacte sur le contenu, tolérance sur le format (`11/11/1918`, `11 nov 1918`, etc.) |
| 3   | **Mode photos personnages**  | Saisie libre + bouton "Proposition" optionnel — correct libre → `★`, correct avec aide → `💡`     |
| 4   | **Accepter nom partiel**     | Oui — `"De Gaulle"` valide pour `"Le général de Gaulle"`                                          |
| 5   | **Intervalles sur la frise** | `type: "point" \| "range"` dans `HistoricalDate`, `endSortKey` obligatoire pour les ranges        |
| 6   | **Frise lecture vs liste**   | Frise lecture (Option B lanes) remplace la checklist dates — onglet nommé `"Frise"`               |
| 7   | **Frise jeu**                | Option D (pastille/pilule, snap début, extension animée) — onglet nommé `"Ordonner"`              |
| 8   | **Tri leaderboard égalité**  | `score_pondéré` desc → `freeScore` desc → `temps` asc                                             |
| 9   | **Temps par item**           | Non — temps total uniquement, comme 3ème critère de tri (pas de pénalité de vitesse par réponse)  |
