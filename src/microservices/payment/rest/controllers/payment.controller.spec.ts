import { ClientsModule } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';

import { createClientAsyncOptions } from '@utils/client';
import { UtilsModule } from '@utils/utils.module';
import { BookingModule } from '@booking/booking.module';
import { PaymentService } from '../../services';
import { PaymentController } from './payment.controller';

describe('PaymentController', () => {
  let controller: PaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.registerAsync([
          createClientAsyncOptions('auth'),
          createClientAsyncOptions('payment'),
          createClientAsyncOptions('booking'),
        ]),
        UtilsModule,
        BookingModule,
      ],
      controllers: [PaymentController],
      providers: [PaymentService],
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
