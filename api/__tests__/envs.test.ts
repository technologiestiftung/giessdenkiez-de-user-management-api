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
describe("testing env values", () => {
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
    import("../_utils/envs")
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

  test("all values exist module does not throw", () => {
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
    import("../_utils/envs")
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
  test("all values exist module does not throw", () => {
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
    import("../_utils/envs")
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
  test("all values exist module does not throw", () => {
    // const origProcessEnv = process.env;
    process.env.JWKS_URI = "foo";
    process.env.AUTH0_AUDIENCE_FRONTEND = "foo";
    // process.env.AUTH0_AUDIENCE = "foo";
    process.env.AUTH0_ISSUER = "foo";
    process.env.AUTH0_CLIENT_ID_MANAGEMENT_API = "foo";
    process.env.AUTH0_CLIENT_SECRET_MANAGEMENT_API = "foo";
    process.env.AUTH0_AUDIENCE_MANAGEMENT_API_AUDIENCE = "foo";
    process.env.AUTH0_TOKEN_API_URL_MANAGEMENT_API = "foo";
    process.env.AUTH0_MANAGEMENT_API_URL = "foo";
    import("../_utils/envs")
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
  test("all values exist module does not throw", () => {
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
    import("../_utils/envs")
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
  test("all values exist module does not throw", () => {
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
    import("../_utils/envs")
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
  test("all values exist module does not throw", () => {
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
    import("../_utils/envs")
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
  test("all values exist module does not throw", () => {
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
    import("../_utils/envs")
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
  test("all values exist module does not throw", () => {
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
    import("../_utils/envs")
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
  test("all values exist module does not throw", () => {
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
    import("../_utils/envs")
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
