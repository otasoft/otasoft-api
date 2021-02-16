import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { GqlJwtAuthGuard } from '@auth/graphql/guards';
import { GqlPayment } from '../models';
import { CreatePaymentInput } from '../input';
import { PaymentService } from '../../services';

@Resolver((of) => GqlPayment)
export class PaymentMutationResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(GqlJwtAuthGuard)
  @Mutation((returns) => GqlPayment)
  async createPayment(
    @Args('createPaymentData') createPaymentInput: CreatePaymentInput,
  ): Promise<GqlPayment> {
    return await this.paymentService.createPayment(createPaymentInput);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation((returns) => GqlPayment)
  async updatePayment(
    @Args('id') id: number,
    @Args('updatePaymentData') updatePaymentInput: CreatePaymentInput,
  ): Promise<GqlPayment> {
    return this.paymentService.updatePayment(id, updatePaymentInput);
  }
}
