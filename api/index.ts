import { send } from "micro";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { getPackage } from "./_utils/package";

const pkg = getPackage();

export default async function (
  _request: VercelRequest,
  response: VercelResponse
): Promise<void> {
  try {
    // const data = await json(request);
    send(response, 200, {
      version: pkg.version,
      name: pkg.name,
      bugs: pkg.bugs?.url,
      home: pkg.homepage,
    });
    return;
  } catch (error) {
    console.log(error);
    send(response, 400);
    return;
  }
}
