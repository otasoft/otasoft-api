import { UseGuards } from '@nestjs/common';
import { Args, Resolver, Int, Query } from '@nestjs/graphql';

import { GqlJwtAuthGuard } from '@auth/graphql/guards';
import { PaymentService } from '../../services';
import { GqlPayment } from '../models';

@Resolver((of) => GqlPayment)
export class PaymentQueryResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(GqlJwtAuthGuard)
  @Query((returns) => GqlPayment)
  async getPayment(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<GqlPayment> {
    return this.paymentService.getPaymentById(id);
  }
}
