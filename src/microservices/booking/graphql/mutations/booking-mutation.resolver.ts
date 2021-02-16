import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { GqlJwtAuthGuard } from '@auth/graphql/guards';
import { GqlBookingModel } from '../models';
import { CreateBookingInput } from '../input/';
import { BookingService } from '../../services';

@Resolver((of) => GqlBookingModel)
export class BookingMutationResolver {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(GqlJwtAuthGuard)
  @Mutation((returns) => GqlBookingModel)
  async createBooking(
    @Args('createBookingData')
    createBookingInput: CreateBookingInput,
  ): Promise<GqlBookingModel> {
    const newBooking = await this.bookingService.createBooking(
      createBookingInput,
    );

    return newBooking;
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Boolean)
  async deleteBookingById(@Args('id') id: number): Promise<GqlBookingModel> {
    return this.bookingService.deleteBookingById(id);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation((returns) => GqlBookingModel)
  async updateBooking(
    @Args('id') id: number,
    @Args('updateBookingData')
    updateCustomerProfileInput: CreateBookingInput,
  ): Promise<GqlBookingModel> {
    const updatedCustomerProfile = await this.bookingService.updateBooking(
      id,
      updateCustomerProfileInput,
    );

    return updatedCustomerProfile;
  }
}
