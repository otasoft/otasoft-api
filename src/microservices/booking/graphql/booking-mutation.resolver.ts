import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlBooking } from './models/booking-gql.model';
import { CreateBookingInput } from './input/create-booking.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/microservices/auth/guards/jwt-auth.guard';
import { BookingService } from '../booking.service';

@Resolver((of) => GqlBooking)
export class BookingMutationResolver {
  constructor(private readonly bookingService: BookingService) {}

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

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async deleteBooking(@Args('id') id: number): Promise<GqlBooking> {
    return this.bookingService.deleteBookingById(id);
  }

  @UseGuards(JwtAuthGuard)
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
