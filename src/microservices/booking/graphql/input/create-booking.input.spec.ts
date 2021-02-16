import { CreateBookingInput } from './create-booking.input';

describe('CreateBookingInput', () => {
  it('should create an input object', () => {
    const testCreateBookingInput = { customer_id: 1 };

    expect(new CreateBookingInput(1)).toEqual(testCreateBookingInput);
  });
});
