# Guide — Ajouter des personnages et des dates historiques

Ce guide décrit la procédure complète pour intégrer proprement de nouvelles entrées
dans `src/data/historicalFigures.ts` et `src/data/historicalDates.ts`.

---

## 1. Ajouter un personnage (`historicalFigures.ts`)

L'ajout d'un personnage se fait en **deux phases** : les photos sont validées
manuellement avant d'être intégrées dans le code.

---

### Phase 1 — Valider les photos (obligatoire avant toute intégration)

#### 1a. Trouver des URLs candidates

Collecter 4 à 8 URLs de photos pour le personnage.
Wikimedia Commons (`upload.wikimedia.org`) en priorité — images libres de droits.
Les photos d'autres sources sont acceptées pour cette app privée et non commerciale.

#### 1b. Ajouter le personnage dans `validate-photos.html`

Ouvrir `src/data/validate-photos.html` et ajouter une entrée dans le tableau `data`
(dans la balise `<script>`) :

```js
{
  id: "nouveau-personnage",         // kebab-case, identique à l'id futur dans historicalFigures.ts
  name: "Prénom Nom",               // nom affiché dans l'outil
  role: "Rôle court — Contexte",    // affiché sous le nom
  photos: [
    { url: "https://...", label: "Description courte" },
    { url: "https://...", label: "Description courte" },
    // autant d'URLs candidates que nécessaire
  ],
},
```

#### 1c. Ouvrir dans un navigateur et sélectionner

Ouvrir `src/data/validate-photos.html` dans Chrome ou Firefox (double-clic suffit).

Pour chaque personnage ajouté :

- Les photos qui chargent affichent ✅, celles cassées affichent ❌ 404 et sont grisées
- Cliquer sur chaque photo acceptable pour la cocher (bordure verte)
- Viser **2 à 6 photos** par personnage (badge vert à partir de 3)

> **STOP** — Ne pas passer à la Phase 2 avant d'avoir sélectionné les photos ici.

#### 1d. Exporter la sélection

Cliquer sur **"Exporter la sélection"** en bas de page.
Une modale s'ouvre avec le JSON des URLs cochées.
Copier ce JSON — il sera utilisé à la Phase 2.

---

### Phase 2 — Intégrer dans `historicalFigures.ts`

Une fois les photos validées et exportées, ajouter l'entrée complète dans le tableau
`HISTORICAL_FIGURES` de `src/data/historicalFigures.ts`.

#### Structure complète

```typescript
{
  id: string,             // kebab-case, unique dans le fichier
  name: string,           // Nom affiché dans l'interface
  primaryKeyword: string, // Mot-clé principal (affiché en premier dans Association)
  keywords: string[],     // 2-4 mots-clés pour le jeu Association
  photos: string[],       // URLs issues de l'export de validate-photos.html
  period: string,         // Période historique
  role: string,           // Description courte du rôle
  clues: string[],        // Exactement 5 indices pour QuiSuisJe
}
```

#### Règles champ par champ

**`id`**

- Format kebab-case, basé sur le nom de famille : `"moulin"`, `"gaulle-antonioz"`
- Doit être unique parmi tous les personnages du tableau

**`primaryKeyword`**

- Le concept ou rôle le plus distinctif du personnage
- Doit être **globalement unique** : chercher ce mot dans tout le fichier avant de l'utiliser

**`keywords`**

- Array de 2 à 4 éléments
- Toujours mettre `primaryKeyword` en premier élément
- **Règle anti-collision** : chaque keyword doit être absent des `keywords` de tous les autres personnages
  déjà présents dans le tableau — chercher chaque terme dans le fichier avant d'ajouter
