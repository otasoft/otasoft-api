import { ClientsModule } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { connectMicroservice } from '../../../microservice-connection/microservice-connection';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  // TODO: fix this test
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.registerAsync([
          connectMicroservice('auth'),
          connectMicroservice('customer'),
          connectMicroservice('mail'),
        ]),
      ],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
