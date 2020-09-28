import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { GqlCustomer } from "./models/customer-gql.model";
import { CustomerService } from "../customer.service";
import { CreateCustomerProfileInput } from "./input/create-customer-profile.input";

@Resolver(of => GqlCustomer)
export class CustomerMutationResolver {
    constructor(
        private readonly customerService: CustomerService
    ) {}

    @Mutation(returns => GqlCustomer)
    async createCustomerProfile(
        @Args('createCustomerProfileData') createCustomerProfileInput: CreateCustomerProfileInput,
    ): Promise<GqlCustomer> {
        const newCustomerProfile = await this.customerService.createCustomerProfile(createCustomerProfileInput);

        return newCustomerProfile;
    }

    @Mutation(returns => Boolean)
    async removeCustomerProfile(
        @Args('id') id: number
    ): Promise<Boolean> {
        return this.customerService.removeCustomerProfile(id);
    }
}