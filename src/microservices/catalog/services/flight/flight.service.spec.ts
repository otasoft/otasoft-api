import { ClientsModule } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';

import { FlightService } from './flight.service';
import { createClientAsyncOptions } from '../../../../utils/client';
import { UtilsModule } from '../../../../utils/utils.module';

describe('FlightService', () => {
  let service: FlightService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.registerAsync([createClientAsyncOptions('catalog')]),
        UtilsModule,
      ],
      providers: [FlightService],
    }).compile();

    service = module.get<FlightService>(FlightService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
