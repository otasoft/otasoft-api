import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { OpenIdService } from '../services';

@Controller('open-id')
export class OpenIdController {
  constructor(private readonly openIdService: OpenIdService) {}

  //   @UseGuards(OpenIDGuard)
  @Get('/login')
  login() {
    return this.openIdService.login();
  }

  @Get('/user')
  user(@Req() req) {
    return this.openIdService.user(req);
  }

  //   @UseGuards(OpenIDGuard)
  @Get('/callback')
  loginCallback(@Res() res: Response) {
    return this.openIdService.loginCallback(res);
  }

  @Get('/logout')
  async logout(@Req() req, @Res() res: Response) {
    return this.openIdService.logout(req, res);
  }
}
