---
id: ZBLK-013
type: blocker
date: 2026-06-07
tags: [dev-browser, playwright, windows, esm, node]
status: résolu
---

# ZBLK-013 — `dev-browser` absent du PATH — `command not found` en bash et PowerShell

| Friction                                                                                                                                                                                                              | Cause réelle                                                                                                                                                                                                       | Solution                                                                                                                                                                                               | Statut |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| La commande `dev-browser run script.mjs` est introuvable en bash et PowerShell malgré une installation globale déclarée. Tentative d'import direct `import chromium from 'C:/...'` → `ERR_UNSUPPORTED_ESM_URL_SCHEME` | `dev-browser` n'est pas dans le PATH des sous-processus. Sur Windows, un `import` ESM depuis un chemin absolu avec lettre de disque (`C:/...`) est interprété comme un scheme d'URL invalide par le loader Node.js | Contournement : script `.mjs` autonome utilisant `createRequire(import.meta.url)` pour importer Playwright depuis `C:/Users/bapti/.dev-browser/node_modules/playwright`. Exécuté via `node script.mjs` | résolu |

## Références

- voir aussi GLRN-082 — pattern createRequire ESM→CJS Windows (global)
