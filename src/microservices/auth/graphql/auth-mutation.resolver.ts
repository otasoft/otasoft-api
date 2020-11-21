import { Args, Mutation, Resolver } from '@nestjs/graphql';
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
    @Args('authCredentials') authCredentialsInput: AuthCredentialsInput,
  ): Promise<GqlAuthUserToken> {
    return this.authService.signIn(authCredentialsInput);
  }
}
