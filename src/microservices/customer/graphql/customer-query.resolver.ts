import { NotFoundException } from '@nestjs/common';
import { Args, Resolver, Int, Query } from '@nestjs/graphql';
import { GqlCustomer } from './models/customer-gql.model';
import { CustomerService } from '../customer.service';

@Resolver((of) => GqlCustomer)
export class CustomerQueryResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query((returns) => GqlCustomer)
  async getCustomerProfile(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<GqlCustomer> {
    const customer = await this.customerService.getCustomerProfile(id);

    if (!customer) {
      throw new NotFoundException('Customer with that id does not exist');
    }

    return customer;
  }
}
