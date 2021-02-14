import { ClientsModule } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';

import { PaymentService } from '../payment.service';
import { PaymentController } from './payment.controller';
import { createClientAsyncOptions } from '../../../utils/client';
import { UtilsModule } from '../../../utils/utils.module';
import { BookingModule } from '../../../microservices/booking/booking.module';
import { BookingService } from '../../../microservices/booking/services/booking.service';

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
        BookingModule
      ],
      controllers: [PaymentController],
      providers: [PaymentService, BookingService],
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
