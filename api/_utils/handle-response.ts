import { HTTPError } from "got";
import { send } from "micro";
import { NowRequest, NowResponse } from "@now/node";
import { setupResponseData } from "./setup-response";
// import jwt from "jsonwebtoken";
import { getUserById, deleteUserById } from "./management-api";

/**
 * @deprecated
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// function verificationCallback(
//   response: NowResponse,
//   request: NowRequest
// ): jwt.VerifyCallback | undefined {
//   return (err, _decoded) => {
//     if (err) {
//       // Errrrrrrr
//       console.error(err);
//       return send(
//         response,
//         401,
//         setupResponseData({ message: "sorry not authorized: -(" })
//       );
//     } else {
//       handleVerifiedRequest(response, request);
//       // console.log(decoded);
//       // end of switch
//     }
//   };
// }

export async function handleVerifiedRequest(
  response: NowResponse,
  request: NowRequest
): Promise<void> {
  try {
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
        const userData = await getUserById(decodedUserId);
        const data = setupResponseData({ data: userData });
        return send(response, 200, data);

        // getUserById(decodedUserId)
        //   .then((userData) => {
        //     const data = setupResponseData({ data: userData });
        //     return send(response, 200, data);
        //   })
        //   .catch((err) => {
        //     console.error(err);
        //     if (err instanceof HTTPError) {
        //       return send(
        //         response,
        //         404,
        //         setupResponseData({
        //           message: "not found",
        //         })
        //       );
        //     }
        //     return send(
        //       response,
        //       500,
        //       setupResponseData({
        //         message: "internal server error from get user",
        //       })
        //     );
        //   });
        // break;
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
        const res = await deleteUserById(decodedUserId);
        if (res === true) {
          const data = setupResponseData({
            message: `user ${decodedUserId} succesfully deleted`,
          });
          return send(response, 204, data);
        } else {
          const data = setupResponseData({
            message: `user ${decodedUserId} could not be deleted`,
          });
          return send(response, 400, data);
        }

        // deleteUserById(decodedUserId)
        //   .then((res) => {
        //     if (res === true) {
        //       const data = setupResponseData({
        //         message: `user ${decodedUserId} succesfully deleteed`,
        //       });
        //       return send(response, 204, data);
        //     } else {
        //       const data = setupResponseData({
        //         message: `user ${decodedUserId} could not be deleted`,
        //       });
        //       return send(response, 400, data);
        //     }
        //   })
        //   .catch((err) => {
        //     console.error(err);
        //     return send(
        //       response,
        //       500,
        //       setupResponseData({ message: "internal server error" })
        //     );
        //   });
        // break;
      }
      default: {
        send(
          response,
          404,
          setupResponseData({
            message: `no response defiend for method ${request.method}`,
          })
        );
      }
    }
  } catch (error) {
    // console.error(error);

    switch (request.method) {
      case "GET": {
        if (error instanceof HTTPError) {
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
      }
      case "DELETE": {
        console.error(error);
        return send(
          response,
          500,
          setupResponseData({ message: "internal server error" })
        );
      }
    }
  }
}
