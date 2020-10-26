import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RestBooking } from './rest/models/booking-rest';

@Injectable()
export class BookingService {
    constructor(
        @Inject('BOOKING_MICROSERVICE')
        public readonly bookingClient: ClientProxy,
    ) {}

    async getBookingById(id: number): Promise<RestBooking> {
        const booking = await this.bookingClient
            .send({role: 'booking', cmd: 'get'}, id)
            .toPromise()

        return booking
    }
}
