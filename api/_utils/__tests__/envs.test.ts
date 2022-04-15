/* eslint-disable jest/no-conditional-expect */
/* eslint-disable jest/require-to-throw-message */
/* eslint-disable jest/valid-expect-in-promise */
/* eslint-disable jest/no-hooks */
describe("testing env values", () => {
  afterEach(() => {
    delete process.env.JWKS_URI;
    delete process.env.AUTH0_AUDIENCE_FRONTEND;
    delete process.env.AUTH0_AUDIENCE;
    delete process.env.AUTH0_ISSUER;
    delete process.env.AUTH0_CLIENT_ID_MANAGEMENT_API;
    delete process.env.AUTH0_CLIENT_SECRET_MANAGEMENT_API;
    delete process.env.AUTH0_AUDIENCE_MANAGEMENT_API_AUDIENCE;
    delete process.env.AUTH0_TOKEN_API_URL_MANAGEMENT_API;
    delete process.env.AUTH0_MANAGEMENT_API_URL;
  });
  test("all values exist module does not throw", () => {
    process.env.JWKS_URI = "foo";
    process.env.AUTH0_AUDIENCE_FRONTEND = "foo";
    process.env.AUTH0_AUDIENCE = "foo";
    process.env.AUTH0_ISSUER = "foo";
    process.env.AUTH0_CLIENT_ID_MANAGEMENT_API = "foo";
    process.env.AUTH0_CLIENT_SECRET_MANAGEMENT_API = "foo";
    process.env.AUTH0_AUDIENCE_MANAGEMENT_API_AUDIENCE = "foo";
    process.env.AUTH0_TOKEN_API_URL_MANAGEMENT_API = "foo";
    process.env.AUTH0_MANAGEMENT_API_URL = "foo";
    import("../envs")
      .then((module) => {
        expect(module).toBeDefined();
        expect(() => {
          module.getEnvs();
        }).not.toThrow();
      })
      .catch((err) => {
        throw err;
      });
  });

  test("should throw error due to missing JWS_URI", () => {
    // const origProcessEnv = process.env;
    // process.env.JWKS_URI = "foo";
    process.env.AUTH0_AUDIENCE_FRONTEND = "foo";
    process.env.AUTH0_AUDIENCE = "foo";
    process.env.AUTH0_ISSUER = "foo";
    process.env.AUTH0_CLIENT_ID_MANAGEMENT_API = "foo";
    process.env.AUTH0_CLIENT_SECRET_MANAGEMENT_API = "foo";
    process.env.AUTH0_AUDIENCE_MANAGEMENT_API_AUDIENCE = "foo";
    process.env.AUTH0_TOKEN_API_URL_MANAGEMENT_API = "foo";
    process.env.AUTH0_MANAGEMENT_API_URL = "foo";
    import("../envs")
      .then((module) => {
        expect(module).toBeDefined();
        expect(() => {
          module.getEnvs();
        }).toThrow();
      })
      .catch((err) => {
        throw err;
      });
  });

  test("should throw error due to missing AUTH0_AUDIENCE_FRONTEND", () => {
    // const origProcessEnv = process.env;
    process.env.JWKS_URI = "foo";
    // process.env.AUTH0_AUDIENCE_FRONTEND = "foo";
    process.env.AUTH0_AUDIENCE = "foo";
    process.env.AUTH0_ISSUER = "foo";
    process.env.AUTH0_CLIENT_ID_MANAGEMENT_API = "foo";
    process.env.AUTH0_CLIENT_SECRET_MANAGEMENT_API = "foo";
    process.env.AUTH0_AUDIENCE_MANAGEMENT_API_AUDIENCE = "foo";
    process.env.AUTH0_TOKEN_API_URL_MANAGEMENT_API = "foo";
    process.env.AUTH0_MANAGEMENT_API_URL = "foo";
    import("../envs")
      .then((module) => {
        expect(module).toBeDefined();
        expect(() => {
          module.getEnvs();
        }).toThrow();
      })
      .catch((err) => {
        throw err;
      });
  });
  // eslint-disable-next-line jest/no-commented-out-tests
  // test("should throw error due to missing AUTH0_AUDIENCE", () => {
  //   // const origProcessEnv = process.env;
  //   process.env.JWKS_URI = "foo";
  //   process.env.AUTH0_AUDIENCE_FRONTEND = "foo";
  //   // process.env.AUTH0_AUDIENCE = "foo";
  //   process.env.AUTH0_ISSUER = "foo";
  //   process.env.AUTH0_CLIENT_ID_MANAGEMENT_API = "foo";
  //   process.env.AUTH0_CLIENT_SECRET_MANAGEMENT_API = "foo";
  //   process.env.AUTH0_AUDIENCE_MANAGEMENT_API_AUDIENCE = "foo";
  //   process.env.AUTH0_TOKEN_API_URL_MANAGEMENT_API = "foo";
  //   process.env.AUTH0_MANAGEMENT_API_URL = "foo";
  //   import("../envs")
  //     .then((module) => {
  //       expect(module).toBeDefined();
  //       expect(() => {
  //         module.getEnvs();
  //       }).toThrow();
  //     })
  //     .catch((err) => {
  //       throw err;
  //     });
  // });
  test("should throw error due to missing AUTH0_ISSUER", () => {
    // const origProcessEnv = process.env;
    process.env.JWKS_URI = "foo";
    process.env.AUTH0_AUDIENCE_FRONTEND = "foo";
    process.env.AUTH0_AUDIENCE = "foo";
    // process.env.AUTH0_ISSUER = "foo";
    process.env.AUTH0_CLIENT_ID_MANAGEMENT_API = "foo";
    process.env.AUTH0_CLIENT_SECRET_MANAGEMENT_API = "foo";
    process.env.AUTH0_AUDIENCE_MANAGEMENT_API_AUDIENCE = "foo";
    process.env.AUTH0_TOKEN_API_URL_MANAGEMENT_API = "foo";
    process.env.AUTH0_MANAGEMENT_API_URL = "foo";
    import("../envs")
      .then((module) => {
        expect(module).toBeDefined();
        expect(() => {
          module.getEnvs();
        }).toThrow();
      })
      .catch((err) => {
        throw err;
      });
  });
  test("should throw error due to missing AUTH0_CLIENT_ID_MANAGEMENT_API", () => {
    // const origProcessEnv = process.env;
    process.env.JWKS_URI = "foo";
    process.env.AUTH0_AUDIENCE_FRONTEND = "foo";
    process.env.AUTH0_AUDIENCE = "foo";
    process.env.AUTH0_ISSUER = "foo";
    // process.env.AUTH0_CLIENT_ID_MANAGEMENT_API = "foo";
    process.env.AUTH0_CLIENT_SECRET_MANAGEMENT_API = "foo";
    process.env.AUTH0_AUDIENCE_MANAGEMENT_API_AUDIENCE = "foo";
    process.env.AUTH0_TOKEN_API_URL_MANAGEMENT_API = "foo";
    process.env.AUTH0_MANAGEMENT_API_URL = "foo";
    import("../envs")
      .then((module) => {
        expect(module).toBeDefined();
        expect(() => {
          module.getEnvs();
        }).toThrow();
      })
      .catch((err) => {
        throw err;
      });
  });
  test("should throw error due to missing AUTH0_CLIENT_SECRET_MANAGEMENT_API", () => {
    // const origProcessEnv = process.env;
    process.env.JWKS_URI = "foo";
    process.env.AUTH0_AUDIENCE_FRONTEND = "foo";
    process.env.AUTH0_AUDIENCE = "foo";
    process.env.AUTH0_ISSUER = "foo";
    process.env.AUTH0_CLIENT_ID_MANAGEMENT_API = "foo";
    // process.env.AUTH0_CLIENT_SECRET_MANAGEMENT_API = "foo";
    process.env.AUTH0_AUDIENCE_MANAGEMENT_API_AUDIENCE = "foo";
    process.env.AUTH0_TOKEN_API_URL_MANAGEMENT_API = "foo";
    process.env.AUTH0_MANAGEMENT_API_URL = "foo";
    import("../envs")
      .then((module) => {
        expect(module).toBeDefined();
        expect(() => {
          module.getEnvs();
        }).toThrow();
      })
      .catch((err) => {
        throw err;
      });
  });
  test("should throw error due to missing AUTH0_AUDIENCE_MANAGEMENT_API_AUDIENCE", () => {
    // const origProcessEnv = process.env;
    process.env.JWKS_URI = "foo";
    process.env.AUTH0_AUDIENCE_FRONTEND = "foo";
    process.env.AUTH0_AUDIENCE = "foo";
    process.env.AUTH0_ISSUER = "foo";
    process.env.AUTH0_CLIENT_ID_MANAGEMENT_API = "foo";
    process.env.AUTH0_CLIENT_SECRET_MANAGEMENT_API = "foo";
    // process.env.AUTH0_AUDIENCE_MANAGEMENT_API_AUDIENCE = "foo";
    process.env.AUTH0_TOKEN_API_URL_MANAGEMENT_API = "foo";
    process.env.AUTH0_MANAGEMENT_API_URL = "foo";
    import("../envs")
      .then((module) => {
        expect(module).toBeDefined();
        expect(() => {
          module.getEnvs();
        }).toThrow();
      })
      .catch((err) => {
        throw err;
      });
  });
  test("should throw error due to missing AUTH0_TOKEN_API_URL_MANAGEMENT_API", () => {
    // const origProcessEnv = process.env;
    process.env.JWKS_URI = "foo";
    process.env.AUTH0_AUDIENCE_FRONTEND = "foo";
    process.env.AUTH0_AUDIENCE = "foo";
    process.env.AUTH0_ISSUER = "foo";
    process.env.AUTH0_CLIENT_ID_MANAGEMENT_API = "foo";
    process.env.AUTH0_CLIENT_SECRET_MANAGEMENT_API = "foo";
    process.env.AUTH0_AUDIENCE_MANAGEMENT_API_AUDIENCE = "foo";
    // process.env.AUTH0_TOKEN_API_URL_MANAGEMENT_API = "foo";
    process.env.AUTH0_MANAGEMENT_API_URL = "foo";
    import("../envs")
      .then((module) => {
        expect(module).toBeDefined();
        expect(() => {
          module.getEnvs();
        }).toThrow();
      })
      .catch((err) => {
        throw err;
      });
  });
  test("should throw error due to missing AUTH0_MANAGEMENT_API_URL", () => {
    // const origProcessEnv = process.env;
    process.env.JWKS_URI = "foo";
    process.env.AUTH0_AUDIENCE_FRONTEND = "foo";
    process.env.AUTH0_AUDIENCE = "foo";
    process.env.AUTH0_ISSUER = "foo";
    process.env.AUTH0_CLIENT_ID_MANAGEMENT_API = "foo";
    process.env.AUTH0_CLIENT_SECRET_MANAGEMENT_API = "foo";
    process.env.AUTH0_AUDIENCE_MANAGEMENT_API_AUDIENCE = "foo";
    process.env.AUTH0_TOKEN_API_URL_MANAGEMENT_API = "foo";
    // process.env.AUTH0_MANAGEMENT_API_URL = "foo";
    import("../envs")
      .then((module) => {
        expect(module).toBeDefined();
        expect(() => {
          module.getEnvs();
        }).toThrow();
      })
      .catch((err) => {
        throw err;
      });
  });
});
