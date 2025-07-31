import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { includeIgnoreFile } from '@eslint/compat';
import tsEslintParser from '@typescript-eslint/parser';
import vitest from '@vitest/eslint-plugin';
import vuePrettierConfig from '@vue/eslint-config-prettier';
import eslintReactiveValueSuffix from 'eslint-plugin-reactive-value-suffix';
import globals from 'globals';
import vueEslintParser from 'vue-eslint-parser';
import withNuxt from './.nuxt/eslint.config.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

export default withNuxt([
  includeIgnoreFile(gitignorePath),
  {
    languageOptions: {
      parser: vueEslintParser,
      parserOptions: {
        parser: tsEslintParser,
        projectService: true,
        tsconfigRootDir: __dirname,
        extraFileExtensions: ['.vue'],
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    ignores: ['*.mjs', '*.ts'],
    plugins: { 'reactive-value-suffix': eslintReactiveValueSuffix },
    rules: {
      'vue/html-self-closing': 'off',
      'vue/multi-word-component-names': 'off',
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
          pathGroups: [{ pattern: '@/**', group: 'parent', position: 'before' }],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: { order: 'asc' },
          'newlines-between': 'never',
        },
      ],
      'reactive-value-suffix/suffix': ['error', { functionNamesToIgnoreValueCheck: [] }],
    },
  },
  {
    files: ['**/__test__/**', '**/__tests__/**', '**/tests/**', '**/test/**'],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
      'vitest/consistent-test-it': ['error', { fn: 'test', withinDescribe: 'test' }],
      'vitest/no-conditional-expect': 'error',
      'vitest/no-conditional-in-test': 'error',
      'vitest/no-conditional-tests': 'error',
      'vitest/no-disabled-tests': 'error',
      'vitest/no-duplicate-hooks': 'error',
      'vitest/no-identical-title': 'error',
      'vitest/no-test-return-statement': 'error',
      'vitest/prefer-mock-promise-shorthand': 'error',
      'vitest/require-hook': 'error',
      'vitest/require-to-throw-message': 'error',
      'vitest/require-top-level-describe': ['error', { maxNumberOfTopLevelDescribes: 2 }],
    },
  },
  vuePrettierConfig,
]);
