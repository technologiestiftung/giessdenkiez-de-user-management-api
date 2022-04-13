import { send } from "micro";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { options, verifyAuth0Token } from "./_utils/verify-user-token";
import { setupResponseData } from "./_utils/setup-response";
import { handleVerifiedRequest } from "./_utils/handle-response";

export default async function (
  request: VercelRequest,
  response: VercelResponse
): Promise<void> {
  try {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, DELETE, OPTIONS");
    response.setHeader(
      "Access-Control-Allow-Headers",
      "Authorization, Accept, Content-Type"
    );
    if (request.method === "OPTIONS") {
      return send(response, 200);
    }
    const authorization =
      request.headers?.authorization ||
      (request.headers?.Authorization as string);
    if (!authorization) {
      return send(
        response,
        401,
        setupResponseData({
          message:
            "Unauthorized: The authorization header was not present in the request",
        })
      );
    }
    // console.log(request.headers.authorization);

    try {
      const token = authorization.split(" ")[1];
      const decoded = (await verifyAuth0Token(token, options)) as {
        sub: string;
        [key: string]: unknown;
      };
      if (decoded === undefined) {
        return send(
          response,
          401,
          setupResponseData({
            message: "Unauthorized: The provided JWT token is invalid",
          })
        );
      } else {
        const { sub } = decoded;
        if (sub !== request.query.userid) {
          console.warn(
            "Someone is trying to delete/get a account that is not his"
          );
          return send(
            response,
            403,
            setupResponseData({
              message: "Unauthorized",
            })
          );
        }
        // token should be valid now
        await handleVerifiedRequest(response, request);
      }
    } catch (e) {
      console.error(
        e,
        "token verification did not work or handleVerifiedRequest did not work"
      );
      throw e;
    }
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
