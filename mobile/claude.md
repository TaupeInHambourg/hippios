# Project Context & Development Guidelines

Act as a Senior React Native developer, expert in Expo, TypeScript, and Tailwind CSS (NativeWind).
Your goal is to produce extremely clean, modular, maintainable code that strictly adheres to the conventions defined below.

## 0. Non-negotiable

- **Never run `git commit` or `git push`.** Only the user commits. Stop after the changes are verified and list what is ready to commit.
- **ESLint, Prettier and TypeScript are the source of truth.** Never disable a rule (`eslint-disable`, `@ts-ignore`) to make a check pass: fix the code. If a rule seems wrong, ask.
- **Expo changes every SDK: do not trust your training data.** Before using an Expo, EAS or React Native API, check the `expo` major version in `package.json` and read the matching docs (`https://docs.expo.dev/versions/v<major>.0.0/`, index: `https://docs.expo.dev/llms.txt`).

## 1. Stack

| Status                               | Libraries                                                                                                                           |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| Installed                            | Expo (SDK 57), Expo Router, TypeScript (strict), ESLint, Prettier, Husky + lint-staged                                              |
| Planned (install only with approval) | NativeWind, Zustand, TanStack Query, Zod, react-hook-form, better-auth, jest-expo + React Native Testing Library, expo-secure-store |

Never write code that depends on a planned library before it is installed.

## 2. Project Architecture & Feature Boundaries

All source code lives in `src/`. The `@/` alias maps to `src/`.

- `src/app/`: Expo Router routes only (every file is a screen, `_layout.tsx` defines navigators).
  - `(tabs)/`: Tab navigation group.
  - `(auth)/`: Auth flow group (no tab bar).
- `src/features/<name>/`: Feature-scoped components, hooks, API and stores.
- `src/components/`: Shared, purely presentational components.
- `src/hooks/`: Hooks shared by multiple features.
- `src/lib/`: API client, utilities, non-React logic.
- `src/stores/`: Truly global client state (Zustand).
- `src/assets/`: Images and fonts.

**Allowed dependencies** (enforced by `eslint-plugin-boundaries`):

| From         | Can import                                                          |
| ------------ | ------------------------------------------------------------------- |
| `app`        | features (public API), components, hooks, stores, lib, assets       |
| `features`   | other features (public API), components, hooks, stores, lib, assets |
| `components` | components, hooks, lib, assets                                      |
| `hooks`      | hooks, stores, lib                                                  |
| `stores`     | stores, lib                                                         |
| `lib`        | lib                                                                 |

**Feature public API:**

- Each feature exposes a single entry point: `src/features/<name>/index.ts`.
- Import a feature only through it: `import { HorseCard } from "@/features/horses"`. Deep imports (`@/features/horses/components/...`) are forbidden by ESLint.
- Inside a feature, use relative imports.
- Export only what other parts of the app need.
- No circular dependencies (`import/no-cycle`).

Recommended feature layout:

```text
src/features/horses/
├── index.ts          # public API
├── api/              # fetchers, Zod schemas, query keys, query hooks
├── components/
├── hooks/
└── store.ts          # only if the feature needs local client state
```

## 3. Styling

Detailed rules: `.claude/rules/styling.md` (semantic color tokens, palette, NativeWind).

- Never hardcode colors (`react-native/no-color-literals`) or inline styles (`react-native/no-inline-styles`).
- Use semantic tokens (`bg-primary`, `text-muted`), never raw palette names.

## 4. TypeScript Conventions

- **Strict mode** plus `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitOverride`.
- **No `any`:** use `unknown` and narrow it, or define the correct type.
- **`interface`** for object shapes and component props; `type` for unions, utility types and `z.infer`.
- Do not use `@ts-ignore`. `@ts-expect-error` only with a description.
- Prefer type guards over unchecked `as` assertions. No non-null assertions (`!`).
- Use discriminated unions for complex states.
- Do not use `Record<string, unknown>` as a replacement for a real domain type.
- Keep public functions and exported components explicitly typed.
- **Exports:** named exports everywhere. Default export ONLY for route files in `src/app/` (enforced by ESLint).

## 5. Naming

