import { config, configs } from 'typescript-eslint';
import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import pluginNext from '@next/eslint-plugin-next';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginQuery from '@tanstack/eslint-plugin-query';

export default config(
  ...pluginQuery.configs['flat/recommended'],
  eslint.configs.recommended,
  ...configs.recommendedTypeChecked,
  eslintConfigPrettier,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    plugins: {
      '@next/next': pluginNext,
      react: pluginReact,
      'react-hooks': pluginReactHooks,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
          allowFunctionsWithoutTypeParameters: true,
        },
      ],

      '@typescript-eslint/explicit-module-boundary-types': 'off',

      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'class',
          format: ['PascalCase'],
        },
        {
          selector: ['interface'],
          format: ['PascalCase'],

          custom: {
            regex: '^I[A-Z]',
            match: true,
          },
        },
        {
          selector: ['typeLike'],
          format: ['PascalCase'],

          custom: {
            regex: '^T[A-Z]',
            match: true,
          },
        },
        {
          selector: 'enum',
          format: ['PascalCase'],
        },
        {
          selector: 'enumMember',
          format: ['UPPER_CASE'],
        },
        {
          selector: 'function',
          format: ['camelCase'],
        },
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE'],
        },
        {
          selector: 'variable',
          modifiers: ['const'],
          format: ['camelCase', 'PascalCase'],

          filter: {
            regex: '(Component|Context)$',
            match: true,
          },
        },
        {
          selector: 'variable',
          modifiers: ['exported'],
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: 'variable',
          modifiers: ['const', 'exported'],
          types: ['string', 'boolean', 'number'],
          format: ['UPPER_CASE'],
        },
        {
          selector: 'variable',
          types: ['boolean'],
          format: ['PascalCase'],
          prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
        },
        {
          selector: ['variable', 'function'],
          modifiers: ['unused'],
          format: ['camelCase', 'PascalCase'],
          leadingUnderscore: 'allow',
        },
      ],

      '@typescript-eslint/no-inferrable-types': 'off',

      '@typescript-eslint/typedef': [
        'error',
        {
          memberVariableDeclaration: true,
          parameter: true,
          propertyDeclaration: true,
        },
      ],

      complexity: ['error', 10],

      curly: ['error', 'multi-line', 'consistent'],

      // Recommended rules that are, for now, disabled until the code is updated.
      '@typescript-eslint/await-thenable': 'off',
      '@typescript-eslint/no-base-to-string': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-enum-comparison': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-redundant-type-constituents': 'off',
      'no-empty-pattern': 'off',
      'no-prototype-builtins': 'off',
      'no-unsafe-optional-chaining': 'off',
      'no-useless-escape': 'off',
    },
  },
);
