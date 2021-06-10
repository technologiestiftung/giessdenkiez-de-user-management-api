import { send } from "micro";
import { NowRequest, NowResponse } from "@now/node";
import { options, verifyAuth0Token } from "./_utils/verify-user-token";
import { setupResponseData } from "./_utils/setup-response";
import { handleVerifiedRequest } from "./_utils/handle-response";

export default async function (
  request: NowRequest,
  response: NowResponse
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
        setupResponseData({ message: "sorry not authorized :-(" })
      );
    }
    // console.log(request.headers.authorization);

    try {
      const token = authorization.split(" ")[1];
      const decoded = await verifyAuth0Token(token, options);
      if (decoded === undefined) {
        return send(
          response,
          401,
          setupResponseData({ message: "sorry not authorized :-(" })
        );
      } else {
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
    // jwt.verify(
    //   request.headers.authorization.split(" ")[1],
    //   getKey,
    //   options,
    //   verificationCallback(response, request) // end verify cb
    // );
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
