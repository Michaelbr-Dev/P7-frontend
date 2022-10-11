const path = require('path');

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@babel/eslint-parser',
  },
  plugins: ['prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
  },
  settings: {
    'import/resolver': {
      alias: {
        extensions: ['.js', '.vue', '.json'],
        map: [
          ['~', path.resolve(__dirname, './src')],
          ['@', path.resolve(__dirname, './src')],
        ],
      },
    },
  },
};
