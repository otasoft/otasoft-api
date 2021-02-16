import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { ClientService } from '@utils/client';
import { CreateBookingDto } from '../rest/dto';
import { RestBooking } from '../rest/models';

@Injectable()
export class BookingService {
  constructor(
    @Inject('BOOKING_MICROSERVICE')
    public readonly bookingClient: ClientProxy,
    private readonly clientService: ClientService,
  ) {}

  async getBookingById(id: number): Promise<RestBooking> {
    return this.clientService.sendMessageWithPayload(
      this.bookingClient,
      { role: 'booking', cmd: 'get' },
      id,
    );
  }

  async createBooking(newBooking: CreateBookingDto): Promise<RestBooking> {
    return this.clientService.sendMessageWithPayload(
      this.bookingClient,
      { role: 'booking', cmd: 'create' },
      newBooking,
    );
  }

  async updateBooking(
    id: number,
    updatedBooking: CreateBookingDto,
  ): Promise<RestBooking> {
    return this.clientService.sendMessageWithPayload(
      this.bookingClient,
      { role: 'booking', cmd: 'update' },
      { id, updatedBooking },
    );
  }

  async deleteBookingById(id: number): Promise<RestBooking> {
    return this.clientService.sendMessageWithPayload(
      this.bookingClient,
      { role: 'booking', cmd: 'remove' },
      id,
    );
  }
}
