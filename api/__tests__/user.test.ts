/* eslint-disable jest/no-hooks */
import user from "../user";
import * as micro from "micro";
import * as handlers from "../_utils/handle-response";
import * as verify from "../_utils/verify-user-token";
import { VercelResponse, VercelRequest } from "@vercel/node";
jest.mock("micro");
jest.mock("../_utils/handle-response");
jest.mock("../_utils/setup-response", () => {
  return {
    setupResponseData: jest.fn(),
  };
});

jest.mock("../_utils/verify-user-token", () => {
  return {
    verifyAuth0Token: jest.fn(),
  };
});
jest.mock("../_utils/envs", () => {
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

function setupRes(overrides?: { [key: string]: unknown }) {
  return { setHeader: jest.fn(), ...overrides } as unknown as VercelResponse;
}
function setupReq(overrides?: { [key: string]: unknown }) {
  return { method: "OPTIONS", ...overrides } as VercelRequest;
}
describe("should call the user object", () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("should call setHeader with method OPTIONS", async () => {
    const res = setupRes();
    const req = setupReq();
    await user(req, res);
    expect(micro.send).toHaveBeenCalledWith(res, 200);
    expect(res.setHeader).toHaveBeenCalledWith(
      "Access-Control-Allow-Origin",
      "*"
    );
    expect(res.setHeader).toHaveBeenCalledWith(
      "Access-Control-Allow-Methods",
      "GET, DELETE, OPTIONS"
    );
    expect(res.setHeader).toHaveBeenCalledWith(
      "Access-Control-Allow-Headers",
      "Authorization, Accept, Content-Type"
    );
    expect(res.setHeader).toHaveBeenCalledTimes(3);
  });
  test("call micro with 401 if auth header missing", async () => {
    const res = setupRes();
    const req = setupReq({ method: "GET" });
    await user(req, res);
    expect(micro.send).toHaveBeenCalledWith(res, 401, undefined);
  });
  test("call micro with 401 if token could not be verified or is undefined", async () => {
    const res = setupRes();
    const req = setupReq({
      method: "GET",
      headers: { authorization: "Bearer xyz" },
    });
    await user(req, res);
    expect(micro.send).toHaveBeenCalledWith(res, 401, undefined);
  });
  test("call handleVerifiedRequest if it passes", async () => {
    jest
      .spyOn(verify, "verifyAuth0Token")
      .mockImplementation(() => Promise.resolve({ token: "foo", sub: "foo" }));
    const res = setupRes();
    const req = setupReq({
      method: "GET",
      query: { userid: "foo" },
      headers: { authorization: "Bearer xyz" },
    });
    await user(req, res);
    expect(handlers.handleVerifiedRequest).toHaveBeenCalledWith(res, req);
  });
});
