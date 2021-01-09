import { ClientsModule } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { MicroserviceConnectionService } from '../../../../utils/microservice-connection/microservice-connection.service';
import { connectMicroservice } from '../../../../utils/microservice-connection/microservice-connection';
import { HotelService } from './hotel.service';

describe('HotelService', () => {
  let service: HotelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ClientsModule.registerAsync([connectMicroservice('catalog')])],
      providers: [HotelService, MicroserviceConnectionService],
    }).compile();

    service = module.get<HotelService>(HotelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
