interface Envs {
  jwksUri: string;
  audience: string;
  issuer: string;
  audienceFrontend: string;
}
export function getEnvs(): Envs {
  const jwksUri = process.env.JWKS_URI;
  const audienceFrontend = process.env.AUTH0_AUDIENCE_FRONTEND;
  const audience = process.env.AUTH0_AUDIENCE;
  const issuer = process.env.AUTH0_ISSUER;
  if (!jwksUri) throw new Error("Could not find jwksUri");
  if (!audience) throw new Error("Could not find audience");
  if (!audienceFrontend) throw new Error("Could not find audienceFrontend");
  if (!issuer) throw new Error("Could not find issuer");

  return { audienceFrontend, audience, issuer, jwksUri };
}
