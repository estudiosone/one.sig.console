module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:security/recommended',
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  overrides: [
    {
      files: ['*.*'],
      rules: {
        'max-len': 'off', // disables line length check
      },
    },
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  plugins: [
  ],
};
