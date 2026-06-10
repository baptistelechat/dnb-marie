---
id: ZBLK-014
type: blocker
date: 2026-06-11
tags: [dev-browser, screenshot, api, quickjs]
status: résolu
---

# ZBLK-014 — `saveScreenshot` : 3 signatures incorrectes avant résolution

| Friction | Cause réelle | Solution | Statut |
| -------- | ------------ | -------- | ------ |
| `saveScreenshot` échoue 3 fois de suite | API QuickJS non standard vs attentes Playwright native — signature `(buf, name)` documentée uniquement dans `--help` long | `npx dev-browser --help` → lire "Screenshots for visual state" ; `const buf = await page.screenshot(); await saveScreenshot(buf, "debug.png");` | résolu |

## Références

- [LRN-024](../../learnings/LRN-024.md) — pattern extrait
