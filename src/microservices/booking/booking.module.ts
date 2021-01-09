import { Module } from '@nestjs/common';
import { BookingController } from './rest/booking.controller';
import { BookingService } from './booking.service';
import { ClientsModule } from '@nestjs/microservices';
import { connectMicroservice } from '../../utils/microservice-connection/microservice-connection';
import { BookingMutationResolver } from './graphql/booking-mutation.resolver';
import { BookingQueryResolver } from './graphql/booking-query.resolver';
import { MicroserviceConnectionService } from '../../utils/microservice-connection/microservice-connection.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      connectMicroservice('auth'),
      connectMicroservice('booking'),
    ]),
  ],
  controllers: [BookingController],
  providers: [
    BookingService,
    BookingQueryResolver,
    BookingMutationResolver,
    MicroserviceConnectionService,
  ],
})
export class BookingModule {}
