module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "linebreak-style": 0,
    'func-names': ["error", "never"],
    "import/extensions": [
      "error", "always", 
      { 
        "js": "never"
      }
    ],
    "vue/max-attributes-per-line": 3,
    "no-param-reassign": [2, { props: false }],
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "camelcase": [0],
    "no-underscore-dangle": [0]
  },
  parserOptions: {
    parser: 'babel-eslint',
  }
};
