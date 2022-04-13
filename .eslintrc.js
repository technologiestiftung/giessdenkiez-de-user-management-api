/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { merge } = require("@inpyjamas/scripts/dist/utlities");
const localConfig = {
  ignorePatterns: ["node_modules", "dist", "coverage"],
  rules: {
    "jest/consistent-test-it": ["error", { fn: "it", withinDescribe: "test" }],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { args: "after-used", varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
    ],
  },
};
const eslintConfig = require("@inpyjamas/scripts/dist/config/eslint/typescript");
module.exports = merge(eslintConfig, localConfig);
