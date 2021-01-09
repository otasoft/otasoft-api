import { ClientsModule } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';

import { HotelService } from '../../../services/hotel/hotel.service';
import { HotelController } from './hotel.controller';
import { MicroserviceConnectionService } from '../../../../../utils/microservice-connection/microservice-connection.service';
import { createClientAsyncOptions } from '../../../../../utils/client';

describe('HotelController', () => {
  let controller: HotelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ClientsModule.registerAsync([createClientAsyncOptions('catalog')])],
      controllers: [HotelController],
      providers: [HotelService, MicroserviceConnectionService],
    }).compile();

    controller = module.get<HotelController>(HotelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