| Element                   | Convention                                                | Example                  |
| ------------------------- | --------------------------------------------------------- | ------------------------ |
| Component file            | `PascalCase.tsx`                                          | `HorseCard.tsx`          |
| Hook file                 | `useCamelCase.ts`                                         | `useHorses.ts`           |
| Other modules             | `camelCase.ts`                                            | `formatDate.ts`          |
| Route file                | Expo Router conventions (`kebab-case`, `[id]`, `(group)`) | `horse-details/[id].tsx` |
| Test file                 | Same name + `.test`                                       | `HorseCard.test.tsx`     |
| Functions, variables      | `camelCase`                                               | `getHorseAge`            |
| Types, interfaces         | `PascalCase`                                              | `Horse`                  |
| Exported module constants | `UPPER_SNAKE_CASE`                                        | `MAX_HORSES`             |

One exported component per file.

## 6. Clean Code Rules

- Small, single-responsibility units. **Split a component above ~150 lines** and a function above ~40 lines.
- Separate business logic (hooks, lib, api) from UI (components).
- Route files stay thin: they compose screens from `features/` and `components/`.
- Max ~3 levels of JSX nesting before extracting a sub-component.
- Comment only complex logic: code should be self-documenting through good naming.

## 7. Data, Forms & Auth

Detailed rules: `.claude/rules/data-and-forms.md` (API layer, TanStack Query keys, Zod, react-hook-form).

- Zod schema = single source of truth for API types (`type Horse = z.infer<typeof horseSchema>`).
- Server state in TanStack Query, never duplicated in Zustand.
- Forms: react-hook-form + Zod resolver.
- Auth: `better-auth`; redirects live in layouts / centralized route guards, never in every screen.

## 8. Detailed Rules

Detailed rules live in `.claude/rules/` and must be followed:

- `styling.md`: color tokens, palette, NativeWind.
- `data-and-forms.md`: API layer, query keys, Zod, forms.
- `performance.md`: lists, memoization, state, side effects, assets.
- `security.md`: secrets, data validation, logging, error handling, dependencies.
- `accessibility.md`: roles, labels, touch targets, contrast, forms, motion.
- `testing.md`: what to test, conventions, React Native Testing Library, mocking.

Use the `code-review` skill (`.claude/skills/code-review/`) to review changes.

## 9. Project Commands

The project uses `npm` (no `pnpm`, `yarn` or `bun`).

| Task                    | Command                                                                                                                          |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Install dependencies    | `npm install`                                                                                                                    |
| **Add a package**       | `npx expo install <pkg>` (dev: `npx expo install <pkg> -- --save-dev`) — never `npm install <pkg>`, it ignores SDK compatibility |
| Start dev server        | `npm start`                                                                                                                      |
| Run on device           | `npm run android` / `npm run ios` / `npm run web`                                                                                |
| Typecheck               | `npm run typecheck` (`tsc --noEmit`)                                                                                             |
| Lint                    | `npm run lint` (`expo lint`), fix: `npm run lint:fix`                                                                            |
| Format                  | `npm run format`, check: `npm run format:check`                                                                                  |
| All checks (same as CI) | `npm run check`                                                                                                                  |
| Diagnose dependencies   | `npx expo-doctor`, fix versions: `npx expo install --fix`                                                                        |

There is no test runner yet (see `.claude/rules/testing.md`).

**Native & builds:**

- `android/` and `ios/` are generated (Continuous Native Generation, gitignored). Never edit them: configure native behavior in `app.json` and config plugins.
- After adding a library with native code, a development build is required (`npm run android|ios` or `npx eas-cli@latest build --profile development`). Expo Go only includes bundled modules.
- Prefer Expo modules over third-party libraries.
- Builds, store submissions and OTA updates go through EAS: `npx eas-cli@latest build | submit | update`.

**Git hooks & CI:** the pre-commit hook (Husky) runs ESLint + Prettier on staged files and the typecheck. CI (`.github/workflows/mobile-ci.yml`) runs `npm run check`.

## 10. Development Workflow

**Before making changes:**

1. Inspect the existing architecture and similar implementations.
2. Read the relevant files before proposing a solution.
3. Identify reusable components, hooks, services and types.
4. For non-trivial changes, present a short implementation plan and wait for validation.

**While implementing:**

- Make the smallest coherent change.
- Reuse existing patterns instead of introducing new abstractions.
- Do not rewrite unrelated code.
- Do not modify generated files manually.
- Do not add dependencies without approval.

**After implementing:**

1. Run `npm run check` and fix every error.
2. Review the git diff.
3. Report exactly which files were changed, which commands were executed, their results, and any remaining limitations.
4. **Do not commit.** The user commits.
