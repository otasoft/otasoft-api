import { ClientsModule } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';

import { MicroserviceConnectionService } from '../../../utils/microservice-connection/microservice-connection.service';
import { BookingService } from '../booking.service';
import { BookingController } from './booking.controller';
import { createClientAsyncOptions } from '../../../utils/client';

describe('BookingController', () => {
  let controller: BookingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.registerAsync([
          createClientAsyncOptions('auth'),
          createClientAsyncOptions('booking'),
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
