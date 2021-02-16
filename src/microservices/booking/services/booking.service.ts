import { GqlBookingModel } from '@booking/graphql/models';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { ClientService } from '@utils/client';
import { CreateBookingInput } from '../graphql/input';
import { CreateBookingDto } from '../rest/dto';
import { RestBookingModel } from '../rest/models';

@Injectable()
export class BookingService {
  constructor(
    @Inject('BOOKING_MICROSERVICE')
    public readonly bookingClient: ClientProxy,
    private readonly clientService: ClientService,
  ) {}

  async getBookingById(id: number): Promise<RestBookingModel> {
    return this.clientService.sendMessageWithPayload(
      this.bookingClient,
      { role: 'booking', cmd: 'get' },
      id,
    );
  }

  async createBooking(
    newBooking: CreateBookingDto | CreateBookingInput,
  ): Promise<RestBookingModel | GqlBookingModel> {
    return this.clientService.sendMessageWithPayload(
      this.bookingClient,
      { role: 'booking', cmd: 'create' },
      newBooking,
    );
  }

  async updateBooking(
    id: number,
    updatedBooking: CreateBookingDto | CreateBookingInput,
  ): Promise<RestBookingModel | GqlBookingModel> {
    return this.clientService.sendMessageWithPayload(
      this.bookingClient,
      { role: 'booking', cmd: 'update' },
      { id, updatedBooking },
    );
  }

  async deleteBookingById(
    id: number,
  ): Promise<RestBookingModel | GqlBookingModel> {
    return this.clientService.sendMessageWithPayload(
      this.bookingClient,
      { role: 'booking', cmd: 'remove' },
      id,
    );
  }
}
