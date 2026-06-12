# Roadmap d'intégration — Lot 01

Sources analysées :

- Notes manuscrites (2 pages) — repères Thème 1 + IVe République
- Fiche "Les Repères Historiques du Brevet 3ème" — 3 thèmes
- Manuel p.170-187 "La Ve République de 1958 aux années 1980" — 4 périodes présidentielles
- Fiche "Le monde depuis 1945"

---

## Données déjà présentes — rien à faire

Toutes les dates du **Thème 1 (1914–1945)** et la **IVe République (1946–1958)** sont déjà dans `historicalDates.ts`. Tous les personnages actuels restent inchangés.

---

## Nouvelles périodes à créer

```
"Guerre froide"
"Ve République"
```

- `"Guerre froide"` → regroupe les dates mondiales du Thème 2 : ONU, Guerre froide, chute du mur de Berlin.
- `"Ve République"` → regroupe toutes les dates françaises du Thème 3.

> ⚠️ `traite-rome` (1957) et `guerre-algerie` (1954–1962) sont antérieurs à la Ve République (1958), mais regroupés ici suivant le découpage thématique du DNB.

---

## A. Nouvelles dates — `historicalDates.ts`

**35 entrées à ajouter, dans l'ordre chronologique.**

---

### Thème 2 — Le monde depuis 1945 (5 dates)

| #   | `id`                   | `date`        | `type`  | `sortKey` | `endSortKey` | `event`                                               | `period`          |
| --- | ---------------------- | ------------- | ------- | --------- | ------------ | ----------------------------------------------------- | ----------------- |
| 1   | `onu-creation`         | `"1945"`      | `point` | `1945`    | —            | `"La création de l'ONU"`                              | `"Guerre froide"` |
| 2   | `guerre-froide`        | `"1947–1991"` | `range` | `1947`    | `1991`       | `"La Guerre froide"`                                  | `"Guerre froide"` |
| 3   | `traite-rome`          | `"1957"`      | `point` | `1957`    | —            | `"Le Traité de Rome — création de la CEE"`            | `"Ve République"` |
| 4   | `independance-algerie` | `"1962"`      | `point` | `1962`    | —            | `"L'indépendance de l'Algérie — les accords d'Évian"` | `"Ve République"` |
| 5   | `chute-mur-berlin`     | `"1989"`      | `point` | `1989`    | —            | `"La chute du mur de Berlin"`                         | `"Guerre froide"` |

---

### Thème 3 — Françaises et Français dans une République repensée (30 dates)

#### Période 1 — La République gaullienne (1958–1969)

| #   | `id`                         | `date`        | `type`  | `sortKey` | `endSortKey` | `event`                                                | `period`          |
| --- | ---------------------------- | ------------- | ------- | --------- | ------------ | ------------------------------------------------------ | ----------------- |
| 6   | `guerre-algerie`             | `"1954–1962"` | `range` | `1954`    | `1962`       | `"La Guerre d'Algérie"`                                | `"Ve République"` |
| 7   | `cinquieme-republique`       | `"1958"`      | `point` | `1958`    | —            | `"Naissance de la Ve République"`                      | `"Ve République"` |
| 8   | `crise-mai-1958`             | `"Mai 1958"`  | `point` | `1958`    | —            | `"Crise politique liée à la Guerre d'Algérie"`         | `"Ve République"` |
| 9   | `suffrage-universel-direct`  | `"1962"`      | `point` | `1962`    | —            | `"Élection du président au suffrage universel direct"` | `"Ve République"` |
| 10  | `mai-68`                     | `"Mai 1968"`  | `point` | `1968`    | —            | `"Mai 68 — révolte de la jeunesse"`                    | `"Ve République"` |
| 11  | `demission-degaulle`         | `"1969"`      | `point` | `1969`    | —            | `"Démission du général de Gaulle"`                     | `"Ve République"` |
| 12  | `referendum-regionalisation` | `"1969"`      | `point` | `1969`    | —            | `"Échec du référendum sur la régionalisation"`         | `"Ve République"` |

> ⚠️ `#7` et `#8` ont `sortKey: 1958`, `#4` et `#9` ont `sortKey: 1962`, `#11` et `#12` ont `sortKey: 1969` — autorisé, chaque entrée a un `id` distinct.

#### Période 2 — Après de Gaulle : Pompidou & Giscard d'Estaing (1969–1981)

