import { Issuer } from 'openid-client';

export const buildOpenIdClient = async () => {
  const TrustIssuer = await Issuer.discover(
    `${process.env.OAUTH2_CLIENT_PROVIDER_OIDC_ISSUER}/.well-known/openid-configuration`,
  );
  const client = new TrustIssuer.Client({
    client_id: process.env.OAUTH2_CLIENT_REGISTRATION_LOGIN_CLIENT_ID,
    client_secret: process.env.OAUTH2_CLIENT_REGISTRATION_LOGIN_CLIENT_SECRET,
  });
  return client;
};
