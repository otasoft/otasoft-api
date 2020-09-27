import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { Customer } from "./customer.model";
import { CustomerService } from "./customer.service";
import { CreateCustomerProfileInput } from "./dto/create-customer-profile.input";

@Resolver(of => Customer)
export class CustomerMutationResolver {
    constructor(
        private readonly customerService: CustomerService
    ) {}

    @Mutation(returns => Customer)
    async createCustomerProfile(
        @Args('createCustomerProfileData') createCustomerProfileData: CreateCustomerProfileInput,
    ): Promise<Customer> {
        const newCustomerProfile = await this.customerService.createCustomerProfile(createCustomerProfileData);

        return newCustomerProfile;
    }
}