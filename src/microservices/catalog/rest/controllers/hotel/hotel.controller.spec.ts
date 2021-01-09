import { ClientsModule } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';

import { HotelService } from '../../../services/hotel/hotel.service';
import { HotelController } from './hotel.controller';
import { createClientAsyncOptions } from '../../../../../utils/client';
import { UtilsModule } from '../../../../../utils/utils.module';

describe('HotelController', () => {
  let controller: HotelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.registerAsync([createClientAsyncOptions('catalog')]),
        UtilsModule,
      ],
      controllers: [HotelController],
      providers: [HotelService],
    }).compile();

    controller = module.get<HotelController>(HotelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
