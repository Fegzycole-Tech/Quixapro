import nextEslintConfig from '@repo/eslint-config/next';

export default [
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  ...nextEslintConfig,
];
