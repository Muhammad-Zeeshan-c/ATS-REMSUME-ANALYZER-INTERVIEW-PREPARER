import js from '@eslint/js';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [


  {
    ignores: ['dist/', 'node_modules/'],
  },

  js.configs.recommended,


  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {

      ...reactPlugin.configs.recommended.rules,


      'react-hooks/rules-of-hooks': 'error',


      'react-hooks/exhaustive-deps': 'warn',


      'react/react-in-jsx-scope': 'off',


      'react/prop-types': 'off',


      'no-unused-vars': ['warn', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],

      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
];
