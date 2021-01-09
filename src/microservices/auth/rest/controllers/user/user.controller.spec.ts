import { ClientsModule } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';

import { MicroserviceConnectionService } from '../../../../../utils/microservice-connection/microservice-connection.service';
import { UserService } from '../../../services/user/user.service';
import { UserController } from './user.controller';
import { createClientAsyncOptions } from '../../../../../utils/client';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.registerAsync([
          createClientAsyncOptions('auth'),
          createClientAsyncOptions('customer'),
          createClientAsyncOptions('mail'),
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