| #   | `id`                     | `date`        | `type`  | `sortKey` | `endSortKey` | `event`                                         | `period`          |
| --- | ------------------------ | ------------- | ------- | --------- | ------------ | ----------------------------------------------- | ----------------- |
| 13  | `pompidou-mandat`        | `"1969–1974"` | `range` | `1969`    | `1974`       | `"Présidence de Georges Pompidou"`              | `"Ve République"` |
| 14  | `centre-pompidou`        | `"1969"`      | `point` | `1969`    | —            | `"Lancement du Centre G. Pompidou (Beaubourg)"` | `"Ve République"` |
| 15  | `decennie-modernisation` | `"1970–1980"` | `range` | `1970`    | `1980`       | `"Les années 1970 — décennie de modernisation"` | `"Ve République"` |
| 16  | `choc-petrolier-1973`    | `"1973"`      | `point` | `1973`    | —            | `"Premier choc pétrolier"`                      | `"Ve République"` |
| 17  | `giscard-mandat`         | `"1974–1981"` | `range` | `1974`    | `1981`       | `"Présidence de Valéry Giscard d'Estaing"`      | `"Ve République"` |
| 18  | `majorite-18-ans`        | `"1974"`      | `point` | `1974`    | —            | `"La majorité électorale abaissée à 18 ans"`    | `"Ve République"` |
| 19  | `loi-veil-ivg`           | `"1975"`      | `point` | `1975`    | —            | `"La loi Veil sur l'IVG"`                       | `"Ve République"` |
| 20  | `choc-petrolier-1979`    | `"1979"`      | `point` | `1979`    | —            | `"Second choc pétrolier"`                       | `"Ve République"` |

> ⚠️ `#13` (`pompidou-mandat`) et `#14` (`centre-pompidou`) ont `sortKey: 1969`. `#17` et `#18` ont `sortKey: 1974`.

#### Période 3 — Les années Mitterrand (1981–1995)

| #   | `id`                    | `date`        | `type`  | `sortKey` | `endSortKey` | `event`                                                   | `period`          |
| --- | ----------------------- | ------------- | ------- | --------- | ------------ | --------------------------------------------------------- | ----------------- |
| 21  | `mitterrand-1er-mandat` | `"1981–1988"` | `range` | `1981`    | `1988`       | `"Premier mandat de François Mitterrand"`                 | `"Ve République"` |
| 22  | `mitterrand-alternance` | `"1981"`      | `point` | `1981`    | —            | `"Première alternance — élection de François Mitterrand"` | `"Ve République"` |
| 23  | `abolition-peine-mort`  | `"1981"`      | `point` | `1981`    | —            | `"Abolition de la peine de mort"`                         | `"Ve République"` |
| 24  | `decentralisation`      | `"1982"`      | `point` | `1982`    | —            | `"Mise en place de la décentralisation"`                  | `"Ve République"` |
| 25  | `fn-montee-1983`        | `"1983"`      | `point` | `1983`    | —            | `"Montée du Front national"`                              | `"Ve République"` |
| 26  | `chomage-montee`        | `"1980–1990"` | `range` | `1980`    | `1990`       | `"Montée du chômage en France"`                           | `"Ve République"` |
| 27  | `rmi`                   | `"1988"`      | `point` | `1988`    | —            | `"Création du RMI (Revenu Minimum d'Insertion)"`          | `"Ve République"` |
| 28  | `mitterrand-2e-mandat`  | `"1988–1995"` | `range` | `1988`    | `1995`       | `"Deuxième mandat de François Mitterrand"`                | `"Ve République"` |
| 29  | `traite-maastricht`     | `"1992"`      | `point` | `1992`    | —            | `"Le traité de Maastricht"`                               | `"Ve République"` |

> ⚠️ `#21`, `#22`, `#23` ont tous `sortKey: 1981`. `#27` et `#28` ont `sortKey: 1988`.

#### Période 4 — Les années Chirac (1995–2007)

| #   | `id`                     | `date`        | `type`  | `sortKey` | `endSortKey` | `event`                                                 | `period`          |
| --- | ------------------------ | ------------- | ------- | --------- | ------------ | ------------------------------------------------------- | ----------------- |
| 30  | `chirac-septennat`       | `"1995–2002"` | `range` | `1995`    | `2002`       | `"Septennat de Jacques Chirac"`                         | `"Ve République"` |
| 31  | `cohabitation-jospin`    | `"1997–2002"` | `range` | `1997`    | `2002`       | `"Cohabitation Chirac-Jospin"`                          | `"Ve République"` |
| 32  | `pacs-cmu`               | `"1999"`      | `point` | `1999`    | —            | `"La loi sur le PACS et création de la CMU"`            | `"Ve République"` |
| 33  | `referendum-quinquennat` | `"2000"`      | `point` | `2000`    | —            | `"Référendum sur le quinquennat"`                       | `"Ve République"` |
| 34  | `fn-2002`                | `"2002"`      | `point` | `2002`    | —            | `"Le Front national au 2ème tour de la présidentielle"` | `"Ve République"` |
| 35  | `chirac-quinquennat`     | `"2002–2007"` | `range` | `2002`    | `2007`       | `"Quinquennat de Jacques Chirac"`                       | `"Ve République"` |

