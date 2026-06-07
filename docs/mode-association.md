# Mode Association — Spécification du jeu

## Concept général

Un jeu de mémorisation où Marie doit relier chaque pays de l'UE à sa capitale. Les deux listes affichent 5 paires à la fois. Le jeu démarre sur un bouton **"GO !"** qui lance le chronomètre.

---

## Interface

```
┌─────────────────────────────────────────────────┐
│  ⏱️ 00:42          Association UE              │
├────────────────────┬────────────────────────────┤
│   Pays             │   Capitales                │
│                    │                            │
│  [ France    ]     │  [ Vienne      ]           │
│  [ Allemagne ]     │  [ Paris       ]           │
│  [ Autriche  ]     │  [ Nicosie     ]           │
│  [ Chypre    ]     │  [ Berlin      ]           │
│  [ Italie    ]     │  [ Rome        ]           │
└────────────────────┴────────────────────────────┘
```

- Deux colonnes, boutons style "pill" dans la palette candy du projet
- L'ordre dans chaque colonne est **mélangé indépendamment** (A et B ne sont pas alignés)

---

## Mécanique de sélection (bidirectionnelle)

- Marie peut commencer par **A puis B**, ou **B puis A** — les deux sens sont valides
- Un seul élément peut être sélectionné **par colonne** à la fois
- Recliquer sur l'élément déjà sélectionné de la **même colonne** → désélectionne
- Recliquer sur un **autre élément de la même colonne** → change la sélection
- Dès que **les deux colonnes ont une sélection active** → évaluation automatique de la paire

---

## Feedback

### ✅ Bonne réponse

- Les deux éléments disparaissent avec une animation (fade out)
- Haptic `tick()`
- Deux nouveaux mots du pool remplacent la paire (si le pool n'est pas vide)

### ❌ Mauvaise réponse

- Les deux éléments tremblent brièvement (shake) et restent à l'écran
- Flash rouge/rose court sur les deux mots
- Haptic `error()`
- **Erreur comptabilisée** pour le leaderboard
- Sélection annulée → Marie recommence

---

## Progression

- Pool de 27 paires mélangé au départ
- 5 paires affichées simultanément
- Bonne réponse → paire retirée + remplacée par une nouvelle du pool
- Quand le pool est vide + les dernières paires sont résolues → fin de partie

---

## Chronomètre & Leaderboard

- **Bouton "GO !"** : remplace le jeu tant que `timerStartedAt === null`
- Chronomètre démarre au clic GO
- En fin de partie : modal d'entrée du prénom + affichage du temps
- **Score leaderboard** : nombre de paires trouvées du premier coup (sans erreur) sur 27
  - Exemple : "23/27 au premier essai — 1m 42s"
- Classement persisté en `localStorage`, même format que les autres onglets

---

## Emplacement

Nouvel onglet **"Association"** placé à côté de l'onglet Flashcards dans la navigation.
