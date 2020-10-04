import { UseGuards } from "@nestjs/common";
import { Args, Resolver, Query } from "@nestjs/graphql";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { AuthService } from "../auth.service";
import { AuthCredentialsInput } from "./input/auth-credentials.input";
import { GqlAuthUser } from "./models/auth-user-gql.model";
import { GqlAuthUserId } from "./models/auth-user-id-gql.model";

@Resolver(of => GqlAuthUser)
export class AuthQueryResolver {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Query(returns => GqlAuthUserId)
    async getUserId(
        @Args('authCredentials') authCredentialsInput: AuthCredentialsInput
    ): Promise<GqlAuthUserId> {
        return this.authService.getUserId(authCredentialsInput);
    }

    @Query(returns => Boolean)
    async confirmAccountCreation(@Args('token') token: string): Promise<boolean> {
        return this.authService.confirmAccountCreation(token);
    }
}