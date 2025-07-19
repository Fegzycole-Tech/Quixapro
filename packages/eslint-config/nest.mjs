import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import { config, configs } from 'typescript-eslint';

export default config(
  eslint.configs.recommended,
  ...configs.recommendedTypeChecked,
  eslintConfigPrettier,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.jest,
      },
    },
    rules: {
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
        },
      ],

      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',

      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'class',
          format: ['PascalCase'],
        },
        {
          selector: ['interface', 'typeLike'],
          format: ['PascalCase'],

          custom: {
            regex: '^I[A-Z]',
            match: false,
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
          format: ['camelCase'],
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

      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-inferrable-types': 0,

      '@typescript-eslint/typedef': [
        'error',
        {
          arrayDestructuring: true,
          arrowParameter: true,
          memberVariableDeclaration: true,
          objectDestructuring: true,
          parameter: true,
          propertyDeclaration: true,
          variableDeclaration: true,
          variableDeclarationIgnoreFunction: true,
        },
      ],

      complexity: ['error', 10],
      'sort-imports': 'error',
      '@typescript-eslint/unbound-method': 'off',
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
    },
  },
);
