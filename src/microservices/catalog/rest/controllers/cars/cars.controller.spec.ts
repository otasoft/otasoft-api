import { ClientsModule } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';

import { CarsService } from '../../../services/cars/cars.service';
import { CarsController } from './cars.controller';
import { MicroserviceConnectionService } from '../../../../../utils/microservice-connection/microservice-connection.service';
import { createClientAsyncOptions } from '../../../../../utils/client';

describe('CarsController', () => {
  let controller: CarsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ClientsModule.registerAsync([createClientAsyncOptions('catalog')])],
      controllers: [CarsController],
      providers: [CarsService, MicroserviceConnectionService],
    }).compile();

    controller = module.get<CarsController>(CarsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
