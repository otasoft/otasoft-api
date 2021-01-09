import { ClientsModule } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';

import { MicroserviceConnectionService } from '../../../../utils/microservice-connection/microservice-connection.service';
import { UserService } from './user.service';
import { createClientAsyncOptions } from '../../../../utils/client';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.registerAsync([
          createClientAsyncOptions('auth'),
          createClientAsyncOptions('customer'),
          createClientAsyncOptions('mail'),
        ]),
      ],
      providers: [UserService, MicroserviceConnectionService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
