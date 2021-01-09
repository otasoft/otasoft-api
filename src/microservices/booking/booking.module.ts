import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { BookingService } from './booking.service';
import { BookingController } from './rest/booking.controller';
import { BookingMutationResolver } from './graphql/booking-mutation.resolver';
import { BookingQueryResolver } from './graphql/booking-query.resolver';
import { createClientAsyncOptions } from '../../utils/client';

@Module({
  imports: [
    ClientsModule.registerAsync([
      createClientAsyncOptions('auth'),
      createClientAsyncOptions('booking'),
    ]),
  ],
  controllers: [BookingController],
  providers: [
    BookingService,
    BookingQueryResolver,
    BookingMutationResolver,
  ],
})
export class BookingModule {}
