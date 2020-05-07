import { send } from "micro";
import { NowRequest, NowResponse } from "@now/node";
import { getKey, options } from "./_utils/verify-token";
import { setupResponseData } from "./_utils/setup-response";
import jwt from "jsonwebtoken";

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
      send(
        response,
        401,
        setupResponseData({ message: "sorry not authorized :-(" })
      );
      return;
    }

    jwt.verify(
      request.headers.authorization.split(" ")[1],
      getKey,
      options,
      (err, _decoded) => {
        if (err) {
          console.error(err);
          send(
            response,
            401,
            setupResponseData({ message: "sorry not authorized: -(" })
          );
        } else {
          switch (request.method) {
            case "GET": {
              const data = setupResponseData({ data: [] });
              send(response, 200, data);
              break;
            }
            case "DELETE": {
              const data = setupResponseData({ message: "got a delete" });
              send(response, 200, data);
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
    send(
      response,
      400,
      setupResponseData({
        error:
          process.env.NODE_ENV === "development"
            ? JSON.stringify(error)
            : undefined,
      })
    );
    return;
  }
}
