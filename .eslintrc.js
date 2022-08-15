// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  ignorePatterns: ['build', '*.config.js', 'node_modules', 'src/gql/types/', 'src/generated-types.tsx'],
  extends: ['airbnb-typescript', 'airbnb/hooks', 'prettier'],
  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],

  rules: {
    // 'no-console': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
    'no-plusplus': 'off',
    'no-nested-ternary': 'off',
    'no-use-before-define': 'off',
    'no-shadow': 'off',
    'no-param-reassign': 'off',
    'func-names': 'off',
    'no-restricted-imports': ['error', { patterns: ['../*', '..'] }],
    'max-len': [
      'error',
      160,
      2,
      {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: false,
        ignoreTemplateLiterals: false,
      },
    ],
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/no-absolute-path': 'off',
    'react/destructuring-assignment': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'react/prop-types': 'off',
    'linebreak-style': 'off',
  },

  // plugins: ['react', '@typescript-eslint', 'jest'],
};