> ⚠️ `#34` et `#35` ont `sortKey: 2002`.

---

## B. Nouveaux personnages — `historicalFigures.ts`

**5 entrées à ajouter.** Toutes ont `period: "Ve République"`.

---

### 1. Simone Veil

| Champ            | Valeur                                                                                       |
| ---------------- | -------------------------------------------------------------------------------------------- |
| `id`             | `"veil"`                                                                                     |
| `name`           | `"Simone Veil"`                                                                              |
| `primaryKeyword` | `"Loi IVG"` ✓ absent des primaryKeywords existants                                           |
| `keywords`       | `["Loi IVG", "Ministre de la Santé", "Survivante Auschwitz"]` — anti-collision à vérifier    |
| `role`           | `"Ministre de la Santé (1974–1979), porte la loi sur l'IVG en 1975, survivante de la Shoah"` |
| `photos`         | Phase 1 obligatoire — valider dans `validate-photos.html`                                    |

**Indices préliminaires :**

```
1. "Je suis une femme politique française du XXe siècle, marquée très jeune par l'une des pages les plus sombres de l'histoire européenne."
2. "Adolescente, j'ai été déportée avec ma famille dans un camp de concentration nazi, dont je suis l'une des rares rescapées."
3. "Je deviens ministre dans les années 1970, dans un domaine directement lié à la santé et aux droits des femmes."
4. "Je défends devant l'Assemblée nationale une loi autorisant l'interruption volontaire de grossesse, face à une opposition virulente."
5. "La loi que je fais adopter en 1975 porte désormais mon nom : elle reste l'un des symboles majeurs de la lutte pour les droits des femmes en France."
```

---

### 2. Georges Pompidou

| Champ            | Valeur                                                                                             |
| ---------------- | -------------------------------------------------------------------------------------------------- |
| `id`             | `"pompidou"`                                                                                       |
| `name`           | `"Georges Pompidou"`                                                                               |
| `primaryKeyword` | `"Beaubourg"` ✓                                                                                    |
| `keywords`       | `["Beaubourg", "Modernisation des années 70", "Gaullisme social"]` — anti-collision à vérifier     |
| `role`           | `"Président de la République (1969–1974), successeur de De Gaulle, initiateur du Centre Pompidou"` |
| `photos`         | Phase 1 obligatoire — valider dans `validate-photos.html`                                          |

**Indices préliminaires :**

```
1. "Je suis un homme politique français qui a exercé les plus hautes fonctions sous la Ve République dans les années 1960–1970."
2. "Agrégé de lettres, je suis d'abord enseignant avant de devenir le principal collaborateur du fondateur de la Ve République."
3. "Je suis nommé Premier ministre, puis élu président de la République après la démission de mon prédécesseur en 1969."
4. "Ma présidence est marquée par la modernisation économique et sociale de la France, mais aussi par les débuts d'une crise pétrolière."
5. "Un immense centre d'art moderne et de culture, reconnaissable à ses tuyaux colorés en façade, porte mon nom en plein cœur de Paris."
```

---

### 3. Valéry Giscard d'Estaing

| Champ            | Valeur                                                                                       |
| ---------------- | -------------------------------------------------------------------------------------------- |
| `id`             | `"giscard"`                                                                                  |
| `name`           | `"Valéry Giscard d'Estaing"`                                                                 |
| `primaryKeyword` | `"VGE"` ✓                                                                                    |
| `keywords`       | `["VGE", "Libéral avancé", "Majorité 18 ans"]` — anti-collision à vérifier                   |
| `role`           | `"Président de la République (1974–1981), réformes libérales, abaisse la majorité à 18 ans"` |
| `photos`         | Phase 1 obligatoire — valider dans `validate-photos.html`                                    |

**Indices préliminaires :**

