import { RestBookingModel } from './booking-rest.model';

describe('RestBookingModelModel', () => {
  it('should create new RestBookingModelModel', () => {
    const bookingIdToTest = 1;
    const customerIdToTest = 1;

    const restBookingModelModel = new RestBookingModel(
      bookingIdToTest,
      new Date(),
      customerIdToTest,
    );
    expect(restBookingModelModel.id).toBe(bookingIdToTest);
    expect(restBookingModelModel.customer_id).toBe(customerIdToTest);
    expect(restBookingModelModel instanceof RestBookingModel).toBe(true);
  });
});
