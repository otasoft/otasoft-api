import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { OpenIdGuard } from '../guards';

import { OpenIdService } from '../services';

@Controller('open-id')
export class OpenIdController {
  constructor(private readonly openIdService: OpenIdService) {}

  @UseGuards(OpenIdGuard)
  @Get('/login')
  login() {}

  @Get('/user')
  user(@Req() req) {
    return req.user;
  }

  @UseGuards(OpenIdGuard)
  @Get('/callback')
  loginCallback(@Res() res: Response) {
    return res.redirect('/api/open-id/user');
  }

  @Get('/logout')
  async logout(@Req() req, @Res() res: Response) {
    return this.openIdService.logout(req, res);
  }
}
