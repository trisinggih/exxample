module.exports = {
  parser: 'vue-eslint-parser',
  extends: ['@nuxt/eslint-config', 'plugin:prettier/recommended'],
  root: true,
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/no-v-model-argument': 'off',
    'vue/require-prop-types': 'off',
    'vue/require-default-prop': 'off',
    'import/no-named-as-default-member': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        printWidth: 80,
      },
    ],
  },
};
