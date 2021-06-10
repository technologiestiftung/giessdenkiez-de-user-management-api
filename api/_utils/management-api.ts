import got, { HTTPError } from "got";
import { Generic } from "../_common/interfaces";
import { getEnvs } from "./envs";

interface Body {
  access_token: string;
  scope: string;
}
const {
  auth0ManagementApiUrl,
  auth0ClientIdManagementApi,
  auth0ClientSecretManagementApi,
  auth0ManagementApiAudience,
  auth0TokenApiUrlManagementApi,
} = getEnvs();
export async function getToken(): Promise<string> {
  // try {
  const tokenApiUrl = auth0TokenApiUrlManagementApi;
  const client_id = auth0ClientIdManagementApi;
  const client_secret = auth0ClientSecretManagementApi;
  const audience = auth0ManagementApiAudience;
  const body = {
    client_id,
    client_secret,
    audience,
    grant_type: "client_credentials",
  };
  // console.log(tokenApiUrl);
  // console.log("in get token", body);

  const res = await got.post(tokenApiUrl, {
    json: body,
    responseType: "json",
  });
  // console.log(res);
  const result = res.body as Body;
  // console.log(result, "<------------result");
  return result.access_token;
}

interface User {
  email: string;
  email_verified: boolean;
  name: string;
  username: string;
  nickname: string;
  user_id: string;
  created_at?: string;
  identities?: Generic[];
  picture?: string;
  updated_at?: string;
  user_metadata?: { username: string };
  last_login?: string;
  last_ip?: string;
  logins_count?: number;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function setupHeaders(token: string): { authorization: string } {
  const headers = {
    authorization: `Bearer ${token}`,
  };
  return headers;
}

export async function deleteUserById(userId: string): Promise<boolean> {
  try {
    const token = await getToken();
    const url = auth0ManagementApiUrl;
    const headers = setupHeaders(token);
    const reqUrl = `${url}/users/${encodeURIComponent(userId)}`;
    const res = await got.delete(reqUrl, {
      headers: headers,
      responseType: "json",
    });
    if (res.statusCode === 204) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("error getting token");
    console.error(error);
    return false;
  }
}
export async function getUserById(userId: string): Promise<User[]> {
  try {
    const token = await getToken();
    const url = auth0ManagementApiUrl;
    const headers = setupHeaders(token);
    // const users: User[] = [];
    const reqUrl = `${url}/users/${encodeURIComponent(
      userId
    )}?${"fields=user_id,email,email_verified,name,nickname,username&include_fields=true"}`;
    const { body } = await got(reqUrl, {
      headers: headers,
      responseType: "json",
    });

    return body as User[];
  } catch (error) {
    if (error instanceof HTTPError) {
      if (error.code === "404") {
        // console.error(error.message);
        // console.error(error.stack);
        return [];
      } else {
        throw error;
      }
      // console.error(error.code);
      // console.error(error.message);
      // console.error(error.stack);
    } else {
      // console.error(error);
      throw error;
    }
  }
}
