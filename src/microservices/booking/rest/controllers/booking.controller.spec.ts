import { ClientsModule } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';

import { createClientAsyncOptions } from '@utils/client';
import { UtilsModule } from '@utils/utils.module';
import { BookingService } from '../../services';
import { CreateBookingDto } from '../dto';
import { RestBookingModel } from '../models';
import { BookingController } from './booking.controller';

describe('BookingController', () => {
  let controller: BookingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.registerAsync([
          createClientAsyncOptions('auth'),
          createClientAsyncOptions('booking'),
        ]),
        UtilsModule,
      ],
      controllers: [BookingController],
      providers: [
        {
          provide: BookingService,
          useFactory: () => ({
            getBookingById: jest.fn(
              (id: number) => new RestBookingModel(id, new Date(), 1),
            ),
            createBooking: jest.fn(
              (newBooking: CreateBookingDto) =>
                new RestBookingModel(1, new Date(), newBooking.customer_id),
            ),
            updateBooking: jest.fn(
              (id: number, updatedBooking: CreateBookingDto) =>
                new RestBookingModel(
                  id,
                  new Date(),
                  updatedBooking.customer_id,
                ),
            ),
            deleteBookingById: jest.fn(
              (id: number) => new RestBookingModel(id, new Date(), 1),
            ),
          }),
        },
      ],
    }).compile();

    controller = module.get<BookingController>(BookingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get booking by ID and return Booking model', async () => {
    const bookingIdToTest = 1;
    const booking = await controller.getBookingById(bookingIdToTest);

    expect(typeof booking).toBe('object');
    expect(booking.id).toBe(bookingIdToTest);
    expect(booking.customer_id).toBe(1);
    expect(booking instanceof RestBookingModel).toBe(true);
  });

  it('should create new booking and return Booking model', async () => {
    const createBookingDto: CreateBookingDto = { customer_id: 1 };
    const booking = await controller.createBooking(createBookingDto);

    expect(typeof booking).toBe('object');
    expect(booking.id).toBe(1);
    expect(booking.customer_id).toBe(createBookingDto.customer_id);
    expect(booking instanceof RestBookingModel).toBe(true);
  });

  it('should update booking and return Booking model', async () => {
    const bookingIdToTest = 1;
    const updateBookingDto: CreateBookingDto = { customer_id: 1 };
    const booking = await controller.updateBooking(
      bookingIdToTest,
      updateBookingDto,
    );

    expect(typeof booking).toBe('object');
    expect(booking.id).toBe(bookingIdToTest);
    expect(booking.customer_id).toBe(updateBookingDto.customer_id);
    expect(booking instanceof RestBookingModel).toBe(true);
  });

  it('should delete booking by ID and return Booking model', async () => {
    const bookingIdToTest = 1;
    const booking = await controller.deleteBookingById(bookingIdToTest);

    expect(typeof booking).toBe('object');
    expect(booking.id).toBe(bookingIdToTest);
    expect(booking.customer_id).toBe(1);
    expect(booking instanceof RestBookingModel).toBe(true);
  });
});
