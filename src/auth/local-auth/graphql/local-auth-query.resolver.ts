import { UseGuards } from "@nestjs/common";
import { Args, Resolver, Query } from "@nestjs/graphql";
import { LocalJwtAuthGuard } from "../guards/local-jwt-auth.guard";
import { LocalAuthService } from "../local-auth.service";
import { LocalAuthCredentialsInput } from "./input/local-auth-credentials.input";
import { GqlLocalAuthUser } from "./models/local-auth-user-gql.model";
import { GqlLocalAuthUserId } from "./models/local-auth-user-id-gql.model";

@Resolver(of => GqlLocalAuthUser)
export class LocalAuthQueryResolver {
    constructor(
        private readonly localAuthService: LocalAuthService,
    ) {}

    @UseGuards(LocalJwtAuthGuard)
    @Query(returns => GqlLocalAuthUserId)
    async getUserId(
        @Args('authCredentials') localAuthCredentialsInput: LocalAuthCredentialsInput
    ): Promise<GqlLocalAuthUserId> {
        return this.localAuthService.getUserId(localAuthCredentialsInput);
    }

    @Query(returns => Boolean)
    async confirmAccountCreation(@Args('token') token: string): Promise<boolean> {
        return this.localAuthService.confirmAccountCreation(token);
    }
}