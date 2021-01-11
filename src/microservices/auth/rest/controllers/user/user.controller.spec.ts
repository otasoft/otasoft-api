import { ClientsModule } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';

import { UserService } from '../../../services/user/user.service';
import { UserController } from './user.controller';
import { createClientAsyncOptions } from '../../../../../utils/client';
import { UtilsModule } from '../../../../../utils/utils.module';
import { MailModule } from '../../../../mail/mail.module';

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
        UtilsModule,
        MailModule,
      ],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
