import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Resolver, Int, Query } from '@nestjs/graphql';

import { GqlJwtAuthGuard } from '../../auth/graphql/guards';
import { PaymentService } from '../payment.service';
import { GqlPayment } from './models/payment-gql.model';

@Resolver((of) => GqlPayment)
export class PaymentQueryResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(GqlJwtAuthGuard)
  @Query((returns) => GqlPayment)
  async getPayment(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<GqlPayment> {
    const payment = await this.paymentService.getPaymentById(id);

    if (!payment) {
      throw new NotFoundException('Payment with that id does not exist');
    }

    return payment;
  }
}
