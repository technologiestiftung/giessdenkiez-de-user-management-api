import { getPackage } from "../package";
describe("package module", () => {
  // eslint-disable-next-line jest/no-hooks
  afterAll(() => {
    jest.restoreAllMocks();
  });
  test("should", () => {
    const pkg = getPackage();
    expect(pkg.name).toBeDefined();
    expect(pkg.version).toBeDefined();
  });
});
