import { GqlBookingModel } from './booking-gql.model';

describe('GqlBookingModel', () => {
  it('should create new GqlBookingModel', () => {
    const bookingIdToTest = 1;
    const customerIdToTest = 1;

    const restBookingModelModel = new GqlBookingModel(
      bookingIdToTest,
      new Date(),
      customerIdToTest,
    );
    expect(restBookingModelModel.id).toBe(bookingIdToTest);
    expect(restBookingModelModel.customer_id).toBe(customerIdToTest);
    expect(restBookingModelModel instanceof GqlBookingModel).toBe(true);
  });
});
