import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthService } from "../auth.service";
import { AuthCredentialsInput } from "./input/auth-credentials.input";
import { ChangePasswordInput } from "./input/change-password.input";
import { GqlAuthChangeResponse } from "./models/auth-change-response-gql.model";
import { GqlAuthUser } from "./models/auth-user-gql.model";
import { GqlAuthUserToken } from "./models/auth-user-token-gql.model";

@Resolver(of => GqlAuthUser)
export class AuthMutationResolver {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Mutation(returns => GqlAuthUser)
    async signUp(
        @Args('authCredentials') authCredentialsInput: AuthCredentialsInput
    ): Promise<GqlAuthUser> {
        return this.authService.signUp(authCredentialsInput);
    }

    @Mutation(returns => GqlAuthUserToken)
    async signIn(
        @Args('authCredentials') authCredentialsInput: AuthCredentialsInput
    ): Promise<GqlAuthUserToken> {
        return this.authService.signIn(authCredentialsInput);
    }

    @Mutation(returns => GqlAuthChangeResponse)
    async changeUserPassword(
        @Args('id') id: number,
        @Args('changePasswordInput') changePasswordInput: ChangePasswordInput
    ): Promise<GqlAuthChangeResponse> {
        return this.authService.changeUserPassword(id, changePasswordInput);
    }
}