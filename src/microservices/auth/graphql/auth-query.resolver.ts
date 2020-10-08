import { UseGuards } from "@nestjs/common";
import { Args, Resolver, Query } from "@nestjs/graphql";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { AuthService } from "../auth.service";
import { GqlAuthUser } from "./models/auth-user-gql.model";
import { GqlAuthUserId } from "./models/auth-user-id-gql.model";
import { AuthEmailInput } from "./input/auth-email.input";

@Resolver(of => GqlAuthUser)
export class AuthQueryResolver {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Query(returns => GqlAuthUserId)
    async getUserId(
        @Args('email') authEmailInput: AuthEmailInput
    ): Promise<GqlAuthUserId> {
        return this.authService.getUserId(authEmailInput);
    }

    @Query(returns => Boolean)
    async confirmAccountCreation(
        @Args('token') token: string
    ): Promise<boolean> {
        return this.authService.confirmAccountCreation(token);
    }
}