// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const prettierConfig = require("eslint-config-prettier/flat");
const boundaries = require("eslint-plugin-boundaries");
const reactNative = require("eslint-plugin-react-native");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*", "android/*", "ios/*", ".expo/*", "expo-env.d.ts"],
  },

  // TypeScript conventions (CLAUDE.md §4)
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/ban-ts-comment": [
        "error",
        { "ts-ignore": true, "ts-expect-error": "allow-with-description" },
      ],
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },

  // Styling: no hardcoded colors, no inline styles (CLAUDE.md §1, §3)
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: { "react-native": reactNative },
    rules: {
      "react-native/no-color-literals": "error",
      "react-native/no-inline-styles": "error",
      "react-native/no-unused-styles": "error",
    },
  },

  // Named exports everywhere, default export only for Expo Router routes
  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/app/**"],
    rules: {
      "import/no-default-export": "error",
    },
  },

  // Architecture & feature boundaries (CLAUDE.md §2)
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: { boundaries },
    settings: {
      "import/resolver": {
        typescript: { project: "./tsconfig.json" },
        node: true,
      },
      "boundaries/include": ["src/**/*"],
      "boundaries/elements": [
        { type: "app", pattern: "src/app" },
        { type: "feature", pattern: "src/features/*", capture: ["featureName"] },
        { type: "component", pattern: "src/components" },
        { type: "hook", pattern: "src/hooks" },
        { type: "store", pattern: "src/stores" },
        { type: "lib", pattern: "src/lib" },
        { type: "asset", pattern: "src/assets" },
      ],
    },
    rules: {
      "import/no-cycle": ["error", { maxDepth: 10 }],
      // Policies are evaluated in order: the last matching policy wins.
      "boundaries/dependencies": [
        "error",
        {
          default: "disallow",
          policies: [
            // Allowed layers
            {
              from: { element: { type: ["app", "feature"] } },
              allow: {
                to: { element: { type: ["component", "hook", "store", "lib", "asset"] } },
              },
            },
            {
              from: { element: { type: "component" } },
              allow: { to: { element: { type: ["component", "hook", "lib", "asset"] } } },
            },
            {
              from: { element: { type: "hook" } },
              allow: { to: { element: { type: ["hook", "store", "lib"] } } },
            },
            {
              from: { element: { type: "store" } },
              allow: { to: { element: { type: ["store", "lib"] } } },
            },
            {
              from: { element: { type: "lib" } },
              allow: { to: { element: { type: "lib" } } },
            },
            // A feature is only reachable from app/ or another feature,
            // and only through its public API: features/<name>/index.ts
            {
              from: { element: { type: ["app", "feature"] } },
              allow: {
                to: { element: { type: "feature", fileInternalPath: "index.{ts,tsx}" } },
              },
            },
          ],
        },
      ],
    },
  },

  prettierConfig,
]);
