import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AccessControlGuard } from '../guards/access-control.guard';
import { ChangePasswordInput } from './input/change-password.input';
import { GqlAuthChangeResponse } from './models/auth-change-response-gql.model';
import { GqlAuthUser } from './models/auth-user-gql.model';
import { UserService } from '../services/user/user.service';

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
}
