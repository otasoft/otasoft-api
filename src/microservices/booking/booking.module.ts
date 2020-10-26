import { Module } from '@nestjs/common';
import { BookingController } from './rest/booking.controller';
import { BookingService } from './booking.service';
import { ClientsModule } from '@nestjs/microservices';
import { connectMicroservice } from '../microservice-connection/microservice-connection';

@Module({
  imports: [
    ClientsModule.registerAsync([
      connectMicroservice('auth'),
      connectMicroservice('booking'),
    ]),
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
