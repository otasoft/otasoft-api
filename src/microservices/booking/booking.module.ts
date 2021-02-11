import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { createClientAsyncOptions } from '@utils/client';
import { BookingService } from './services';
import { BookingController } from './rest/booking.controller';
import { BookingMutationResolver } from './graphql/booking-mutation.resolver';
import { BookingQueryResolver } from './graphql/booking-query.resolver';

@Module({
  imports: [
    ClientsModule.registerAsync([
      createClientAsyncOptions('auth'),
      createClientAsyncOptions('booking'),
    ]),
  ],
  controllers: [BookingController],
  providers: [BookingService, BookingQueryResolver, BookingMutationResolver],
})
export class BookingModule {}
