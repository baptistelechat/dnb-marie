---
id: ZBLK-003
type: blocker
date: 2026-06-02
tags: [eslint, react-hooks, set-state-in-effect]
status: résolu
---

# ZBLK-003 — ESLint react-hooks/set-state-in-effect : 2 occurrences MapQuizTab

## Friction

Premier `pnpm lint` après création de MapQuizTab → 2 erreurs `react-hooks/set-state-in-effect` :

1. **`QuizPanel.tsx:31`** — `setNameInput('')` + `setCapitalInput('')` dans `useEffect([country?.code])`
2. **`index.tsx:78`** — `setActiveCode(queue[0])` dans `useEffect([mode, queue])`

## Résolution

**QuizPanel.tsx :** Supprimer le `useEffect` + ajouter `key={activeCode ?? 'empty'}` sur `<QuizPanel>` dans l'orchestrateur → remount forcé = reset local state automatique. Voir aussi GLRN-060 dans la mémoire globale.

**index.tsx :** Dériver `activeCode` directement depuis `queue` au lieu de le synchroniser :

```typescript
// Remplace : const [activeCode, setActiveCode] = useState<string | null>(null);
// + useEffect(() => { setActiveCode(queue[0]); }, [queue]);
const activeCode = mode === "directed" ? (queue[0] ?? null) : freeActiveCode;
```

Voir aussi GLRN-059 dans la mémoire globale.

## Références

- [ZBLK-004](ZBLK-004.md) — second blocage build de cette session
