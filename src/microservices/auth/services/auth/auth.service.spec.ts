import { ClientsModule } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';

import { MicroserviceConnectionService } from '../../../microservice-connection/microservice-connection.service';
import { connectMicroservice } from '../../../microservice-connection/microservice-connection';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.registerAsync([
          connectMicroservice('auth'),
          connectMicroservice('customer'),
          connectMicroservice('mail'),
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
