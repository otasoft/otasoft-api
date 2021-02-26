import { RestCustomer } from './customer-rest.model';

describe('RestCustomer', () => {
  it('should create new RestCustomer', () => {
    const idToTest = 1;
    const firstNameToTest = 'John';
    const lastNameToTest = 'Doe';

    const restBookingModelModel = new RestCustomer(
      idToTest,
      firstNameToTest,
      lastNameToTest,
    );
    expect(restBookingModelModel.id).toBe(idToTest);
    expect(restBookingModelModel.first_name).toBe(firstNameToTest);
    expect(restBookingModelModel.last_name).toBe(lastNameToTest);
    expect(restBookingModelModel instanceof RestCustomer).toBe(true);
  });
});