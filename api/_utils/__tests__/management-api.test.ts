import nock from "nock";
import {
  getToken,
  setupHeaders,
  deleteUserById,
  getUserById,
  userQuery,
} from "../management-api";
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

  test("delete User By Id error 500", async () => {
    const userId = "auth0|123";
    jest.spyOn(console, "error").mockImplementation(() => {});
    nock(managementApiUrl)
      .delete(`/users/${encodeURIComponent(userId)}`)
      .reply(400);
    expect(await deleteUserById(userId)).toBe(false);
    jest.restoreAllMocks();
  });
  test("delete User By Id error not 204", async () => {
    const userId = "auth0|123";
    nock(managementApiUrl)
      .delete(`/users/${encodeURIComponent(userId)}`)
      .reply(200);
    expect(await deleteUserById(userId)).toBe(false);
  });
  test("get User By Id", async () => {
    const userId = "auth0|123";
    nock(managementApiUrl)
      .get(`/users/${encodeURIComponent(userId)}?${userQuery()}`)
      .reply(200, {});
    expect(await getUserById(userId)).toStrictEqual({});
  });
  test("get User By Id", async () => {
    const userId = "auth0|123";
    nock(managementApiUrl)
      .get(`/users/${encodeURIComponent(userId)}?${userQuery()}`)
      .reply(404);
    await expect(getUserById(userId)).rejects.toThrow();
  });
});
