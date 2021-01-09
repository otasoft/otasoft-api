import { ClientsModule } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';

import { FlightService } from '../../../services/flight/flight.service';
import { FlightController } from './flight.controller';
import { MicroserviceConnectionService } from '../../../../../utils/microservice-connection/microservice-connection.service';
import { createClientAsyncOptions } from '../../../../../utils/client';

describe('FlightController', () => {
  let controller: FlightController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ClientsModule.registerAsync([createClientAsyncOptions('catalog')])],
      controllers: [FlightController],
      providers: [FlightService, MicroserviceConnectionService],
    }).compile();

    controller = module.get<FlightController>(FlightController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
