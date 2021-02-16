import { CreateBookingDto } from './create-booking.dto';

describe('CreateBookingDto', () => {
  it('should create a Dto object', () => {
    const testCreateBookingDto = { customer_id: 1 };

    expect(new CreateBookingDto(1)).toEqual(testCreateBookingDto);
  });
});
