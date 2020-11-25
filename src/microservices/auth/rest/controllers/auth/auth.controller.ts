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

import { JwtAuthGuard, LocalAuthGuard } from '../../../guards';
import { RequestWithUser } from '../../../../../decorators';
import { JwtRefreshGuard } from '../../../guards/jwt-refresh.guard';
import { AuthService } from '../../../services/auth/auth.service';
import { AuthCredentialsDto } from '../../dto';
import { RestAuthUser } from '../../models';
import { IRequestWithUser } from '../../../interfaces';
import { UserModel } from 'src/microservices/auth/models';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  authenticate(@RequestWithUser() user: UserModel) {
    return user;
  }

  @Post('/signup')
  async signUp(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<RestAuthUser> {
    return this.authService.signUp(authCredentialsDto);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @Req() request: IRequestWithUser,
  ): Promise<UserModel> {
    const cookies = await this.authService.signIn(authCredentialsDto);

    request.res.setHeader('Set-Cookie', [...cookies]);

    return request.user;
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('/signout')
  async signOut(@Req() req: IRequestWithUser): Promise<void> {
    const signOutCookies = await this.authService.signOut(req.user.id);

    req.res.setHeader('Set-Cookie', [...signOutCookies]);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refresh(@Req() req: IRequestWithUser) {
    const accessTokenCookie = await this.authService.getCookieWithJwtAccessToken(
      req.user.id,
    );

    req.res.setHeader('Set-Cookie', accessTokenCookie);
    return req.user;
  }
}
