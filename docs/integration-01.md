# Roadmap d'intégration — Lot 01

Sources analysées :

- Notes manuscrites (2 pages) — repères Thème 1 + IVe République
- Fiche "Les Repères Historiques du Brevet 3ème" — 3 thèmes
- Manuel p.170-187 "La Ve République de 1958 aux années 1980" — 4 périodes présidentielles
- Fiche "Le monde depuis 1945"

---

## État d'avancement

| Phase | Description                                   | Statut      |
| ----- | --------------------------------------------- | ----------- |
| A     | Nouvelles dates (`historicalDates.ts`)        | ✅ Terminé  |
| B     | Nouveaux personnages (`historicalFigures.ts`) | 🔄 En cours |

---

## Données déjà présentes — rien à faire

Toutes les dates du **Thème 1 (1914–1945)** et la **IVe République (1946–1958)** sont déjà dans `historicalDates.ts`. Tous les personnages actuels restent inchangés.

---

## Nouvelles périodes créées

```
"Guerre froide"
"Ve République"
```

- `"Guerre froide"` → regroupe les dates mondiales du Thème 2 : ONU, Guerre froide, chute du mur de Berlin.
- `"Ve République"` → regroupe toutes les dates françaises du Thème 3.

> ⚠️ `traite-rome` (1957) et `guerre-algerie` (1954–1962) sont antérieurs à la Ve République (1958), mais regroupés ici suivant le découpage thématique du DNB.

---

## A. Nouvelles dates — `historicalDates.ts` ✅

**39 entrées ajoutées** (35 du plan initial + 1 `onu-creation` déplacé dans Thème 2 + 3 mandats Sarkozy/Hollande/Macron).

---

### Thème 2 — Le monde depuis 1945 (5 dates) ✅

| #   | `id`                   | `date`        | `type`  | `sortKey` | `endSortKey` | `event`                                               | `period`          |
| --- | ---------------------- | ------------- | ------- | --------- | ------------ | ----------------------------------------------------- | ----------------- |
| 1   | `onu-creation`         | `"1945"`      | `point` | `1945`    | —            | `"La création de l'ONU"`                              | `"Guerre froide"` |
| 2   | `guerre-froide`        | `"1947–1991"` | `range` | `1947`    | `1991`       | `"La Guerre froide"`                                  | `"Guerre froide"` |
| 3   | `traite-rome`          | `"1957"`      | `point` | `1957`    | —            | `"Le Traité de Rome — création de la CEE"`            | `"Ve République"` |
| 4   | `independance-algerie` | `"1962"`      | `point` | `1962`    | —            | `"L'indépendance de l'Algérie — les accords d'Évian"` | `"Ve République"` |
| 5   | `chute-mur-berlin`     | `"1989"`      | `point` | `1989`    | —            | `"La chute du mur de Berlin"`                         | `"Guerre froide"` |

---

### Thème 3 — Françaises et Français dans une République repensée (34 dates) ✅

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
| 13  | `centre-pompidou`        | `"1969"`      | `point` | `1969`    | —            | `"Lancement du Centre G. Pompidou (Beaubourg)"` | `"Ve République"` |
| 14  | `pompidou-mandat`        | `"1969–1974"` | `range` | `1969`    | `1974`       | `"Présidence de Georges Pompidou"`              | `"Ve République"` |
| 15  | `decennie-modernisation` | `"1970–1980"` | `range` | `1970`    | `1980`       | `"Les années 1970 — décennie de modernisation"` | `"Ve République"` |
| 16  | `choc-petrolier-1973`    | `"1973"`      | `point` | `1973`    | —            | `"Premier choc pétrolier"`                      | `"Ve République"` |
| 17  | `majorite-18-ans`        | `"1974"`      | `point` | `1974`    | —            | `"La majorité électorale abaissée à 18 ans"`    | `"Ve République"` |
| 18  | `giscard-mandat`         | `"1974–1981"` | `range` | `1974`    | `1981`       | `"Présidence de Valéry Giscard d'Estaing"`      | `"Ve République"` |
| 19  | `loi-veil-ivg`           | `"1975"`      | `point` | `1975`    | —            | `"La loi Veil sur l'IVG"`                       | `"Ve République"` |
| 20  | `choc-petrolier-1979`    | `"1979"`      | `point` | `1979`    | —            | `"Second choc pétrolier"`                       | `"Ve République"` |

