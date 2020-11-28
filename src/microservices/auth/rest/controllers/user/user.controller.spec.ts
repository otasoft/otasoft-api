import { ClientsModule } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';

import { MicroserviceConnectionService } from '../../../../microservice-connection/microservice-connection.service';
import { UserService } from '../../../services/user/user.service';
import { connectMicroservice } from '../../../../microservice-connection/microservice-connection';
import { UserController } from './user.controller';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.registerAsync([
          connectMicroservice('auth'),
          connectMicroservice('customer'),
          connectMicroservice('mail'),
        ]),
      ],
      controllers: [UserController],
      providers: [UserService, MicroserviceConnectionService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
