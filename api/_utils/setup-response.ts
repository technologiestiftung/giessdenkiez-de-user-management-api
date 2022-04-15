import { getPackage } from "./package";

const pkg = getPackage();

export function setupResponseData(overrides?: { [key: string]: unknown }): {
  [key: string]: unknown;
} {
  return {
    version: pkg.version,
    name: pkg.name,
    bugs: pkg.bugs?.url,
    home: pkg.homepage,
    ...overrides,
  };
}
