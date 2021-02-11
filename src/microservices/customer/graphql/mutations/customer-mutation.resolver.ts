import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { GqlJwtAuthGuard } from '@auth/graphql/guards';
import { GqlCustomer } from '../models';
import { CustomerService } from '../../services';
import {
  CreateCustomerProfileInput,
  UpdateCustomerProfileInput,
} from '../input';

@Resolver((of) => GqlCustomer)
export class CustomerMutationResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Mutation((returns) => GqlCustomer)
  async createCustomerProfile(
    @Args('createCustomerProfileData')
    createCustomerProfileInput: CreateCustomerProfileInput,
  ): Promise<GqlCustomer> {
    const newCustomerProfile = await this.customerService.createCustomerProfile(
      createCustomerProfileInput,
    );

    return newCustomerProfile;
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation((returns) => Boolean)
  async removeCustomerProfile(@Args('id') id: number): Promise<Boolean> {
    return this.customerService.removeCustomerProfile(id);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation((returns) => GqlCustomer)
  async updateCustomerProfile(
    @Args('id') id: number,
    @Args('updateCustomerProfileData')
    updateCustomerProfileInput: UpdateCustomerProfileInput,
  ): Promise<GqlCustomer> {
    const updatedCustomerProfile = await this.customerService.updateCustomerProfile(
      id,
      updateCustomerProfileInput,
    );

    return updatedCustomerProfile;
  }
}
