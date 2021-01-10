import { ClientsModule } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from '../../../services/auth/auth.service';
import { AuthController } from './auth.controller';
import { createClientAsyncOptions } from '../../../../../utils/client';
import { UtilsModule } from '../../../../../utils/utils.module';
import { MailModule } from '../../../../mail/mail.module';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.registerAsync([createClientAsyncOptions('auth')]),
        UtilsModule,
        MailModule,
      ],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
