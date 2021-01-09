import { ClientsModule } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';

import { CarsService } from '../../../services/cars/cars.service';
import { CarsController } from './cars.controller';
import { createClientAsyncOptions } from '../../../../../utils/client';
import { UtilsModule } from '../../../../../utils/utils.module';

describe('CarsController', () => {
  let controller: CarsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.registerAsync([createClientAsyncOptions('catalog')]),
        UtilsModule,
      ],
      controllers: [CarsController],
      providers: [CarsService],
    }).compile();

    controller = module.get<CarsController>(CarsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
