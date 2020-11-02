import { ClientsModule } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { FlightService } from '../../../services/flight/flight.service';
import { connectMicroservice } from '../../../../microservice-connection/microservice-connection';
import { FlightController } from './flight.controller';
import { MicroserviceConnectionService } from '../../../../microservice-connection/microservice-connection.service';

describe('FlightController', () => {
  let controller: FlightController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ClientsModule.registerAsync([connectMicroservice('catalog')])],
      controllers: [FlightController],
      providers: [FlightService, MicroserviceConnectionService],
    }).compile();

    controller = module.get<FlightController>(FlightController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
