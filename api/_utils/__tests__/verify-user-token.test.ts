/* eslint-disable jest/no-hooks */
import createJWKSMock from "mock-jwks";
import { options, verifyAuth0Token } from "../verify-user-token";
jest.mock("../envs", () => {
  return {
    getEnvs: () => {
      return {
        jwksUri: "https://jwks.foo",
        audienceFrontend: "foo",
        issuer: "foo",
      };
    },
  };
});

const jwks = createJWKSMock("https://jwks.foo", "/");
describe("token verification", () => {
  beforeEach(() => {
    jwks.start();
  });

  afterEach(() => {
    jwks.stop();
  });

  test("should verify a token", async () => {
    const payload = { aud: ["foo"], iss: "foo" };
    const token = jwks.token(payload);
    const data = await verifyAuth0Token(token, options);
    expect(data).toStrictEqual(payload);
  });

  test("should thorw errors", async () => {
    const payload = { aud: [], iss: "foo" };
    const token = jwks.token(payload);
    await expect(verifyAuth0Token(token, options)).rejects.toThrow(
      "jwt audience invalid. expected: foo"
    );
  });
});
