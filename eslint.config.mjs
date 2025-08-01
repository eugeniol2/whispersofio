import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = [
  ...compat.config({
    env: {
      browser: true,
      es2021: true,
      node: true,
      jest: true
    },
    settings: {
      react: {
        version: 'detect'
      },
      'import/resolver': {
        node: {
          paths: ['src']
        },
        typescript: {
          alwaysTryTypes: true
        }
      }
    },
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
    overrides: [],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    plugins: [
      'react',
      'react-hooks',
      'simple-import-sort',
      '@typescript-eslint'
    ],
    rules: {
      '@typescript-eslint/no-floating-promises': 'off',
      'no-console': 'warn',
      '@typescript-eslint/no-throw-literal': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'explicit-module-boundary-types': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/space-before-function-paren': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/consistent-type-assertions': 'off',
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            // Side-effect imports
            ['^\\u0000'],
            // Packages.
            ['^@?\\w'],
            // Any other packages and src/*
            ['^(src)?'],
            // Relative imports
            ['^\\.']
          ]
        }
      ],
      'import/no-unresolved': 'error',
      'import/named': 'error',
      '@typescript-eslint/no-explicit-any': 'off'
    }
  })
];

export default eslintConfig;
