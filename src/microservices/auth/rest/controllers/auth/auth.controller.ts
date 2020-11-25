import { Controller, Post, Body, Res, UseGuards, Get, HttpCode, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { request } from 'https';

import { RequestWithUser } from '../../../../../decorators';
import { JwtRefreshGuard } from '../../../guards/jwt-refresh.guard';
import { AuthService } from '../../../services/auth/auth.service';
import { AuthCredentialsDto } from '../../dto';
import { RestAuthUser } from '../../models';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<RestAuthUser> {
    return this.authService.signUp(authCredentialsDto);
  }

  @HttpCode(200)
  @Post('/signin')
  async signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @Res() response: Response,
    @Req() request: Request
  ): Promise<Response<number>> {
    const cookies = await this.authService.signIn(authCredentialsDto);

    request.res.setHeader('Set-Cookie', [...cookies]);

    return request.res.sendStatus(200);
  }

  @HttpCode(200)
  @Post('/signout')
  async signOut(
    @Res() response: Response,
  ): Promise<Response<number>> {
    const signOutCookies = await this.authService.signOut();

    response.setHeader('Set-Cookie', [...signOutCookies]);

    return response.sendStatus(200)
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refresh(
    @RequestWithUser() user,
    @Res() response: Response
  ) {
    const accessTokenCookie = await this.authService.getCookieWithJwtAccessToken(user.id);
 
    response.setHeader('Set-Cookie', accessTokenCookie);
    return user;
  }
}
