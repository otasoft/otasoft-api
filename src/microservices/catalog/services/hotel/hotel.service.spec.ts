import { ClientsModule } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';

import { MicroserviceConnectionService } from '../../../../utils/microservice-connection/microservice-connection.service';
import { HotelService } from './hotel.service';
import { createClientAsyncOptions } from '../../../../utils/client';

describe('HotelService', () => {
  let service: HotelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ClientsModule.registerAsync([createClientAsyncOptions('catalog')])],
      providers: [HotelService, MicroserviceConnectionService],
    }).compile();

    service = module.get<HotelService>(HotelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
