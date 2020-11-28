import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { OpenIDGuard } from '../../../guards/openid.guard';
import { OidcService } from '../../../services/oidc/oidc.service';

@Controller('oidc')
export class OidcController {
  constructor(private readonly oidcService: OidcService) {}

  @UseGuards(OpenIDGuard)
  @Get('/login')
  login() {
    return this.oidcService.login();
  }

  @Get('/user')
  user(@Req() req) {
    return this.oidcService.user(req);
  }

  @UseGuards(OpenIDGuard)
  @Get('/callback')
  loginCallback(@Res() res: Response) {
    return this.oidcService.loginCallback(res);
  }

  @Get('/logout')
  async logout(@Req() req, @Res() res: Response) {
    return this.oidcService.logout(req, res);
  }
}
