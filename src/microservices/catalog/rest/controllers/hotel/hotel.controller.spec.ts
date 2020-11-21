import { ClientsModule } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { HotelService } from '../../../services/hotel/hotel.service';
import { connectMicroservice } from '../../../../microservice-connection/microservice-connection';
import { HotelController } from './hotel.controller';
import { MicroserviceConnectionService } from '../../../../microservice-connection/microservice-connection.service';

describe('HotelController', () => {
  let controller: HotelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ClientsModule.registerAsync([connectMicroservice('catalog')])],
      controllers: [HotelController],
      providers: [HotelService, MicroserviceConnectionService],
    }).compile();

    controller = module.get<HotelController>(HotelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
