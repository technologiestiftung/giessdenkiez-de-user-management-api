import * as pkg from "../_utils/package";

afterAll(() => {
  jest.restoreAllMocks();
});
jest.mock("../_utils/package", () => {
  return {
    getPackage: jest.fn().mockImplementation(() => {
      return {
        name: "foo",
        version: "0.1.0",
        bugs: { url: "https://example.com" },
        homepage: "https://example.com",
      };
    }),
  };
});
describe("setup-response", () => {
  test("should call package.ts", () => {
    import("../_utils/setup-response")
      .then((module) => {
        const overrides = { main: "index.js" };
        const res = module.setupResponseData(overrides);
        expect(pkg.getPackage).toHaveBeenCalled();
        expect(res.main).toBe("index.js");
      })
      .catch((err) => {
        throw err;
      });
  });
});
