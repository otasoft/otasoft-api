import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Client, TokenSet, UserinfoResponse } from 'openid-client';

import { OpenIdService } from '../services';

export class OpenIdStrategy extends PassportStrategy(Strategy, 'openid') {
  client: Client;

  constructor(private readonly openIdService: OpenIdService, client: Client) {
    super({
      client: client,
      params: {
        redirect_uri: process.env.OAUTH2_CLIENT_REGISTRATION_LOGIN_REDIRECT_URI,
        scope: process.env.OAUTH2_CLIENT_REGISTRATION_LOGIN_SCOPE,
      },
      passReqToCallback: false,
      usePKCE: false,
    });

    this.client = client;
  }

  async validate(tokenset: TokenSet): Promise<any> {
    try {
      const userInfo: UserinfoResponse = await this.client.userinfo(tokenset);
      const { id_token, access_token, refresh_token } = tokenset;

      const user = {
        id_token: id_token,
        access_token: access_token,
        refresh_token: refresh_token,
        userInfo,
      };

      return user;
    } catch (error) {
      throw new UnauthorizedException('Cannot validate OpenID');
    }
  }
}