> ⚠️ `#13` (`centre-pompidou`) et `#14` (`pompidou-mandat`) ont `sortKey: 1969` — point avant range. `#17` et `#18` ont `sortKey: 1974` — point avant range.

#### Période 3 — Les années Mitterrand (1981–1995)

| #   | `id`                    | `date`        | `type`  | `sortKey` | `endSortKey` | `event`                                                   | `period`          |
| --- | ----------------------- | ------------- | ------- | --------- | ------------ | --------------------------------------------------------- | ----------------- |
| 21  | `mitterrand-alternance` | `"1981"`      | `point` | `1981`    | —            | `"Première alternance — élection de François Mitterrand"` | `"Ve République"` |
| 22  | `abolition-peine-mort`  | `"1981"`      | `point` | `1981`    | —            | `"Abolition de la peine de mort"`                         | `"Ve République"` |
| 23  | `mitterrand-1er-mandat` | `"1981–1988"` | `range` | `1981`    | `1988`       | `"Premier mandat de François Mitterrand"`                 | `"Ve République"` |
| 24  | `decentralisation`      | `"1982"`      | `point` | `1982`    | —            | `"Mise en place de la décentralisation"`                  | `"Ve République"` |
| 25  | `fn-montee-1983`        | `"1983"`      | `point` | `1983`    | —            | `"Montée du Front national"`                              | `"Ve République"` |
| 26  | `chomage-montee`        | `"1980–1990"` | `range` | `1980`    | `1990`       | `"Montée du chômage en France"`                           | `"Ve République"` |
| 27  | `rmi`                   | `"1988"`      | `point` | `1988`    | —            | `"Création du RMI (Revenu Minimum d'Insertion)"`          | `"Ve République"` |
| 28  | `mitterrand-2e-mandat`  | `"1988–1995"` | `range` | `1988`    | `1995`       | `"Deuxième mandat de François Mitterrand"`                | `"Ve République"` |
| 29  | `traite-maastricht`     | `"1992"`      | `point` | `1992`    | —            | `"Le traité de Maastricht"`                               | `"Ve République"` |

> ⚠️ `#21`, `#22`, `#23` ont tous `sortKey: 1981` — points avant range. `#27` et `#28` ont `sortKey: 1988` — point avant range.

#### Période 4 — Les années Chirac (1995–2007)

| #   | `id`                     | `date`        | `type`  | `sortKey` | `endSortKey` | `event`                                                 | `period`          |
| --- | ------------------------ | ------------- | ------- | --------- | ------------ | ------------------------------------------------------- | ----------------- |
| 30  | `chirac-septennat`       | `"1995–2002"` | `range` | `1995`    | `2002`       | `"Septennat de Jacques Chirac"`                         | `"Ve République"` |
| 31  | `cohabitation-jospin`    | `"1997–2002"` | `range` | `1997`    | `2002`       | `"Cohabitation Chirac-Jospin"`                          | `"Ve République"` |
| 32  | `pacs-cmu`               | `"1999"`      | `point` | `1999`    | —            | `"La loi sur le PACS et création de la CMU"`            | `"Ve République"` |
| 33  | `referendum-quinquennat` | `"2000"`      | `point` | `2000`    | —            | `"Référendum sur le quinquennat"`                       | `"Ve République"` |
| 34  | `fn-2002`                | `"2002"`      | `point` | `2002`    | —            | `"Le Front national au 2ème tour de la présidentielle"` | `"Ve République"` |
| 35  | `chirac-quinquennat`     | `"2002–2007"` | `range` | `2002`    | `2007`       | `"Quinquennat de Jacques Chirac"`                       | `"Ve République"` |

> ⚠️ `#34` et `#35` ont `sortKey: 2002` — point avant range.

