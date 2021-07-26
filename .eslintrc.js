module.exports = {
  extends: [
    "../../.eslintrc.js",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:jest/recommended",
  ],
  ignorePatterns: [".next/", "out/"],
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "react/react-in-jsx-scope": "off", // NextJS make it possible to use JSX without importing React
  },
  overrides: [
    {
      files: ["**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: ["plugin:testing-library/react"],
    },
  ],
}
