import { BookingService } from '@booking/services';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateBookingInput } from '../input';
import { GqlBookingModel } from '../models';

import { BookingMutationResolver } from './booking-mutation.resolver';

describe('BookingMutationResolver', () => {
  let resolver: BookingMutationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingMutationResolver,
        {
          provide: BookingService,
          useFactory: () => ({
            createBooking: jest.fn(
              (newBooking: CreateBookingInput) =>
                new GqlBookingModel(1, new Date(), newBooking.customer_id),
            ),
            updateBooking: jest.fn(
              (id: number, updatedBooking: CreateBookingInput) =>
                new GqlBookingModel(id, new Date(), updatedBooking.customer_id),
            ),
            deleteBookingById: jest.fn(
              (id: number) => new GqlBookingModel(id, new Date(), 1),
            ),
          }),
        },
      ],
    }).compile();

    resolver = module.get<BookingMutationResolver>(BookingMutationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create new booking and return Booking model', async () => {
    const createBookingInput: CreateBookingInput = { customer_id: 1 };
    const booking = await resolver.createBooking(createBookingInput);

    expect(typeof booking).toBe('object');
    expect(booking.id).toBe(1);
    expect(booking.customer_id).toBe(createBookingInput.customer_id);
    expect(booking instanceof GqlBookingModel).toBe(true);
  });

  it('should update booking and return Booking model', async () => {
    const bookingIdToTest = 1;
    const updateBookingInput: CreateBookingInput = { customer_id: 1 };
    const booking = await resolver.updateBooking(
      bookingIdToTest,
      updateBookingInput,
    );

    expect(typeof booking).toBe('object');
    expect(booking.id).toBe(bookingIdToTest);
    expect(booking.customer_id).toBe(updateBookingInput.customer_id);
    expect(booking instanceof GqlBookingModel).toBe(true);
  });

  it('should delete booking by ID and return Booking model', async () => {
    const bookingIdToTest = 1;
    const booking = await resolver.deleteBookingById(bookingIdToTest);

    expect(typeof booking).toBe('object');
    expect(booking.id).toBe(bookingIdToTest);
    expect(booking.customer_id).toBe(1);
    expect(booking instanceof GqlBookingModel).toBe(true);
  });
});