#### Extension de scope — Présidents 2007–2027 (3 dates) ✅

| #   | `id`                | `date`        | `type`  | `sortKey` | `endSortKey` | `event`                                    | `period`          |
| --- | ------------------- | ------------- | ------- | --------- | ------------ | ------------------------------------------ | ----------------- |
| 37  | `sarkozy-mandat`    | `"2007–2012"` | `range` | `2007`    | `2012`       | `"Quinquennat de Nicolas Sarkozy"`         | `"Ve République"` |
| 38  | `hollande-mandat`   | `"2012–2017"` | `range` | `2012`    | `2017`       | `"Quinquennat de François Hollande"`       | `"Ve République"` |
| 39  | `macron-1er-mandat` | `"2017–2022"` | `range` | `2017`    | `2022`       | `"Premier quinquennat d'Emmanuel Macron"`  | `"Ve République"` |
| 40  | `macron-2e-mandat`  | `"2022–2027"` | `range` | `2022`    | `2027`       | `"Deuxième quinquennat d'Emmanuel Macron"` | `"Ve République"` |

---

## B. Nouveaux personnages — `historicalFigures.ts`

**8 entrées à ajouter.** Toutes ont `period: "Ve République"`.

**Source photos principale** : portraits officiels de l'Élysée (elysee.fr) ⭐ + Wikimedia Commons.

---

### 1. Simone Veil ✅ validate-photos.html

| Champ            | Valeur                                                                                       |
| ---------------- | -------------------------------------------------------------------------------------------- |
| `id`             | `"veil"`                                                                                     |
| `name`           | `"Simone Veil"`                                                                              |
| `primaryKeyword` | `"Loi IVG"` ✓                                                                                |
| `keywords`       | `["Loi IVG", "Ministre de la Santé", "Survivante Auschwitz"]`                                |
| `role`           | `"Ministre de la Santé (1974–1979), porte la loi sur l'IVG en 1975, survivante de la Shoah"` |
| `photos`         | ⏳ En attente de l'export JSON depuis `validate-photos.html`                                 |

**Indices :**

```
1. "Je suis une femme politique française du XXe siècle, marquée très jeune par l'une des pages les plus sombres de l'histoire européenne."
2. "Adolescente, j'ai été déportée avec ma famille dans un camp de concentration nazi, dont je suis l'une des rares rescapées."
3. "Je deviens ministre dans les années 1970, dans un domaine directement lié à la santé et aux droits des femmes."
4. "Je défends devant l'Assemblée nationale une loi autorisant l'interruption volontaire de grossesse, face à une opposition virulente."
5. "La loi que je fais adopter en 1975 porte désormais mon nom : elle reste l'un des symboles majeurs de la lutte pour les droits des femmes en France."
```

---

### 2. Georges Pompidou ✅ validate-photos.html

| Champ            | Valeur                                                                                             |
| ---------------- | -------------------------------------------------------------------------------------------------- |
| `id`             | `"pompidou"`                                                                                       |
| `name`           | `"Georges Pompidou"`                                                                               |
| `primaryKeyword` | `"Beaubourg"` ✓                                                                                    |
| `keywords`       | `["Beaubourg", "Modernisation des années 70", "Gaullisme social"]`                                 |
| `role`           | `"Président de la République (1969–1974), successeur de De Gaulle, initiateur du Centre Pompidou"` |
| `photos`         | ⏳ En attente de l'export JSON depuis `validate-photos.html`                                       |

**Indices :**

```
1. "Je suis un homme politique français qui a exercé les plus hautes fonctions sous la Ve République dans les années 1960–1970."
2. "Agrégé de lettres, je suis d'abord enseignant avant de devenir le principal collaborateur du fondateur de la Ve République."
3. "Je suis nommé Premier ministre, puis élu président de la République après la démission de mon prédécesseur en 1969."
4. "Ma présidence est marquée par la modernisation économique et sociale de la France, mais aussi par les débuts d'une crise pétrolière."
5. "Un immense centre d'art moderne et de culture, reconnaissable à ses tuyaux colorés en façade, porte mon nom en plein cœur de Paris."
```

