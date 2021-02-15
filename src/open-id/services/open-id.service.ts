import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { Issuer } from 'openid-client';

@Injectable()
export class OpenIdService {
  async logout(req, res: Response) {
    const id_token = req.user ? req.user.id_token : undefined;
    req.logout();
    req.session.destroy(async (error: any) => {
      const TrustIssuer = await Issuer.discover(
        `${process.env.OAUTH2_CLIENT_PROVIDER_GOOGLE_ISSUER}/.well-known/openid-configuration`,
      );
      const end_session_endpoint = TrustIssuer.metadata.end_session_endpoint;
      if (end_session_endpoint) {
        const idTokenHint = id_token ? '&id_token_hint=' + id_token : '';
        const redirectUrl = `${end_session_endpoint}?post_logout_redirect_uri=${process.env.OAUTH2_CLIENT_REGISTRATION_LOGIN_POST_LOGOUT_REDIRECT_URI}${idTokenHint}`;

        res.redirect(redirectUrl);
      } else {
        res.redirect('/');
      }
    });
  }
}
