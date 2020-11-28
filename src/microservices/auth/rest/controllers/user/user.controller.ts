import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { AccessControlGuard } from '../../../guards/access-control.guard';
import { UserService } from '../../../services/user/user.service';
import { AuthEmailDto, ChangePasswordDto } from '../../dto';
import { RestAuthChangeResponse, RestAuthUserId } from '../../models';

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
}
