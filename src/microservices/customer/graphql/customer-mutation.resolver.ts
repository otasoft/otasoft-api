import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlCustomer } from './models/customer-gql.model';
import { CustomerService } from '../customer.service';
import { CreateCustomerProfileInput } from './input/create-customer-profile.input';
import { UpdateCustomerProfileInput } from './input/update-customer-profile.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/microservices/auth/guards/jwt-auth.guard';

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

  @UseGuards(JwtAuthGuard)
  @Mutation((returns) => Boolean)
  async removeCustomerProfile(@Args('id') id: number): Promise<Boolean> {
    return this.customerService.removeCustomerProfile(id);
  }

  @UseGuards(JwtAuthGuard)
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
