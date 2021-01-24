import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { PaymentService } from './payment.service';
import { PaymentController } from './rest/payment.controller';
import { PaymentMutationResolver } from './graphql/payment-mutation.resolver';
import { PaymentQueryResolver } from './graphql/payment-query.resolver';
import { createClientAsyncOptions } from '../../utils/client';

@Module({
  imports: [
    ClientsModule.registerAsync([
      createClientAsyncOptions('auth'),
      createClientAsyncOptions('payment'),
    ]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentQueryResolver, PaymentMutationResolver],
})
export class PaymentModule {}
