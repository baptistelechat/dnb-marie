## 💻 dnb-marie

Application web interactive pour aider Marie à réviser le DNB (brevet des collèges). Premier onglet : checklist des 27 pays de l'Union Européenne avec drapeaux SVG, barre de progression, confetti à la complétion et retour haptique mobile.

### Stack technique

- **Langage** : TypeScript 6 (strict, noUnusedLocals, verbatimModuleSyntax)
- **Framework** : React 19 + Vite 8
- **Runtime / Package manager** : Node.js + pnpm
- **Styling** : Tailwind CSS 4 (plugin @tailwindcss/vite, sans config JS)
- **Déploiement** : Vercel (production) — dev server avec `--host` + `vite-plugin-qrcode` pour accès mobile LAN en développement

### Architecture

Structure par feature : `src/components/EuropTab/` contient le composant principal et ses sous-composants dans `components/`. Les données statiques sont dans `src/data/`. Règle 200 lignes max par composant.

### Conventions importantes

- Drapeaux via `react-country-flag` avec prop `svg` obligatoire (pas d'emoji)
- Haptics via `web-haptics/react` → `trigger(40)` sur coche, `trigger("success")` à la complétion
- Confetti via `canvas-confetti` (pastel colors uniquement)
- Dev server avec `--host` + `vite-plugin-qrcode` pour accès mobile LAN
