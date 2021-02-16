import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { ClientService } from '@utils/client';
import { BookingService } from '@booking/services';
import { CreatePaymentInput } from '../graphql/input';
import { GqlPayment } from '../graphql/models';
import { CreatePaymentDto } from '../rest/dto';
import { RestPayment } from '../rest/models';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('PAYMENT_MICROSERVICE')
    public readonly paymentClient: ClientProxy,
    private readonly clientService: ClientService,
    private readonly bookingService: BookingService,
  ) {}

  async getPaymentById(id: number): Promise<RestPayment | GqlPayment> {
    return this.clientService.sendMessageWithPayload(
      this.paymentClient,
      { role: 'payment', cmd: 'get' },
      id,
    );
  }

  async createPayment(
    newPayment: CreatePaymentDto | CreatePaymentInput,
  ): Promise<RestPayment | GqlPayment> {
    const booking = this.bookingService.getBookingById(newPayment.booking_id);

    return this.clientService.sendMessageWithPayload(
      this.paymentClient,
      { role: 'payment', cmd: 'create' },
      { newPayment, booking },
    );
  }

  async updatePayment(
    id: number,
    updatedPayment: CreatePaymentDto | CreatePaymentInput,
  ): Promise<RestPayment | GqlPayment> {
    return this.clientService.sendMessageWithPayload(
      this.paymentClient,
      { role: 'payment', cmd: 'update' },
      { id, updatedPayment },
    );
  }
}
