import { UpdateCustomerProfileInput } from './update-customer-profile.input';

describe('UpdateCustomerProfileInput', () => {
  it('should create an input object', () => {
    const testUpdateCustomerProfileInput = {
      first_name: 'John',
      last_name: 'Doe',
    };

    expect(new UpdateCustomerProfileInput('John', 'Doe')).toEqual(
      testUpdateCustomerProfileInput,
    );
  });
});
