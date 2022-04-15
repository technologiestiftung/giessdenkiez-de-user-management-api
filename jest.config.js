/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require("@inpyjamas/scripts/dist/utlities");
const jestConfig = require("@inpyjamas/scripts/dist/config/jest/typescript");
const localConfig = {
  testPathIgnorePatterns: ["node_modules/", "<rootDir>/dist"],
  collectCoverageFrom: ["api/**/*.{ts,tsx}"],
  coveragePathIgnorePatterns: [
    "node_modules/",
    "<rootDir>/dist",
    "<rootDir>/api/index.ts",
  ],
};
module.exports = merge(jestConfig, localConfig);
