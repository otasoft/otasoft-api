import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Resolver, Int, Query } from '@nestjs/graphql';
import { GqlJwtAuthGuard } from '../../auth/graphql/guards';
import { BookingService } from '../booking.service';
import { GqlBooking } from './models/booking-gql.model';

@Resolver((of) => GqlBooking)
export class BookingQueryResolver {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(GqlJwtAuthGuard)
  @Query((returns) => GqlBooking)
  async getBooking(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<GqlBooking> {
    const booking = await this.bookingService.getBookingById(id);

    if (!booking) {
      throw new NotFoundException('Customer with that id does not exist');
    }

    return booking;
  }
}
