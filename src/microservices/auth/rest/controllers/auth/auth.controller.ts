import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from '../../../services/auth/auth.service';
import { AuthCredentialsDto } from '../../dto';
import { RestAuthUserToken, RestAuthUser } from '../../models';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<RestAuthUser> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  async signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @Res() response: Response
  ): Promise<Response<RestAuthUserToken>> {
    const cookieObject = await this.authService.signIn(authCredentialsDto);

    response.setHeader('Set-Cookie', cookieObject.cookie);

    return response.send(cookieObject);
  }
}
