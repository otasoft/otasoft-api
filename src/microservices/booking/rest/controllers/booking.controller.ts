import {
  Controller,
  Param,
  Get,
  UseGuards,
  Delete,
  Post,
  Put,
  Body,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';

import { AccessControlGuard } from '@auth/guards';
import { BookingService } from '../../services';
import { RestBooking } from '../models';
import { CreateBookingDto } from '../dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(AccessControlGuard)
  @Get('/:id')
  async getBookingById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RestBooking> {
    return this.bookingService.getBookingById(id);
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(AccessControlGuard)
  @Post('/')
  async createBooking(
    @Body() newBooking: CreateBookingDto,
  ): Promise<RestBooking> {
    return this.bookingService.createBooking(newBooking);
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(AccessControlGuard)
  @Put('/:id')
  async updateBooking(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedBooking: CreateBookingDto,
  ): Promise<RestBooking> {
    return this.bookingService.updateBooking(id, updatedBooking);
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(AccessControlGuard)
  @Delete('/:id')
  async deleteBookingById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RestBooking> {
    return this.bookingService.deleteBookingById(id);
  }
}
