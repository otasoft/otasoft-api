import { Inject, Injectable, HttpException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { ClientService } from '../../utils/client';
import { CreatePaymentDto } from './rest/dto';
import { RestPayment } from './rest/models/payment-rest';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('PAYMENT_MICROSERVICE')
    public readonly paymentClient: ClientProxy,
    private readonly clientService: ClientService,
  ) {}

  async getPaymentById(id: number): Promise<RestPayment> {
    return this.clientService.sendMessageWithPayload(
      this.paymentClient,
      { role: 'payment', cmd: 'get' },
      id,
    );
  }

  async createPayment(newPayment: CreatePaymentDto): Promise<RestPayment> {
    return this.clientService.sendMessageWithPayload(
      this.paymentClient,
      { role: 'payment', cmd: 'create' },
      newPayment,
    );
  }

  async updatePayment(
    id: number,
    updatedPayment: CreatePaymentDto,
  ): Promise<RestPayment> {
    return this.clientService.sendMessageWithPayload(
      this.paymentClient,
      { role: 'payment', cmd: 'update' },
      { id, updatedPayment },
    );
  }
}
