import { getPackage } from "../_utils/package";
import fs from "fs";
const spyFsRead = jest.spyOn(fs, "readFileSync");
afterAll(() => {
  jest.restoreAllMocks();
});
describe("package module", () => {
  test("should", () => {
    const pkg = getPackage();
    expect(spyFsRead).toHaveBeenCalled();
    expect(pkg.name).toBeDefined();
    expect(pkg.version).toBeDefined();
  });
});
