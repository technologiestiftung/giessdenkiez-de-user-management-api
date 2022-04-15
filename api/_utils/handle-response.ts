import { HTTPError } from "got";
import { send } from "micro";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { setupResponseData } from "./setup-response";
import { getUserById, deleteUserById } from "./management-api";

export async function handleVerifiedRequest(
  response: VercelResponse,
  request: VercelRequest
): Promise<void> {
  try {
    const { userid } = request.query;
    if (!userid || Array.isArray(userid)) {
      return send(
        response,
        400,
        setupResponseData({ message: "wrong userid query provided" })
      );
    }
    switch (request.method) {
      case "GET": {
        // sanity checks
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
      }
      case "DELETE": {
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
        if (!(decodedUserId === userid)) {
          console.warn(
            "somebody is trying to delete a user without beeing the user "
          );
          return send(
            response,
            403,
            setupResponseData({
              message: "wrong userid provided",
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
