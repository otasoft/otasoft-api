import { Args, Context, GraphQLExecutionContext, Mutation, Resolver } from '@nestjs/graphql';
import { Response } from 'express';
import { AuthService } from '../services/auth/auth.service';
import { AuthCredentialsInput } from './input/auth-credentials.input';
import { GqlAuthUser } from './models/auth-user-gql.model';
import { GqlAuthUserToken } from './models/auth-user-token-gql.model';

@Resolver((of) => GqlAuthUser)
export class AuthMutationResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation((returns) => GqlAuthUser)
  async signUp(
    @Args('authCredentials') authCredentialsInput: AuthCredentialsInput,
  ): Promise<GqlAuthUser> {
    return this.authService.signUp(authCredentialsInput);
  }

  @Mutation((returns) => GqlAuthUserToken)
  async signIn(
    @Context() context,
    @Args('authCredentials') authCredentialsInput: AuthCredentialsInput,
  ): Promise<GqlAuthUserToken> {

    const cookieObject = await this.authService.signIn(authCredentialsInput);

    context.res.setHeader('Set-Cookie', cookieObject.cookie);

    return cookieObject
  }
}
