import {
  ClassSerializerInterceptor,
  HttpCode,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { GqlJwtAuthGuard, GqlJwtRefreshGuard } from '../guards';
import { UserModel } from '../../models';
import { AuthCredentialsInput } from '../input';
import { GqlCurrentUser } from '../decorators';
import { GqlAuthResponseStatus, GqlAuthUser, GqlUserModel } from '../models';
import { AuthService } from '../../services/auth/auth.service';

@UseInterceptors(ClassSerializerInterceptor)
@Resolver((of) => GqlAuthUser)
export class AuthMutationResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation((returns) => GqlAuthUser)
  async signUp(
    @Args('authCredentials') authCredentialsInput: AuthCredentialsInput,
  ): Promise<GqlAuthUser> {
    return this.authService.signUp(authCredentialsInput);
  }

  @HttpCode(200)
  @Mutation((returns) => GqlUserModel)
  async signIn(
    @Context() context,
    @Args('authCredentials') authCredentialsInput: AuthCredentialsInput,
  ): Promise<GqlUserModel> {
    const response = await this.authService.signIn(authCredentialsInput);

    context.res.setHeader('Set-Cookie', [...response.cookies]);

    return response.user;
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation((returns) => GqlAuthResponseStatus)
  async signOut(
    @GqlCurrentUser() user: UserModel,
    @Context() context: any,
  ): Promise<GqlAuthResponseStatus> {
    const signOutCookies = await this.authService.signOut(user.id);

    context.res.setHeader('Set-Cookie', [...signOutCookies]);

    return { status: 'Signed Out' };
  }

  @UseGuards(GqlJwtRefreshGuard)
  @Mutation((returns) => GqlUserModel)
  async refresh(@GqlCurrentUser() user: UserModel, @Context() context: any) {
    const accessTokenCookie = await this.authService.getCookieWithJwtAccessToken(
      user.id,
    );

    context.res.setHeader('Set-Cookie', accessTokenCookie);

    return user;
  }
}