- Exemple conforme : `["Front populaire", "Congés payés", "SFIO"]` (aucun de ces termes n'apparaît ailleurs)

**`photos`**

- Copier exactement les URLs issues du JSON exporté à la Phase 1
- Ne jamais mettre d'URL non passée par `validate-photos.html`

**`period`**

- Utiliser une des valeurs existantes pour rester cohérent :
  - `"Première Guerre mondiale"`
  - `"Révolution russe"`
  - `"Entre-deux-guerres"`
  - `"Entre-deux-guerres / Seconde Guerre mondiale"`
  - `"Seconde Guerre mondiale"`

**`role`**

- 1-2 propositions max, affiché dans la liste et les jeux
- Style : rôle principal + contexte court
- Exemple : `"Résistant, fondateur du CNR, mort sous la torture en 1943"`

**`clues`**

- Exactement **5 éléments**
- Écrits à la **première personne** (`"Je suis..."`, `"Je dirige..."`)
- Du plus vague (indice 1) au plus précis (indice 5) — progression obligatoire
- L'indice 1 doit convenir à plusieurs personnages de l'époque
- L'indice 5 doit permettre l'identification certaine **sans citer le nom ni le prénom**
- Ne jamais mentionner le nom ou le prénom dans aucun des 5 indices

#### Exemple complet

```typescript
{
  id: "nouveau-personnage",
  name: "Prénom Nom",
  primaryKeyword: "Concept distinctif",
  keywords: ["Concept distinctif", "Mot-clé 2", "Mot-clé 3"],
  photos: [
    // URLs copiées depuis l'export de validate-photos.html
    "https://upload.wikimedia.org/wikipedia/commons/x/xx/photo1.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/y/yy/photo2.jpg",
  ],
  period: "Seconde Guerre mondiale",
  role: "Rôle principal, contexte historique",
  clues: [
    "Je suis un(e) [profession] français(e) actif(ve) pendant [époque générale].",
    "Je [action historique large, sans nommer ni le lieu ni la date précise].",
    "Je [action plus spécifique, un indice de lieu ou de fonction].",
    "Je [action ou fait bien identifiable dans l'historiographie].",
    "Je [fait signature très précis qui permet l'identification sans citer le nom].",
  ],
},
```

---

## 2. Ajouter une date ou une période (`historicalDates.ts`)

### Structure — événement ponctuel (`type: "point"`)

```typescript
{
  id: string,      // kebab-case, unique dans le fichier
  type: "point",
  date: string,    // Format lisible : "18 juin 1940", "1917", "Août 1945"
  sortKey: number, // Année de début, entier : 1940
  event: string,   // Intitulé de l'événement
  period?: string, // Optionnel : regroupe dans une période de la frise
}
```

### Structure — période (`type: "range"`)

```typescript
{
  id: string,
  type: "range",
  date: string,        // Format : "1939–1945" (tiret long — U+2013)
  sortKey: number,     // Année de début : 1939
  endSortKey: number,  // Année de fin — OBLIGATOIRE pour les ranges : 1945
  event: string,
  period?: string,
}
```

### Règles champ par champ

**`id`**

- Format kebab-case, descriptif de l'événement
- Exemples : `"appel-18-juin"`, `"wwii-debut"`, `"front-populaire"`
- Doit être unique dans le tableau

**`date`** (champ affiché dans l'interface)

- Événement avec jour précis : `"18 juin 1940"`, `"11 novembre 1918"`, `"6 juin 1944"`
- Événement avec mois seulement : `"Août 1914"`, `"Janvier 1945"`
- Événement avec année seule : `"1917"`, `"1936"`
- Période : `"1939–1945"` — utiliser le **tiret long** `–` (U+2013), pas un trait d'union `-`

**`sortKey` / `endSortKey`**

- Toujours un entier représentant l'année : `1944`, pas `1944.5`
- Pour un range : `endSortKey` est obligatoire — ne jamais l'omettre
- Plusieurs événements peuvent avoir le même `sortKey` (même année) — ils sont distingués par `id`

**`event`**

- Commencer par un article défini ou un nom propre : `"Le Front populaire"`, `"La bataille de Verdun"`
- Limite recommandée : 80 caractères (affiché dans la frise et les flashcards)

**`period`**

- Optionnel — sert à regrouper des événements dans la frise lecture
- Valeurs existantes : `"Première Guerre mondiale"`, `"Seconde Guerre mondiale"`
- Laisser vide si l'événement ne s'inscrit pas clairement dans une période existante

**Position dans le tableau**

- Insérer dans l'ordre chronologique (par `sortKey` croissant)
- En cas de même `sortKey`, les ranges viennent après les points du même année

### Exemple complet

```typescript
{
  id: "lois-nuremberg",
  type: "point",
  date: "1935",
  sortKey: 1935,
  event: "Les lois de Nuremberg — exclusion des Juifs allemands",
  period: "Entre-deux-guerres",
},
```

---

## 3. Checklist d'intégration

### Personnage historique

- [ ] URLs candidates trouvées (4 à 8 URLs)
- [ ] Entrée ajoutée dans `src/data/validate-photos.html`
- [ ] Photos validées visuellement dans le navigateur (✅ chargent, 2-6 cochées)
- [ ] Sélection exportée depuis la modale ← **STOP avant la suite**
- [ ] `id` unique dans `historicalFigures.ts`
- [ ] Chaque keyword absent des `keywords` de tous les personnages existants
- [ ] Entrée ajoutée dans `historicalFigures.ts` avec les URLs de l'export uniquement
- [ ] `pnpm lint` — zéro erreur

### Date / Période

- [ ] `id` unique dans `historicalDates.ts`
- [ ] `sortKey` est un entier (année)
- [ ] Si `type: "range"` : `endSortKey` renseigné
- [ ] Tiret long `–` (U+2013) dans le champ `date` pour les ranges
- [ ] Entrée insérée dans l'ordre chronologique
- [ ] `pnpm lint` — zéro erreur

### Commande rapide

```bash
pnpm lint
```

---

## 4. Jeux impactés par type de données

| Donnée ajoutée        | Jeux affectés                                                                                     |
| --------------------- | ------------------------------------------------------------------------------------------------- |
| Personnage historique | `PhotoFlashcardTab`, `QuiSuisJeTab`, `HistoirePersonnagesTab`, `HistoryPersonnagesAssociationTab` |
| Date / Période        | `HistoryDatesFlashcardTab`, `HistoryDatesAssociationTab`, `FriseLectureTab`, `FriseOrdonnnerTab`  |

Les nouvelles données sont prises en compte automatiquement par tous ces composants
au prochain démarrage du dev server ou rebuild — aucune modification de code nécessaire.
