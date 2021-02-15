import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { createClientAsyncOptions } from '@utils/client';
import { BookingModule } from '@booking/booking.module';
import { BookingService } from '@booking/services';
import { PaymentService } from './services';
import { PaymentController } from './rest/controllers';
import { PaymentMutationResolver } from './graphql/payment-mutation.resolver';
import { PaymentQueryResolver } from './graphql/payment-query.resolver';

@Module({
  imports: [
    ClientsModule.registerAsync([
      createClientAsyncOptions('auth'),
      createClientAsyncOptions('payment'),
      createClientAsyncOptions('booking'),
    ]),
    BookingModule,
  ],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentQueryResolver, PaymentMutationResolver, BookingService],
})
export class PaymentModule {}
