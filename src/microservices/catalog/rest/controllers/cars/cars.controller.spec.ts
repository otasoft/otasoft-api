import { ClientsModule } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { CarsService } from '../../../services/cars/cars.service';
import { connectMicroservice } from '../../../../microservice-connection/microservice-connection';
import { CarsController } from './cars.controller';
import { MicroserviceConnectionService } from '../../../../microservice-connection/microservice-connection.service';

describe('CarsController', () => {
  let controller: CarsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ClientsModule.registerAsync([connectMicroservice('catalog')])],
      controllers: [CarsController],
      providers: [CarsService, MicroserviceConnectionService],
    }).compile();

    controller = module.get<CarsController>(CarsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
