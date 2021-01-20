import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AccessControlGuard } from '../../guards/access-control.guard';
import {
  AuthEmailInput,
  ChangePasswordInput,
  SetNewPasswordInput,
} from '../input';
import { GqlAuthChangeResponse, GqlAuthUser } from '../models';
import { UserService } from '../../services/user/user.service';

@Resolver((of) => GqlAuthUser)
export class UserMutationResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AccessControlGuard)
  @Mutation((returns) => GqlAuthChangeResponse)
  async changeUserPassword(
    @Args('id') id: number,
    @Args('changePasswordInput') changePasswordInput: ChangePasswordInput,
  ): Promise<GqlAuthChangeResponse> {
    return this.userService.changeUserPassword(id, changePasswordInput);
  }

  @UseGuards(AccessControlGuard)
  @Mutation((returns) => GqlAuthChangeResponse)
  async deleteUserAccount(
    @Args('id') id: number,
  ): Promise<GqlAuthChangeResponse> {
    return this.userService.deleteUserAccount(id);
  }

  @Mutation((returns) => GqlAuthChangeResponse)
  async forgotPassword(
    @Args('email') authEmailInput: AuthEmailInput,
  ): Promise<GqlAuthChangeResponse> {
    return this.userService.forgotPassword(authEmailInput);
  }

  @Mutation((returns) => GqlAuthChangeResponse)
  async setNewPassword(
    @Args('token') token: string,
    @Args('setNewPasswordInput') setNewPasswordInput: SetNewPasswordInput,
  ): Promise<GqlAuthChangeResponse> {
    return this.userService.setNewPassword(token, setNewPasswordInput);
  }
}
