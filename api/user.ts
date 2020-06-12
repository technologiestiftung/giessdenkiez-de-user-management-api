import { HTTPError } from "got";
import { send } from "micro";
import { NowRequest, NowResponse } from "@now/node";
import { getKey, options } from "./_utils/verify-user-token";
import { setupResponseData } from "./_utils/setup-response";
import jwt from "jsonwebtoken";
import { getUserById, deleteUserById } from "./_utils/management-api";

export default async function (
  request: NowRequest,
  response: NowResponse
): Promise<void> {
  try {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, DELETE, OPTIONS"
    );
    response.setHeader(
      "Access-Control-Allow-Headers",
      "Authorization, Accept, Content-Type"
    );
    if (request.method === "OPTIONS") {
      return send(response, 200);
    }
    if (!request.headers.authorization) {
      return send(
        response,
        401,
        setupResponseData({ message: "sorry not authorized :-(" })
      );
    }
    // console.log(request.headers.authorization);

    jwt.verify(
      request.headers.authorization.split(" ")[1],
      getKey,
      options,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (err, _decoded) => {
        if (err) {
          // Errrrrrrr
          console.error(err);
          return send(
            response,
            401,
            setupResponseData({ message: "sorry not authorized: -(" })
          );
        } else {
          // console.log(decoded);
          switch (request.method) {
            case "GET": {
              // sanity checks
              const { userid } = request.query;

              if (!userid || Array.isArray(userid)) {
                return send(
                  response,
                  400,
                  setupResponseData({ message: "wrong userid query provided" })
                );
              }
              const decodedUserId = decodeURIComponent(userid);
              if (!decodedUserId.startsWith("auth0|")) {
                return send(
                  response,
                  400,
                  setupResponseData({ message: "wrong userid query provided" })
                );
              }
              getUserById(decodedUserId)
                .then((userData) => {
                  const data = setupResponseData({ data: userData });
                  return send(response, 200, data);
                })
                .catch((err) => {
                  console.error(err);
                  if (err instanceof HTTPError) {
                    return send(
                      response,
                      404,
                      setupResponseData({
                        message: "not found",
                      })
                    );
                  }
                  return send(
                    response,
                    500,
                    setupResponseData({
                      message: "internal server error from get user",
                    })
                  );
                });
              break;
            }
            case "DELETE": {
              const { userid } = request.query;

              if (!userid || Array.isArray(userid)) {
                return send(
                  response,
                  400,
                  setupResponseData({ message: "wrong userid query provided" })
                );
              }
              const decodedUserId = decodeURIComponent(userid);

              if (!decodedUserId.startsWith("auth0|")) {
                return send(
                  response,
                  400,
                  setupResponseData({
                    message: "wrong userid query provided not auth0",
                  })
                );
              }
              deleteUserById(decodedUserId)
                .then((res) => {
                  if (res === true) {
                    const data = setupResponseData({
                      message: `user ${decodedUserId} succesfully deleteed`,
                    });
                    return send(response, 204, data);
                  } else {
                    const data = setupResponseData({
                      message: `user ${decodedUserId} could not be deleted`,
                    });
                    return send(response, 400, data);
                  }
                })
                .catch((err) => {
                  console.error(err);
                  return send(
                    response,
                    500,
                    setupResponseData({ message: "internal server error" })
                  );
                });
              break;
            }
            default: {
              send(
                response,
                404,
                setupResponseData({
                  message: `no response defiend for method ${request.method}`,
                })
              );
            } // end default
          } // end switch
        } // end else
      } // end verify cb
    );
  } catch (error) {
    console.log(error);
    return send(
      response,
      400,
      setupResponseData({
        error:
          process.env.NODE_ENV === "development"
            ? JSON.stringify(error)
            : undefined,
      })
    );
  }
}
