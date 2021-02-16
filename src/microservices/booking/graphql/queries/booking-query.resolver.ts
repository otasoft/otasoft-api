import { UseGuards } from '@nestjs/common';
import { Args, Resolver, Int, Query } from '@nestjs/graphql';

import { GqlJwtAuthGuard } from '@auth/graphql/guards';
import { BookingService } from '../../services';
import { GqlBookingModel } from '../models';

@Resolver((of) => GqlBookingModel)
export class BookingQueryResolver {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(GqlJwtAuthGuard)
  @Query((returns) => GqlBookingModel)
  async getBookingById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<GqlBookingModel> {
    return this.bookingService.getBookingById(id);
  }
}
