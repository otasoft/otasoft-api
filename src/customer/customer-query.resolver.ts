import { Args, Resolver, Int, Query } from "@nestjs/graphql";
import { Customer } from "./customer.model";
import { CustomerService } from "./customer.service";

@Resolver(of => Customer)
export class CustomerQueryResolver {
    constructor(
        private readonly customerService: CustomerService,
    ) {}

    @Query(returns => Customer)
    async getCustomerProfile(@Args('id', { type: () => Int}) id: number) {
        return this.customerService.getCustomerProfile(id);
    }
}