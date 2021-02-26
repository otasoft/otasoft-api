import { GqlCustomer } from './customer-gql.model';

describe('GqlCustomer', () => {
  it('should create new GqlCustomer', () => {
    const idToTest = 1;
    const firstNameToTest = 'John';
    const lastNameToTest = 'Doe';

    const restBookingModelModel = new GqlCustomer(
      idToTest,
      firstNameToTest,
      lastNameToTest,
    );
    expect(restBookingModelModel.id).toBe(idToTest);
    expect(restBookingModelModel.first_name).toBe(firstNameToTest);
    expect(restBookingModelModel.last_name).toBe(lastNameToTest);
    expect(restBookingModelModel instanceof GqlCustomer).toBe(true);
  });
});
