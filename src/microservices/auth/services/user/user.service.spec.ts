import { ClientsModule } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';

import { UserService } from './user.service';
import { createClientAsyncOptions } from '../../../../utils/client';
import { UtilsModule } from '../../../../utils/utils.module';

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
        UtilsModule
      ],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
