import { ClientsModule } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';

import { MicroserviceConnectionService } from '../../../../../utils/microservice-connection/microservice-connection.service';
import { AuthService } from '../../../services/auth/auth.service';
import { AuthController } from './auth.controller';
import { createClientAsyncOptions } from '../../../../../utils/client';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.registerAsync([
          createClientAsyncOptions('auth'),
          createClientAsyncOptions('customer'),
          createClientAsyncOptions('mail'),
        ]),
      ],
      controllers: [AuthController],
      providers: [AuthService, MicroserviceConnectionService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
