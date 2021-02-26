import { UpdateCustomerProfileDto } from './update-customer-profile.dto';

describe('UpdateCustomerProfileDto', () => {
  it('should create a Dto object', () => {
    const testUpdateCustomerProfileDto = {
      first_name: 'John',
      last_name: 'Doe',
    };

    expect(new UpdateCustomerProfileDto('John', 'Doe')).toEqual(
      testUpdateCustomerProfileDto,
    );
  });
});
