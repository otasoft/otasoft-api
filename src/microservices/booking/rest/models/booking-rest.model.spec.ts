import { RestBookingModel } from './booking-rest.model';

describe('RestBookingMode', () => {
  it('should create new RestBookingModel', () => {
    const bookingIdToTest = 1;
    const customerIdToTest = 1;

    const restBookingModel = new RestBookingModel(
      bookingIdToTest,
      new Date(),
      customerIdToTest,
    );
    expect(restBookingModel.id).toBe(bookingIdToTest);
    expect(restBookingModel.customer_id).toBe(customerIdToTest);
    expect(restBookingModel instanceof RestBookingModel).toBe(true);
  });
});
