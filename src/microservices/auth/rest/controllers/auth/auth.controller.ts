import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from '../../../services/auth/auth.service';
import { AuthCredentialsDto } from '../../dto/auth-credentials.dto';
import { RestAuthUserToken } from '../../models/auth-user-token-rest.model';
import { RestAuthUser } from '../../models/auth-user-rest.model';
import { Response } from 'express';

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
