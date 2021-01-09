import { ClientsModule } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';

import { MicroserviceConnectionService } from '../../../../utils/microservice-connection/microservice-connection.service';
import { FlightService } from './flight.service';
import { createClientAsyncOptions } from '../../../../utils/client';

describe('FlightService', () => {
  let service: FlightService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ClientsModule.registerAsync([createClientAsyncOptions('catalog')])],
      providers: [FlightService, MicroserviceConnectionService],
    }).compile();

    service = module.get<FlightService>(FlightService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
