import { Test, TestingModule } from '@nestjs/testing';

import { CustomerService } from '@customer/services';
import { CustomerQueryResolver } from './customer-query.resolver';
import { GqlCustomer } from '../models';

describe('CustomerQueryResolver', () => {
  let resolver: CustomerQueryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerQueryResolver,
        {
          provide: CustomerService,
          useFactory: () => ({
            getCustomerProfile: jest.fn(
              (id: number) => new GqlCustomer(id, 'John', 'Doe'),
            ),
          }),
        },
      ],
    }).compile();

    resolver = module.get<CustomerQueryResolver>(CustomerQueryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should get customer profile by ID and return Customer model', async () => {
    const customerIdToTest = 1;
    const customer = await resolver.getCustomerProfile(customerIdToTest);

    expect(typeof customer).toBe('object');
    expect(customer.id).toBe(customerIdToTest);
    expect(customer.first_name).toBe('John');
    expect(customer.last_name).toBe('Doe');
    expect(customer instanceof GqlCustomer).toBe(true);
  });
});
