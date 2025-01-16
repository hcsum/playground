module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  env: {
    node: true,
    browser: true,
    es2020: true,
    jest: true,
  },
  reportUnusedDisableDirectives: true,
  root: true,
  rules: {
    "prettier/prettier": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "no-undef": "error",
    "no-global-assign": "error",
    eqeqeq: ["error", "always"],
    "no-unused-expressions": [
      "warn",
      {
        allowTaggedTemplates: true,
        allowTernary: true,
        allowShortCircuit: true,
      },
    ],
    "no-console": "off",
    "@typescript-eslint/no-var-requires": "off",
  },
  parserOptions: {
    sourceType: "module",
  },
};
