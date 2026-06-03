---
register: decisions
last_updated: 2026-06-03
---

## Index

| ID                              | Date       | Titre                                                                                | Tags                             | Statut |
| ------------------------------- | ---------- | ------------------------------------------------------------------------------------ | -------------------------------- | ------ |
| [BDR-001](decisions/BDR-001.md) | 2026-06-02 | pnpm utilisé à la place de npm (bug arborist npm 10.8.3)                             | #pnpm #npm #vite                 | actif  |
| [BDR-002](decisions/BDR-002.md) | 2026-06-02 | Design direction : Fredoka+Nunito, palette candy 6 couleurs cycliques                | #design #fonts #tailwind         | actif  |
| [BDR-003](decisions/BDR-003.md) | 2026-06-02 | shadcn différé : installé seulement quand Dialog/Toast/Select nécessaire             | #shadcn #dependencies            | actif  |
| [BDR-004](decisions/BDR-004.md) | 2026-06-02 | react-simple-maps choisi pour la carte EU (SVG pur, React-friendly, vs Leaflet/D3)   | #react-simple-maps #svg #geo     | actif  |
| [BDR-005](decisions/BDR-005.md) | 2026-06-02 | Geo data : fetch CDN world-atlas@2 + filtre client 27 pays (vs fichier local)        | #geo #cdn #world-atlas           | actif  |
| [BDR-006](decisions/BDR-006.md) | 2026-06-03 | Haptics centralisés dans `useHaptics()` — cancel() avant trigger() pour taps rapides | #haptics #web-haptics #ux        | actif  |
| [BDR-007](decisions/BDR-007.md) | 2026-06-03 | Carte N&B — pays non trouvés en gris, trouvés en candy-purple-vivid `#7e57c2`        | #design #map #tailwind           | actif  |
| [BDR-008](decisions/BDR-008.md) | 2026-06-03 | Layout MapQuizTab full-width + flex-row desktop (max-w-2xl retiré côté App)          | #layout #tailwind #map           | actif  |
| [BDR-009](decisions/BDR-009.md) | 2026-06-03 | Mode dirigé : continue jusqu'à 100% + requeue aléatoire + score "premier essai"      | #quiz #game-design #directed     | actif  |
| [BDR-010](decisions/BDR-010.md) | 2026-06-03 | Markers SVG `<Marker>` pour les petits pays EU (BE, LU, SI, MT, CY)                  | #map #svg #small-countries       | actif  |
| [BDR-011](decisions/BDR-011.md) | 2026-06-03 | Timer démarre au premier submit (pas à l'activation du mode dirigé)                  | #timer #ux #directed-mode        | actif  |
| [BDR-012](decisions/BDR-012.md) | 2026-06-03 | Détection fin de partie dans handleNext, pas dans useEffect                          | #timer #react-hooks #game-design | actif  |
