import { UseGuards } from '@nestjs/common';
import { Args, Resolver, Query } from '@nestjs/graphql';

import { GqlAuthUser, GqlAuthUserId, GqlUserModel } from '../models';
import { AuthEmailInput } from '../input';
import { AccessControlGuard, GqlJwtAuthGuard } from '../../guards';
import { GqlCurrentUser } from '../../../../decorators/';
import { UserService } from '../../services/user/user.service';

@Resolver((of) => GqlAuthUser)
export class AuthQueryResolver {
  constructor(
    private readonly userService: UserService,
  ) {}

  @UseGuards(AccessControlGuard)
  @Query((returns) => GqlAuthUserId)
  async getUserId(
    @Args('email') authEmailInput: AuthEmailInput,
  ): Promise<GqlAuthUserId> {
    return this.userService.getUserId(authEmailInput);
  }

  @Query((returns) => Boolean)
  async confirmAccountCreation(@Args('token') token: string): Promise<boolean> {
    return this.userService.confirmAccountCreation(token);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Query(returns => GqlUserModel)
  authenticate(@GqlCurrentUser() user: GqlUserModel) {
    return user;
  }
}
