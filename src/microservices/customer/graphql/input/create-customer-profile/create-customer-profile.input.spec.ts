import { CreateCustomerProfileInput } from './create-customer-profile.input';

describe('CreateCustomerProfileInput', () => {
  it('should create an input object', () => {
    const testCreateCustomerProfileInput = {
      first_name: 'John',
      last_name: 'Doe',
    };

    expect(new CreateCustomerProfileInput('John', 'Doe')).toEqual(
      testCreateCustomerProfileInput,
    );
  });
});
