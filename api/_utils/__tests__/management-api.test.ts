import nock from "nock";
import { getToken, setupHeaders, deleteUserById } from "../management-api";
const token = "xyz";
const managementApiUrl = "http://api.abc";
const managementApiTokenIssuerUrl = "http://api.xyz";
jest.mock("../envs", () => {
  return {
    getEnvs: () => {
      return {
        jwksUri: "",
        audience: "",
        issuer: "",
        audienceFrontend: "",
        auth0ClientIdManagementApi: "xyz",
        auth0ClientSecretManagementApi: "xyz",
        auth0ManagementApiAudience: "xyz",
        auth0TokenApiUrlManagementApi: "http://api.xyz",
        auth0ManagementApiUrl: "http://api.abc",
      };
    },
  };
});
nock(managementApiTokenIssuerUrl).persist().post("/").reply(201, {
  access_token: token,
});
describe("manamgement api module", () => {
  test("getting a token nocked", async () => {
    expect(await getToken()).toBe(token);
  });

  test("setup headers", () => {
    const headers = setupHeaders(token);
    expect(headers).toBeDefined();
    expect(headers.authorization).toBeDefined();
    expect(headers.authorization).toMatch(new RegExp(token));
    expect(headers.authorization).toMatch(/Bearer/);
  });

  test("delete User By Id", async () => {
    const userId = "auth0|123";
    nock(managementApiUrl)
      .delete(`/users/${encodeURIComponent(userId)}`)
      .reply(204);
    expect(await deleteUserById(userId)).toBe(true);
  });
});
