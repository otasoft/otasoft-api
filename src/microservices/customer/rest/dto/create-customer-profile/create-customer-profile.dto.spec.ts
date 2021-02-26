import { CreateCustomerProfileDto } from './create-customer-profile.dto';

describe('CreateCustomerProfileDto', () => {
  it('should create a Dto object', () => {
    const testCreateCustomerProfileDto = { auth_id: 1, first_name: 'John', last_name: 'Doe' };

    expect(new CreateCustomerProfileDto(1, 'John', 'Doe')).toEqual(
        testCreateCustomerProfileDto,
    );
  });
});
