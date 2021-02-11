import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Resolver, Int, Query } from '@nestjs/graphql';

import { GqlJwtAuthGuard } from '@auth/graphql/guards';
import { GqlCustomer } from '../models';
import { CustomerService } from '../../services';

@Resolver((of) => GqlCustomer)
export class CustomerQueryResolver {
  constructor(private readonly customerService: CustomerService) {}

  @UseGuards(GqlJwtAuthGuard)
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
