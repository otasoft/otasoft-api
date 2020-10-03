import { Args, Mutation } from "@nestjs/graphql";
import { LocalAuthService } from "../local-auth.service";
import { LocalAuthCredentialsInput } from "./input/local-auth-credentials.input";
import { GqlLocalAuthUserToken } from "./models/local-auth-user-token-gql.model";

export class LocalAuthMutationResolver {
    constructor(
        private readonly localAuthService: LocalAuthService,
    ) {}

    @Mutation()
    async signUp(
        @Args('authCredentials') localAtuhCredentialsInput: LocalAuthCredentialsInput
    ): Promise<void> {
        return this.localAuthService.signUp(localAtuhCredentialsInput)
    }

    @Mutation(returns => GqlLocalAuthUserToken)
    async signIn(
        @Args('authCredentials') localAuthCredentialsInput: LocalAuthCredentialsInput
    ): Promise<GqlLocalAuthUserToken> {
        return this.localAuthService.signIn(localAuthCredentialsInput)
    }
}