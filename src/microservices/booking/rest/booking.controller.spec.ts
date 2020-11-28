import { ClientsModule } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { MicroserviceConnectionService } from '../../microservice-connection/microservice-connection.service';
import { connectMicroservice } from '../../microservice-connection/microservice-connection';
import { BookingService } from '../booking.service';
import { BookingController } from './booking.controller';

describe('BookingController', () => {
  let controller: BookingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.registerAsync([
          connectMicroservice('auth'),
          connectMicroservice('booking'),
        ]),
      ],
      controllers: [BookingController],
      providers: [BookingService, MicroserviceConnectionService],
    }).compile();

    controller = module.get<BookingController>(BookingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
