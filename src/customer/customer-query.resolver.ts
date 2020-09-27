import { NotFoundException } from "@nestjs/common";
import { Args, Resolver, Int, Query } from "@nestjs/graphql";
import { Customer } from "./customer.model";
import { CustomerService } from "./customer.service";

@Resolver(of => Customer)
export class CustomerQueryResolver {
    constructor(
        private readonly customerService: CustomerService,
    ) {}

    @Query(returns => Customer)
    async getCustomerProfile(@Args('id', { type: () => Int }) id: number): Promise<Customer> {
        const customer = await this.customerService.getCustomerProfile(id);

        if (!customer) {
            throw new NotFoundException('Customer with that id does not exist');
        }

        return customer;
    }
}