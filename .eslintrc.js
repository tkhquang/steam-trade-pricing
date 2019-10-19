module.exports = {
  root: true,
  parser: "babel-eslint",
  extends: [
    "standard",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "prettier",
    "prettier/flowtype",
    "prettier/react",
    'prettier/standard',
  ],
  plugins: [
    "prettier",
    "standard",
    "react",
    "react-hooks",
  ],
  settings: {
    react: {
      version: "16.0",
    },
  },
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    },
  },
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  rules: {
    camelcase: "off",
    "prettier/prettier": [
      "error",
      {
        parser: "flow",
        printWidth: 80,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: false,
        trailingComma: "none",
        bracketSpacing: true,

        "comma-dangle": ["error", "always"],
        "no-cond-assign": ["error", "always"],
        "no-console": "off"
      },
    ],
    "react/prop-types": "off",
    "react/display-name": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  },
};
