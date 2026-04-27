import js from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import vueParser from 'vue-eslint-parser'

export default [
  { ignores: ['dist/**', '.quasar/**', 'node_modules/**'] },

  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],

  {
    files: ['**/*.{js,vue}'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      prettier: prettierPlugin,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // Keep signal high, noise low for assignment speed
      'no-console': 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

      // Vue SFC ergonomics
      'vue/multi-word-component-names': 'off',

      // Prettier as ESLint rule
      'prettier/prettier': 'warn',

      // Simple Import Sort
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': [
        'warn',
        { groups: [['^react', '^@?\\w', '^\\.', '^\\u0000']] },
      ],
    },
  },
  prettierConfig,
]
