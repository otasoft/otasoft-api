import { CreateBookingDto } from '@booking/rest/dto';
import { ClientsModule } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';

import { RestBookingModel } from '@booking/rest/models';
import {
  ClientService,
  createClientAsyncOptions,
  IMessagePattern,
} from '@utils/client';
import { UtilsModule } from '@utils/utils.module';
import { BookingService } from './booking.service';

describe('BookingService', () => {
  let service: BookingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.registerAsync([
          createClientAsyncOptions('auth'),
          createClientAsyncOptions('booking'),
        ]),
        UtilsModule,
      ],
      providers: [
        BookingService,
        {
          provide: ClientService,
          useFactory: () => ({
            sendMessageWithPayload: jest.fn(
              (client: any, messagePattern: IMessagePattern, payload: any) => {
                switch (messagePattern.cmd) {
                  case 'get':
                    return new RestBookingModel(payload, new Date(), 1);
                  case 'create':
                    return new RestBookingModel(
                      1,
                      new Date(),
                      payload.customer_id,
                    );
                  case 'update':
                    return new RestBookingModel(
                      payload.id,
                      new Date(),
                      payload.updatedBooking.customer_id,
                    );
                  case 'remove':
                    return new RestBookingModel(payload, new Date(), 1);
                }
              },
            ),
          }),
        },
      ],
    }).compile();

    service = module.get<BookingService>(BookingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get booking by ID and return Booking model', async () => {
    const bookingIdToTest = 1;
    const booking = await service.getBookingById(bookingIdToTest);

    expect(typeof booking).toBe('object');
    expect(booking.id).toBe(bookingIdToTest);
    expect(booking.customer_id).toBe(1);
    expect(booking instanceof RestBookingModel).toBe(true);
  });

  it('should create new booking and return Booking model', async () => {
    const createBookingDto: CreateBookingDto = { customer_id: 1 };
    const booking = await service.createBooking(createBookingDto);

    expect(typeof booking).toBe('object');
    expect(booking.id).toBe(1);
    expect(booking.customer_id).toBe(createBookingDto.customer_id);
    expect(booking instanceof RestBookingModel).toBe(true);
  });

  it('should update booking and return Booking model', async () => {
    const bookingIdToTest = 1;
    const updateBookingDto: CreateBookingDto = { customer_id: 1 };
    const booking = await service.updateBooking(
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
    const booking = await service.deleteBookingById(bookingIdToTest);

    expect(typeof booking).toBe('object');
    expect(booking.id).toBe(bookingIdToTest);
    expect(booking.customer_id).toBe(1);
    expect(booking instanceof RestBookingModel).toBe(true);
  });
});
