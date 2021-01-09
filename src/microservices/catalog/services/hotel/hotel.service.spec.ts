import { ClientsModule } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';

import { HotelService } from './hotel.service';
import { createClientAsyncOptions } from '../../../../utils/client';
import { UtilsModule } from '../../../../utils/utils.module';

describe('HotelService', () => {
  let service: HotelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.registerAsync([createClientAsyncOptions('catalog')]),
        UtilsModule,
      ],
      providers: [HotelService],
    }).compile();

    service = module.get<HotelService>(HotelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
