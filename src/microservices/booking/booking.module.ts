import { Module } from '@nestjs/common';
import { BookingController } from './rest/booking.controller';
import { BookingService } from './booking.service';
import { ClientsModule } from '@nestjs/microservices';
import { connectMicroservice } from '../microservice-connection/microservice-connection';
import { BookingMutationResolver } from './graphql/booking-mutation.resolver';
import { BookingQueryResolver } from './graphql/booking-query.resolver';

@Module({
  imports: [
    ClientsModule.registerAsync([
      connectMicroservice('auth'),
      connectMicroservice('booking'),
    ]),
  ],
  controllers: [BookingController],
  providers: [BookingService, BookingQueryResolver, BookingMutationResolver],
})
export class BookingModule {}
