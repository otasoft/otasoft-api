import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { RestAuthUserToken } from './models/auth-user-token-rest.model';
import { RestAuthUserId } from './models/auth-user-id-rest.model';
import { RestAuthUser } from './models/auth-user-rest.model';
import { RestAuthChangeResponse } from './models/auth-change-response-rest.model';
import { AuthEmailDto } from './dto/auth-email.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

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

  @UseGuards(JwtAuthGuard)
  @Get('/get-user-id')
  async getUserId(
    @Query('email') email: AuthEmailDto,
  ): Promise<RestAuthUserId> {
    return this.authService.getUserId(email);
  }

  @Get('/confirm/:token')
  async confirmAccountCreation(
    @Param('token') token: string,
  ): Promise<boolean> {
    return this.authService.confirmAccountCreation(token);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id/change-user-password')
  async changeUserPassword(
    @Param('id') id: number,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<RestAuthChangeResponse> {
    return this.authService.changeUserPassword(id, changePasswordDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id/delete-user-account')
  async deleteUserAccount(
    @Param('id') id: number,
  ): Promise<RestAuthChangeResponse> {
    return this.authService.deleteUserAccount(id);
  }
}
