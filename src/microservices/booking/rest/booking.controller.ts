import {
    Controller,
    Param,
    Get,
    UseGuards,
} from '@nestjs/common';
import { BookingService } from '../booking.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RestBooking } from './models/booking-rest';

@Controller('booking')
export class BookingController {
    constructor(private readonly bookingService: BookingService) { }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    async getBookingById(@Param('id') id: number): Promise<RestBooking> {
        return this.bookingService.getBookingById(id);
    }
}
