/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable jest/no-hooks */
/* eslint-disable jest/no-commented-out-tests*/
import { NowResponse, NowRequest } from "@now/node";
import { handleVerifiedRequest } from "../handle-response";
import * as management from "../management-api";
import * as micro from "micro";
import { HTTPError } from "got";

// import * as setup from "../setup-response";
jest.mock("../management-api", () => {
  return {
    deleteUserById: jest.fn().mockImplementation(() => {
      return true;
    }),
    getUserById: jest.fn().mockImplementation(() => {
      return {};
    }),
  };
});
jest.mock("../setup-response", () => {
  return {
    setupResponseData: jest.fn(),
  };
});
jest.mock("micro");

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

describe("testing responses for GET", () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });
  beforeEach(() => {
    jest.resetAllMocks();
  });
  test("should call micro with 200 and user data", async () => {
    const res = {} as NowResponse;
    await handleVerifiedRequest(res, ({
      method: "GET",
      query: { userid: "auth0|123" },
    } as unknown) as NowRequest);

    expect(micro.send).toHaveBeenCalledWith(res, 200, undefined);
  });
  test("should call micro with 400 due to wrong id", async () => {
    const res = {} as NowResponse;
    await handleVerifiedRequest(res, ({
      method: "GET",
      query: { userid: "123" },
    } as unknown) as NowRequest);
    // expect(micro.send).toHaveBeenCalled();
    expect(micro.send).toHaveBeenCalledWith(res, 400, undefined);
  });
  test("should call micro with 400 due to missing user id", async () => {
    const res = {} as NowResponse;
    await handleVerifiedRequest(res, ({
      method: "GET",
      query: {},
    } as unknown) as NowRequest);
    expect(micro.send).toHaveBeenCalledWith(res, 400, undefined);
  });
  test("should call micro with 400 due to wrong type", async () => {
    const res = {} as NowResponse;
    await handleVerifiedRequest(res, ({
      method: "GET",
      query: { userid: ["foo"] },
    } as unknown) as NowRequest);
    expect(micro.send).toHaveBeenCalledWith(res, 400, undefined);
  });

  test("should call micro with 500 due to throwing error in getUserById", async () => {
    jest.spyOn(management, "getUserById").mockImplementation(() => {
      throw new Error("err");
    });
    const res = {} as NowResponse;
    await handleVerifiedRequest(res, ({
      method: "GET",
      query: { userid: "auth0|123" },
    } as unknown) as NowRequest);
    expect(micro.send).toHaveBeenCalledWith(res, 500, undefined);
  });

  test("should call micro with 404 due to throwing HttpError in getUserById", async () => {
    const res = {} as NowResponse;
    jest.spyOn(management, "getUserById").mockImplementation(() => {
      return Promise.reject(new HTTPError({} as any));
    });
    await handleVerifiedRequest(res, ({
      method: "GET",
      query: { userid: "auth0|123" },
    } as unknown) as NowRequest);
    expect(micro.send).toHaveBeenCalledWith(res, 404, undefined);
  });
  test("should call micro with 400 due to missing userid", async () => {
    const res = {} as NowResponse;
    await handleVerifiedRequest(res, ({
      method: "DELETE",
      query: {},
    } as unknown) as NowRequest);
    expect(micro.send).toHaveBeenCalledWith(res, 400, undefined);
  });
  test("should call micro with 400 due to wrong userid", async () => {
    const res = {} as NowResponse;
    await handleVerifiedRequest(res, ({
      method: "DELETE",
      query: { userid: [] },
    } as unknown) as NowRequest);
    expect(micro.send).toHaveBeenCalledWith(res, 400, undefined);
  });
  test("should call micro with 400 due to another wrong userid", async () => {
    const res = {} as NowResponse;
    await handleVerifiedRequest(res, ({
      method: "DELETE",
      query: { userid: {} },
    } as unknown) as NowRequest);
    expect(micro.send).toHaveBeenCalledWith(res, 400, undefined);
  });

  test("should call micro with 204 due to successfully deleting a user", async () => {
    const res = {} as NowResponse;
    jest
      .spyOn(management, "deleteUserById")
      .mockImplementation(() => Promise.resolve(true));

    await handleVerifiedRequest(res, ({
      method: "DELETE",
      query: { userid: "auth0|123" },
    } as unknown) as NowRequest);
    expect(micro.send).toHaveBeenCalledWith(res, 204, undefined);
  });

  test("should call micro with 400 due to not deleting a user", async () => {
    const res = {} as NowResponse;
    jest
      .spyOn(management, "deleteUserById")
      .mockImplementation(() => Promise.resolve(false));

    await handleVerifiedRequest(res, ({
      method: "DELETE",
      query: { userid: "auth0|123" },
    } as unknown) as NowRequest);
    expect(micro.send).toHaveBeenCalledWith(res, 400, undefined);
  });

  test("should call micro with 404 due wrong request type", async () => {
    const res = {} as NowResponse;
    jest
      .spyOn(management, "deleteUserById")
      .mockImplementation(() => Promise.resolve(false));

    await handleVerifiedRequest(res, ({
      method: "PUT",
      // query: { userid: "auth0|123" },
    } as unknown) as NowRequest);
    expect(micro.send).toHaveBeenCalledWith(res, 404, undefined);
  });
});
