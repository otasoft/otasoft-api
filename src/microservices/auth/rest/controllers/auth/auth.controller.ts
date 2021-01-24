import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  HttpCode,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { RestJwtAuthGuard, RestJwtRefreshGuard } from '../../guards';
import { RestCurrentUser, RestCsrfToken } from '../../decorators';
import { AuthCredentialsDto } from '../../dto';
import { RestAuthChangeResponse, RestAuthUser } from '../../models';
import { IRequestWithUser } from '../../interfaces';
import { UserModel } from '../../../models';
import { AuthService } from '../../../services/auth/auth.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(RestJwtAuthGuard)
  @Get()
  authenticate(@RestCurrentUser() user: UserModel, @RestCsrfToken() csrfToken) {
    return {
      user,
      csrfToken,
    };
  }

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
    @Req() request: IRequestWithUser,
  ): Promise<UserModel> {
    const response = await this.authService.signIn(authCredentialsDto);

    request.res.setHeader('Set-Cookie', [...response.cookies]);

    return response.user;
  }

  @UseGuards(RestJwtAuthGuard)
  @HttpCode(200)
  @Post('/signout')
  async signOut(@Req() req: IRequestWithUser): Promise<RestAuthChangeResponse> {
    const signOutCookies = await this.authService.signOut(req.user.id);

    req.res.setHeader('Set-Cookie', [...signOutCookies]);

    return { response: 'Signed Out' };
  }

  @UseGuards(RestJwtRefreshGuard)
  @Get('refresh')
  async refresh(@Req() req: IRequestWithUser): Promise<UserModel> {
    const accessTokenCookie = await this.authService.getCookieWithJwtAccessToken(
      req.user.id,
    );

    req.res.setHeader('Set-Cookie', accessTokenCookie);

    return req.user;
  }
}
