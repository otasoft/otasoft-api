import { ClientsModule } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';

import { UtilsModule } from '../..//utils/utils.module';
import { createClientAsyncOptions } from '../../utils/client';
import { BookingModule } from '../booking/booking.module';
import { BookingService } from '../booking/booking.service';
import { PaymentService } from './payment.service';

describe('PaymentService', () => {
  let service: PaymentService;

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
      providers: [PaymentService, BookingService],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
