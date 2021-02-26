import { Test, TestingModule } from '@nestjs/testing';

import { CreateCustomerProfileInput, UpdateCustomerProfileInput } from '../input';
import { GqlCustomer } from '../models';
import { CustomerService } from '@customer/services';
import { CustomerMutationResolver } from './customer-mutation.resolver';

describe('CustomerMutationResolver', () => {
  let resolver: CustomerMutationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerMutationResolver,
        {
          provide: CustomerService,
          useFactory: () => ({
            createCustomerProfile: jest.fn(
              (createCustomerProfileInput: CreateCustomerProfileInput) =>
                new GqlCustomer(
                  1,
                  createCustomerProfileInput.first_name,
                  createCustomerProfileInput.last_name,
                ),
            ),
            updateCustomerProfile: jest.fn(
              (id: number, updateCustomerProfileInput: UpdateCustomerProfileInput) =>
                new GqlCustomer(
                  id,
                  updateCustomerProfileInput.first_name,
                  updateCustomerProfileInput.last_name,
                ),
            ),
            removeCustomerProfile: jest.fn(
              (id: number) => true,
            ),
          }),
        },
      ],
    }).compile();

    resolver = module.get<CustomerMutationResolver>(CustomerMutationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create new customer profile and return Customer model', async () => {
    const createCustomerProfileInput: CreateCustomerProfileInput = {
      first_name: 'John',
      last_name: 'Doe',
    };
    const customer = await resolver.createCustomerProfile(createCustomerProfileInput);

    expect(typeof customer).toBe('object');
    expect(customer.id).toBe(1);
    expect(customer.first_name).toBe(createCustomerProfileInput.first_name);
    expect(customer.last_name).toBe(createCustomerProfileInput.last_name);
    expect(customer instanceof GqlCustomer).toBe(true);
  });

  it('should update customer profile and return Customer model', async () => {
    const customerIdIdToTest = 1;
    const updateCustomerProfileInput: UpdateCustomerProfileInput = {
        first_name: 'John',
        last_name: 'Doe',
    };
    const customer = await resolver.updateCustomerProfile(customerIdIdToTest, updateCustomerProfileInput);

    expect(typeof customer).toBe('object');
    expect(customer.id).toBe(customerIdIdToTest);
    expect(customer.first_name).toBe(updateCustomerProfileInput.first_name);
    expect(customer.last_name).toBe(updateCustomerProfileInput.last_name);
    expect(customer instanceof GqlCustomer).toBe(true);
  });

  it('should delete customer by ID and return customer model', async () => {
    const customerIdToTest = 1;
    const status = await resolver.removeCustomerProfile(customerIdToTest);

    expect(typeof status).toBe('boolean');
  });
});