---

### 3. Valéry Giscard d'Estaing ✅ validate-photos.html

| Champ            | Valeur                                                                                       |
| ---------------- | -------------------------------------------------------------------------------------------- |
| `id`             | `"giscard"`                                                                                  |
| `name`           | `"Valéry Giscard d'Estaing"`                                                                 |
| `primaryKeyword` | `"VGE"` ✓                                                                                    |
| `keywords`       | `["VGE", "Libéral avancé", "Majorité 18 ans"]`                                               |
| `role`           | `"Président de la République (1974–1981), réformes libérales, abaisse la majorité à 18 ans"` |
| `photos`         | ⏳ En attente de l'export JSON depuis `validate-photos.html`                                 |

**Indices :**

```
1. "Je suis un homme d'État français issu de la droite libérale, diplômé des grandes écoles, ministre des Finances avant d'être élu président."
2. "Élu en 1974 avec un écart de moins d'un point, je suis à l'époque le plus jeune président de la Ve République."
3. "Je modernise la société française : j'abaisse la majorité électorale à 18 ans et permets l'adoption de la loi sur l'IVG."
4. "Mon mandat est assombri par les deux chocs pétroliers, qui provoquent la montée du chômage et de l'inflation."
5. "Je suis le seul président de la Ve République à n'avoir appartenu ni au parti gaulliste ni au Parti socialiste, et je perds la présidentielle de 1981 face à la gauche."
```

---

### 4. François Mitterrand ✅ validate-photos.html

| Champ            | Valeur                                                                                             |
| ---------------- | -------------------------------------------------------------------------------------------------- |
| `id`             | `"mitterrand"`                                                                                     |
| `name`           | `"François Mitterrand"`                                                                            |
| `primaryKeyword` | `"Rose au poing"` ✓                                                                                |
| `keywords`       | `["Rose au poing", "1er Président socialiste", "Pyramide du Louvre"]`                              |
| `role`           | `"Président de la République (1981–1995), 1er président socialiste Ve République, grands travaux"` |
| `photos`         | ⏳ En attente de l'export JSON depuis `validate-photos.html`                                       |

**Indices :**

```
1. "Je suis une figure majeure du socialisme français, ayant cherché pendant des décennies à conquérir la présidence de la République."
2. "Chef du Parti socialiste, j'arrive au second tour de plusieurs élections présidentielles avant de finalement remporter la victoire."
3. "En 1981, mon élection est historique : je suis le premier président de gauche de la Ve République, incarnant une alternance attendue depuis 23 ans."
4. "Mes deux mandats de sept ans sont marqués par l'abolition de la peine de mort, la décentralisation et des périodes de cohabitation politique."
5. "Je suis le président des grands travaux parisiens — la Pyramide du Louvre, l'Arche de la Défense, la Bibliothèque nationale qui porte mon prénom."
```

---

### 5. Jacques Chirac ✅ validate-photos.html

| Champ            | Valeur                                                                                  |
| ---------------- | --------------------------------------------------------------------------------------- |
| `id`             | `"chirac"`                                                                              |
| `name`           | `"Jacques Chirac"`                                                                      |
| `primaryKeyword` | `"Quinquennat"` ✓                                                                       |
| `keywords`       | `["Quinquennat", "RPR", "Musée du Quai Branly"]`                                        |
| `role`           | `"Président de la République (1995–2007), réforme du quinquennat, cohabitation Jospin"` |
| `photos`         | ⏳ En attente de l'export JSON depuis `validate-photos.html`                            |

**Indices :**

```
1. "Je suis un homme politique français de la droite gaulliste, figure de la vie politique française pendant plus de trente ans."
2. "Deux fois Premier ministre avant d'accéder à la présidence, je suis réputé pour mon sens du contact avec les Français."
3. "Je suis élu président en 1995, puis réélu en 2002 dans un contexte sans précédent : mon adversaire au second tour est le leader d'un parti d'extrême droite."
4. "Je vis une longue cohabitation avec un Premier ministre socialiste, de 1997 à 2002."
5. "Je suis le président qui a réduit le mandat présidentiel de 7 à 5 ans — mon second mandat est le premier quinquennat de l'histoire de la Ve République."
```

