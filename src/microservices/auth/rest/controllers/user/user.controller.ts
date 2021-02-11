import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { AccessControlGuard } from '../../../guards';
import { UserService } from '../../../services/user/user.service';
import {
  AuthCredentialsDto,
  AuthEmailDto,
  ChangePasswordDto,
  SetNewPasswordDto,
} from '../../dto';
import {
  RestAuthChangeResponse,
  RestAuthUser,
  RestAuthUserId,
} from '../../models';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AccessControlGuard)
  @Get('/get-user-id')
  async getUserId(
    @Query('email') email: AuthEmailDto,
  ): Promise<RestAuthUserId> {
    return this.userService.getUserId(email);
  }

  @Get('/get-authenticated-user')
  async getAuthenticatedUser(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<RestAuthUser> {
    return this.userService.getAuthenticatedUser(authCredentialsDto);
  }

  @UseGuards(AccessControlGuard)
  @Put('/:id/change-user-password')
  async changeUserPassword(
    @Param('id') id: number,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<RestAuthChangeResponse> {
    return this.userService.changeUserPassword(id, changePasswordDto);
  }

  @UseGuards(AccessControlGuard)
  @Delete('/:id/delete-user-account')
  async deleteUserAccount(
    @Param('id') id: number,
  ): Promise<RestAuthChangeResponse> {
    return this.userService.deleteUserAccount(id);
  }

  @Get('/confirm/:token')
  async confirmAccountCreation(
    @Param('token') token: string,
  ): Promise<boolean> {
    return this.userService.confirmAccountCreation(token);
  }

  @Post('/forgot-password')
  async forgotPassword(
    @Body() authEmailDto: AuthEmailDto,
  ): Promise<RestAuthChangeResponse> {
    return this.userService.forgotPassword(authEmailDto);
  }

  @Post('/set-new-password/:token')
  async setNewPassword(
    @Param('token') token: string,
    @Body() setNewPasswordDto: SetNewPasswordDto,
  ): Promise<RestAuthChangeResponse> {
    return this.userService.setNewPassword(token, setNewPasswordDto);
  }
}
