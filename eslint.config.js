import path from "node:path";
import { fileURLToPath } from "node:url";

import js from "@eslint/js";
import astro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";

const tsconfigRootDir = path.dirname(fileURLToPath(import.meta.url));
const project = "./tsconfig.json";

const sharedTypeAwareOptions = {
  project,
  tsconfigRootDir,
};

const sharedTypeScriptRules = {
  "@typescript-eslint/no-explicit-any": "error",
  "@typescript-eslint/no-unused-vars": [
    "error",
    {
      argsIgnorePattern: "^_",
    },
  ],
};

export default [
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...astro.configs["flat/recommended"],
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: sharedTypeAwareOptions,
    },
    rules: sharedTypeScriptRules,
  },
  {
    files: ["**/*.astro"],
    languageOptions: {
      parserOptions: {
        ...sharedTypeAwareOptions,
        extraFileExtensions: [".astro"],
      },
    },
    rules: sharedTypeScriptRules,
  },
  {
    rules: {
      "no-unused-vars": "warn",
    },
  },
];
