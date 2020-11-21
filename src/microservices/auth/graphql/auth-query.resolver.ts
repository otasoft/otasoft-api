import { UseGuards } from '@nestjs/common';
import { Args, Resolver, Query } from '@nestjs/graphql';
import { AuthService } from '../services/auth/auth.service';
import { GqlAuthUser } from './models/auth-user-gql.model';
import { GqlAuthUserId } from './models/auth-user-id-gql.model';
import { AuthEmailInput } from './input/auth-email.input';
import { AccessControlGuard } from '../guards/access-control.guard';
import { UserService } from '../services/user/user.service';

@Resolver((of) => GqlAuthUser)
export class AuthQueryResolver {
  constructor(
    private readonly authService: AuthService,
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
}
