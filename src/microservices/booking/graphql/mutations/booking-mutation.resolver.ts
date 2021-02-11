import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { GqlJwtAuthGuard } from '@auth/graphql/guards';
import { GqlBooking } from '../models';
import { CreateBookingInput } from '../input/';
import { BookingService } from '../../services';

@Resolver((of) => GqlBooking)
export class BookingMutationResolver {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(GqlJwtAuthGuard)
  @Mutation((returns) => GqlBooking)
  async createBooking(
    @Args('createBookingData')
    createBookingInput: CreateBookingInput,
  ): Promise<GqlBooking> {
    const newBooking = await this.bookingService.createBooking(
      createBookingInput,
    );

    return newBooking;
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Boolean)
  async deleteBooking(@Args('id') id: number): Promise<GqlBooking> {
    return this.bookingService.deleteBookingById(id);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation((returns) => GqlBooking)
  async updateBooking(
    @Args('id') id: number,
    @Args('updateBookingData')
    updateCustomerProfileInput: CreateBookingInput,
  ): Promise<GqlBooking> {
    const updatedCustomerProfile = await this.bookingService.updateBooking(
      id,
      updateCustomerProfileInput,
    );

    return updatedCustomerProfile;
  }
}
