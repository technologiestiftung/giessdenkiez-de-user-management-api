import got from "got";
import { Generic } from "../_common/interfaces";
import { getEnvs } from "./envs";

/* eslint-disable @typescript-eslint/camelcase */
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
  const client_id = auth0ClientIdManagementApi; // process.env.AUTH0_CLIENT_ID;
  const client_secret = auth0ClientSecretManagementApi; //process.env.AUTH0_CLIENT_SECRET;
  const audience = auth0ManagementApiAudience; //process.env.AUTH0_AUDIENCE;
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
export function setupHeaders(token: string) {
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
    // console.log(reqUrl);
    const { body } = await got(reqUrl, {
      headers: headers,
      responseType: "json",
    });
    console.log(body);
    return body as User[];
  } catch (error) {
    console.error(error);
    throw error;
  }
}
