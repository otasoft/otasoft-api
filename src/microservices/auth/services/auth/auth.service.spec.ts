import { ClientsModule } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';

import { MicroserviceConnectionService } from '../../../../utils/microservice-connection/microservice-connection.service';
import { AuthService } from './auth.service';
import { createClientAsyncOptions } from '../../../../utils/client';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.registerAsync([
          createClientAsyncOptions('auth'),
          createClientAsyncOptions('customer'),
          createClientAsyncOptions('mail'),
        ]),
      ],
      providers: [AuthService, MicroserviceConnectionService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
