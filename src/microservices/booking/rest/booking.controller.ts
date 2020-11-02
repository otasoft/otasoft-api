import {
  Controller,
  Param,
  Get,
  UseGuards,
  Delete,
  Post,
  Put,
  Body,
} from '@nestjs/common';
import { BookingService } from '../booking.service';
import { RestBooking } from './models/booking-rest';
import { CreateBookingDto } from './dto/create-booking.dto';
import { AccessControlGuard } from '../../auth/guards/access-control.guard';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(AccessControlGuard)
  @Get('/:id')
  async getBookingById(@Param('id') id: number): Promise<RestBooking> {
    return this.bookingService.getBookingById(id);
  }

  @UseGuards(AccessControlGuard)
  @Post('/')
  async createBooking(
    @Body() newBooking: CreateBookingDto,
  ): Promise<RestBooking> {
    return this.bookingService.createBooking(newBooking);
  }

  @UseGuards(AccessControlGuard)
  @Put('/:id')
  async updateBooking(
    @Param('id') id: number,
    @Body() updatedBooking: CreateBookingDto,
  ): Promise<RestBooking> {
    return this.bookingService.updateBooking(id, updatedBooking);
  }

  @UseGuards(AccessControlGuard)
  @Delete('/:id')
  async deleteBookingById(@Param('id') id: number): Promise<RestBooking> {
    return this.bookingService.deleteBookingById(id);
  }
}
