import { ClientsModule } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';

import { createClientAsyncOptions } from '@utils/client';
import { CustomerService } from '../../services';
import { CustomerController } from './customer.controller';

describe('CustomerController', () => {
  let controller: CustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.registerAsync([
          createClientAsyncOptions('auth'),
          createClientAsyncOptions('customer'),
        ]),
      ],
      controllers: [CustomerController],
      providers: [CustomerService],
    }).compile();

    controller = module.get<CustomerController>(CustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
