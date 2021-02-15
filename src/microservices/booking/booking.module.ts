import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { createClientAsyncOptions } from '@utils/client';
import { BookingService } from './services';
import { BookingController } from './rest/controllers';
import { BookingMutationResolver } from './graphql/mutations';
import { BookingQueryResolver } from './graphql/queries/';

@Module({
  imports: [
    ClientsModule.registerAsync([
      createClientAsyncOptions('auth'),
      createClientAsyncOptions('booking'),
    ]),
  ],
  controllers: [BookingController],
  providers: [BookingService, BookingQueryResolver, BookingMutationResolver],
  exports: [BookingService],
})
export class BookingModule {}