---

### 6. Nicolas Sarkozy ✅ validate-photos.html

| Champ            | Valeur                                                                                        |
| ---------------- | --------------------------------------------------------------------------------------------- |
| `id`             | `"sarkozy"`                                                                                   |
| `name`           | `"Nicolas Sarkozy"`                                                                           |
| `primaryKeyword` | `"Hyperprésidant"` ✓                                                                          |
| `keywords`       | `["Hyperprésidant", "Ministre de l'Intérieur", "Crise de 2008"]`                              |
| `role`           | `"Président de la République (2007–2012), réforme de l'État, gestion de la crise financière"` |
| `photos`         | ⏳ En attente de l'export JSON depuis `validate-photos.html`                                  |

**Indices :**

```
1. "Je suis un homme politique français de droite, fils d'un immigrant hongrois, qui a gravi les échelons du parti gaulliste jusqu'à la présidence."
2. "Avant d'être élu président, je suis connu pour mes passages remarqués au ministère de l'Intérieur, où j'adopte une ligne ferme sur la sécurité."
3. "Élu en 2007 avec un programme de 'rupture', je suis réputé pour mon style présidentiel très actif — certains me surnomment 'l'hyperprésidant'."
4. "Mon mandat est dominé par la crise financière mondiale de 2008, que je gère en première ligne avec d'autres chefs d'État européens."
5. "Je suis le premier président de la Ve République à avoir été condamné par la justice après la fin de son mandat."
```

---

### 7. François Hollande ✅ validate-photos.html

| Champ            | Valeur                                                                                        |
| ---------------- | --------------------------------------------------------------------------------------------- |
| `id`             | `"hollande"`                                                                                  |
| `name`           | `"François Hollande"`                                                                         |
| `primaryKeyword` | `"Mariage pour tous"` ✓                                                                       |
| `keywords`       | `["Mariage pour tous", "Mr. Normal", "Interventions au Mali"]`                                |
| `role`           | `"Président de la République (2012–2017), légalise le mariage pour tous, opérations au Mali"` |
| `photos`         | ⏳ En attente de l'export JSON depuis `validate-photos.html`                                  |

**Indices :**

```
1. "Je suis un homme politique français du Parti socialiste, secrétaire général du parti pendant de longues années avant d'accéder à la présidence."
2. "Je suis élu en 2012 en battant un président sortant de droite, après avoir mené une campagne sobre sous le slogan 'le changement, c'est maintenant'."
3. "Lors de ma campagne, je me présente comme 'Monsieur Normal', en contraste volontaire avec le style flamboyant de mon prédécesseur."
4. "Je fais adopter la loi ouvrant le mariage aux couples de même sexe, l'une des réformes sociétales les plus marquantes de mon quinquennat."
5. "Je suis le premier président de la Ve République à renoncer à se représenter pour un second mandat, face à une impopularité record."
```

---

### 8. Emmanuel Macron ✅ validate-photos.html

| Champ            | Valeur                                                                                                        |
| ---------------- | ------------------------------------------------------------------------------------------------------------- |
| `id`             | `"macron"`                                                                                                    |
| `name`           | `"Emmanuel Macron"`                                                                                           |
| `primaryKeyword` | `"En Marche"` ✓                                                                                               |
| `keywords`       | `["En Marche", "Renaissance", "Plus jeune président Ve République"]`                                          |
| `role`           | `"Président de la République (depuis 2017), fondateur d'En Marche, plus jeune président de la Ve République"` |
| `photos`         | ⏳ En attente de l'export JSON depuis `validate-photos.html`                                                  |

**Indices :**

