module.exports = {
  root: true,

  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module',
  },

  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
  },

  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'eslint-config-prettier',
    'prettier/vue',
    'plugin:json/recommended',
  ],

  plugins: ['eslint-plugin-vue', 'eslint-plugin-prettier'],

  globals: {
    process: true,
  },

  rules: {
    'prettier/prettier': 'error',

    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
  },
};