```
1. "Je suis un homme d'État français issu de la droite libérale, diplômé des grandes écoles, ministre des Finances avant d'être élu président."
2. "Élu en 1974 avec un écart de moins d'un point, je suis à l'époque le plus jeune président de la Ve République."
3. "Je modernise la société française : j'abaisse la majorité électorale à 18 ans et permets l'adoption de la loi sur l'IVG."
4. "Mon mandat est assombri par les deux chocs pétroliers, qui provoquent la montée du chômage et de l'inflation."
5. "Je suis le seul président de la Ve République à n'avoir appartenu ni au parti gaulliste ni au Parti socialiste, et je perds la présidentielle de 1981 face à la gauche."
```

---

### 4. François Mitterrand

| Champ            | Valeur                                                                                             |
| ---------------- | -------------------------------------------------------------------------------------------------- |
| `id`             | `"mitterrand"`                                                                                     |
| `name`           | `"François Mitterrand"`                                                                            |
| `primaryKeyword` | `"Rose au poing"` ✓                                                                                |
| `keywords`       | `["Rose au poing", "1er Président socialiste", "Pyramide du Louvre"]` — anti-collision à vérifier  |
| `role`           | `"Président de la République (1981–1995), 1er président socialiste Ve République, grands travaux"` |
| `photos`         | Phase 1 obligatoire — valider dans `validate-photos.html`                                          |

**Indices préliminaires :**

```
1. "Je suis une figure majeure du socialisme français, ayant cherché pendant des décennies à conquérir la présidence de la République."
2. "Chef du Parti socialiste, j'arrive au second tour de plusieurs élections présidentielles avant de finalement remporter la victoire."
3. "En 1981, mon élection est historique : je suis le premier président de gauche de la Ve République, incarnant une alternance attendue depuis 23 ans."
4. "Mes deux mandats de sept ans sont marqués par l'abolition de la peine de mort, la décentralisation et des périodes de cohabitation politique."
5. "Je suis le président des grands travaux parisiens — la Pyramide du Louvre, l'Arche de la Défense, la Bibliothèque nationale qui porte mon prénom."
```

---

### 5. Jacques Chirac

| Champ            | Valeur                                                                                  |
| ---------------- | --------------------------------------------------------------------------------------- |
| `id`             | `"chirac"`                                                                              |
| `name`           | `"Jacques Chirac"`                                                                      |
| `primaryKeyword` | `"Quinquennat"` ✓                                                                       |
| `keywords`       | `["Quinquennat", "RPR", "Musée du Quai Branly"]` — anti-collision à vérifier            |
| `role`           | `"Président de la République (1995–2007), réforme du quinquennat, cohabitation Jospin"` |
| `photos`         | Phase 1 obligatoire — valider dans `validate-photos.html`                               |

**Indices préliminaires :**

```
1. "Je suis un homme politique français de la droite gaulliste, figure de la vie politique française pendant plus de trente ans."
2. "Deux fois Premier ministre avant d'accéder à la présidence, je suis réputé pour mon sens du contact avec les Français."
3. "Je suis élu président en 1995, puis réélu en 2002 dans un contexte sans précédent : mon adversaire au second tour est le leader d'un parti d'extrême droite."
4. "Je vis une longue cohabitation avec un Premier ministre socialiste, de 1997 à 2002."
5. "Je suis le président qui a réduit le mandat présidentiel de 7 à 5 ans — mon second mandat est le premier quinquennat de l'histoire de la Ve République."
```

---

## C. Checklist d'exécution

### Phase 1 — Dates (sans prérequis)

- [ ] Ajouter les **35 entrées** dans `historicalDates.ts` en ordre chronologique (`sortKey` croissant)
- [ ] Vérifier que chaque `id` est unique dans le fichier
- [ ] Vérifier le tiret long `–` (U+2013) sur tous les ranges
- [ ] Vérifier `endSortKey` renseigné pour chaque `type: "range"`
- [ ] `pnpm lint` — zéro erreur

### Phase 2 — 5 personnages (après Phase 1)

Pour chacun des 5 personnages dans l'ordre : Veil → Pompidou → Giscard → Mitterrand → Chirac

- [ ] Trouver 4 à 8 URLs candidates (Wikimedia Commons en priorité)
- [ ] Ajouter l'entrée dans `src/data/validate-photos.html`
- [ ] Valider les photos dans le navigateur (2–6 cochées)
- [ ] Exporter la sélection depuis la modale ← **STOP avant la suite**
- [ ] Vérifier l'absence de collision sur chaque keyword dans `historicalFigures.ts`
- [ ] Ajouter l'entrée complète avec les URLs de l'export uniquement
- [ ] `pnpm lint` — zéro erreur (après chaque personnage)
