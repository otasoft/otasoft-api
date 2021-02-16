import { BookingService } from '@booking/services';
import { Test, TestingModule } from '@nestjs/testing';
import { GqlBookingModel } from '../models';

import { BookingQueryResolver } from './booking-query.resolver';

describe('BookingQueryResolver', () => {
  let resolver: BookingQueryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingQueryResolver,
        {
          provide: BookingService,
          useFactory: () => ({
            getBookingById: jest.fn(
              (id: number) => new GqlBookingModel(id, new Date(), 1),
            ),
          }),
        },
      ],
    }).compile();

    resolver = module.get<BookingQueryResolver>(BookingQueryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should get booking by ID and return Booking model', async () => {
    const bookingIdToTest = 1;
    const booking = await resolver.getBookingById(bookingIdToTest);

    expect(typeof booking).toBe('object');
    expect(booking.id).toBe(bookingIdToTest);
    expect(booking.customer_id).toBe(1);
    expect(booking instanceof GqlBookingModel).toBe(true);
  });
});