```
1. "Je suis un homme politique français qui a fondé son propre mouvement politique, 'En Marche', avant d'être élu président à seulement 39 ans."
2. "Ancien banquier d'affaires et ministre de l'Économie, je suis le plus jeune président de la Ve République lors de mon élection en 2017."
3. "Je n'appartiens ni à la gauche ni à la droite traditionnelles : mon programme se présente comme 'progressiste' et dépasse le clivage gauche-droite."
4. "Mon premier mandat est marqué par les grandes manifestations du mouvement des 'Gilets jaunes' et par la pandémie de Covid-19."
5. "Je suis réélu en 2022 pour un second quinquennat, mais sans majorité absolue à l'Assemblée nationale — une situation inédite sous la Ve République."
```

---

## Portraits officiels Élysée ⭐

URLs des portraits affichés en mairie, source `elysee.fr` :

| Président  | URL                                                                                                                                                             |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pompidou   | `https://www.elysee.fr/cdn-cgi/image/format=auto%2Cquality=100%2Cwidth=1520%2Cheight=2534/images/default/0001/02/037d248e98e457983659a7626c259e9b6f762bb6.jpeg` |
| Giscard    | `https://www.elysee.fr/cdn-cgi/image/format=auto%2Cquality=100%2Cwidth=1520%2Cheight=2534/images/default/0001/02/b12a37a3e3bead4658e72206455a1bf910490332.jpeg` |
| Mitterrand | `https://www.elysee.fr/cdn-cgi/image/format=auto%2Cquality=100%2Cwidth=1520%2Cheight=2534/images/default/0001/02/90a988df4304c815dda1fa77d2733504c70cf56a.jpeg` |
| Chirac     | `https://www.elysee.fr/cdn-cgi/image/format=auto%2Cquality=100%2Cwidth=1520%2Cheight=2534/images/default/0001/02/c3467114052fd21e0ba3768cf216fd1bad164852.jpeg` |
| Sarkozy    | `https://www.elysee.fr/cdn-cgi/image/format=auto%2Cquality=100%2Cwidth=1520%2Cheight=2534/images/default/0001/02/c1a4affe262217c14e789c993e48798e2f7870f4.jpeg` |
| Hollande   | `https://www.elysee.fr/cdn-cgi/image/format=auto%2Cquality=100%2Cwidth=1520%2Cheight=2534/images/default/0001/02/162118f06b1cb523fc701bc9af3786e10dd916f2.jpeg` |
| Macron     | `https://www.elysee.fr/admin/upload/default/0001/01/1b6cedb475cbc1b09878aa90d34135d972f67040.jpeg`                                                              |

---

## C. Checklist d'exécution

### Phase 1 — Dates (terminée) ✅

- [x] Ajouter les **35 entrées** dans `historicalDates.ts` en ordre chronologique (`sortKey` croissant)
- [x] Ajouter `onu-creation` (1945) dans Thème 2 / Guerre froide
- [x] Ajouter les 4 mandats de l'extension scope (Sarkozy, Hollande, Macron ×2)
- [x] Vérifier que chaque `id` est unique dans le fichier
- [x] Vérifier le tiret long `–` (U+2013) sur tous les ranges
- [x] Vérifier `endSortKey` renseigné pour chaque `type: "range"`
- [x] `pnpm lint` — zéro erreur

### Phase 2 — 8 personnages (en cours 🔄)

Pour chacun des 8 personnages dans l'ordre : Veil → Pompidou → Giscard → Mitterrand → Chirac → Sarkozy → Hollande → Macron

- [x] Trouver 4 à 8 URLs candidates (Wikimedia Commons + portraits Élysée ⭐)
- [x] Ajouter les 8 entrées dans `src/data/validate-photos.html`
- [ ] Valider les photos dans le navigateur (2–6 cochées par personnage) ← **ÉTAPE UTILISATEUR**
- [ ] Exporter la sélection depuis la modale ← **STOP avant la suite**
- [ ] Vérifier l'absence de collision sur chaque keyword dans `historicalFigures.ts`
- [ ] Ajouter les 8 entrées complètes avec les URLs de l'export uniquement
- [ ] `pnpm lint` — zéro erreur (après l'ajout complet)
