---
register: learnings
last_updated: 2026-06-03
---

## Index

| ID                              | Date       | Pattern observé                                                                                       | Tags                                                | Contexte                              |
| ------------------------------- | ---------- | ----------------------------------------------------------------------------------------------------- | --------------------------------------------------- | ------------------------------------- |
| [LRN-001](learnings/LRN-001.md) | 2026-06-02 | `vite-plugin-qrcode` requiert `server.host: true` pour afficher le QR code                            | #vite #qrcode #mobile                               | Setup dev server réseau LAN dnb-marie |
| [LRN-002](learnings/LRN-002.md) | 2026-06-02 | `react-simple-maps` v3 sans types bundlés → créer `src/types/react-simple-maps.d.ts`                  | #typescript #react-simple-maps #types #declarations | Build TypeScript dnb-marie — TS7016   |
| [LRN-003](learnings/LRN-003.md) | 2026-06-03 | `world-atlas@2` : IDs pays en strings zero-paddées 3 chiffres (`"040"` pas `"40"`)                    | #world-atlas #geo #topojson #ids                    | Bug Belgique/Autriche invisibles      |
| [LRN-004](learnings/LRN-004.md) | 2026-06-03 | SVG z-order = ordre de rendu DOM — rendre les petits pays EU en dernier pour qu'ils soient par-dessus | #svg #z-order #react-simple-maps #rendering         | Belgique non-cliquable                |
| [LRN-005](learnings/LRN-005.md) | 2026-06-03 | Diagnostiquer IDs JSON distant : `node -e "fetch(url).then(r=>r.json()).then(...)"`                   | #debugging #topojson #node #fetch                   | Investigation IDs world-atlas         |
| [LRN-006](learnings/LRN-006.md) | 2026-06-03 | `<Marker coordinates={[lon,lat]}>` react-simple-maps — cercle cliquable taille fixe pour petits pays  | #react-simple-maps #svg #marker #small-countries    | Marqueurs BE, LU, SI, MT, CY          |
| [LRN-007](learnings/LRN-007.md) | 2026-06-03 | ESLint `react-hooks/set-state-in-effect` : déplacer les setState vers les event handlers              | #react-hooks #eslint #set-state-in-effect           | Fin de partie chronomètre dirigé      |
| [LRN-008](learnings/LRN-008.md) | 2026-06-03 | `useCallback` dans les custom hooks pour stabiliser les refs exposées                                 | #react-hooks #useCallback #custom-hooks             | useLeaderboard + handleSave           |
