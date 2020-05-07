import { json, send } from "micro";
import { NowRequest, NowResponse } from "@now/node";
export default async function (
  request: NowRequest,
  response: NowResponse
): Promise<void> {
  try {
    const data = json(request);
    console.info(data);
    send(response, 200, {});
    return;
  } catch (error) {
    send(response, 400);
    return;
  }
}
