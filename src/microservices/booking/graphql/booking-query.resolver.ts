import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Resolver, Int, Query } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/microservices/auth/guards/jwt-auth.guard';
import { BookingService } from '../booking.service';
import { GqlBooking } from './models/booking-gql.model';

@Resolver((of) => GqlBooking)
export class BookingQueryResolver {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(JwtAuthGuard)
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
