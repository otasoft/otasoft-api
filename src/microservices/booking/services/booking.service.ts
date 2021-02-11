import { Inject, Injectable, HttpException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CreateBookingDto } from '../rest/dto';
import { RestBooking } from '../rest/models';

@Injectable()
export class BookingService {
  constructor(
    @Inject('BOOKING_MICROSERVICE')
    public readonly bookingClient: ClientProxy,
  ) {}

  async getBookingById(id: number): Promise<RestBooking> {
    try {
      const booking = await this.bookingClient
        .send({ role: 'booking', cmd: 'get' }, id)
        .toPromise();

      return booking;
    } catch (error) {
      throw new HttpException(error.errorStatus, error.statusCode);
    }
  }

  async createBooking(newBooking: CreateBookingDto): Promise<RestBooking> {
    try {
      const booking = await this.bookingClient
        .send({ role: 'booking', cmd: 'create' }, newBooking)
        .toPromise();

      return booking;
    } catch (error) {
      throw new HttpException(error.errorStatus, error.statusCode);
    }
  }

  async updateBooking(
    id: number,
    updatedBooking: CreateBookingDto,
  ): Promise<RestBooking> {
    try {
      const booking = await this.bookingClient
        .send({ role: 'booking', cmd: 'update' }, { id, updatedBooking })
        .toPromise();

      return booking;
    } catch (error) {
      throw new HttpException(error.errorStatus, error.statusCode);
    }
  }

  async deleteBookingById(id: number): Promise<RestBooking> {
    try {
      const booking = await this.bookingClient
        .send({ role: 'booking', cmd: 'remove' }, id)
        .toPromise();

      return booking;
    } catch (error) {
      throw new HttpException(error.errorStatus, error.statusCode);
    }
  }
}
