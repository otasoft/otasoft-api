import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../../../services/auth/auth.service';
import { AuthCredentialsDto } from '../../dto/auth-credentials.dto';
import { RestAuthUserToken } from '../../models/auth-user-token-rest.model';
import { RestAuthUser } from '../../models/auth-user-rest.model';

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
  ): Promise<RestAuthUserToken> {
    return this.authService.signIn(authCredentialsDto);
  }
}
