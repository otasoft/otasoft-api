import { CreateCustomerProfileDto, UpdateCustomerProfileDto } from '@customer/rest/dto';
import { RestCustomer } from '@customer/rest/models';
import { ClientsModule } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';

import { ClientService, createClientAsyncOptions, IMessagePattern } from '@utils/client';
import { UtilsModule } from '@utils/utils.module';
import { CustomerService } from './customer.service';

describe('CustomerService', () => {
  let service: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.registerAsync([
          createClientAsyncOptions('auth'),
          createClientAsyncOptions('customer'),
        ]),
        UtilsModule
      ],
      providers: [
        CustomerService,
        {
          provide: ClientService,
          useFactory: () => ({
            sendMessageWithPayload: jest.fn(
              (client: any, messagePattern: IMessagePattern, payload: any) => {
                switch (messagePattern.cmd) {
                  case 'get':
                    return new RestCustomer(payload, 'John', 'Doe');
                  case 'create':
                    return new RestCustomer(
                      1,
                      payload.first_name,
                      payload.last_name,
                    );
                  case 'update':
                    return new RestCustomer(
                      payload.id,
                      payload.updateCustomerProfileData.first_name,
                      payload.updateCustomerProfileData.last_name,
                    );
                  case 'remove':
                    return true;
                }
              },
            ),
          }),
        },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get customer profile by ID and return Customer model', async () => {
    const customerIdToTest = 1;
    const customer = await service.getCustomerProfile(customerIdToTest);

    expect(typeof customer).toBe('object');
    expect(customer.id).toBe(customerIdToTest);
    expect(customer.first_name).toBe('John');
    expect(customer.last_name).toBe('Doe');
    expect(customer instanceof RestCustomer).toBe(true);
  });

  it('should create new customer profile and return Customer model', async () => {
    const createCustomerProfileDto: CreateCustomerProfileDto = {
      auth_id: 1,
      first_name: 'John',
      last_name: 'Doe',
    };
    const customer = await service.createCustomerProfile(createCustomerProfileDto);


    expect(typeof customer).toBe('object');
    expect(customer.id).toBe(1);
    expect(customer.first_name).toBe('John');
    expect(customer.last_name).toBe('Doe');
    expect(customer instanceof RestCustomer).toBe(true);
  });

  it('should update offer and return Offer model', async () => {
    const customerIdToTest = 1;
    const updateCustomerProfileDto: UpdateCustomerProfileDto = {
      first_name: 'John',
      last_name: 'Doe',
    };
    const customer = await service.updateCustomerProfile(customerIdToTest, updateCustomerProfileDto);

    expect(typeof customer).toBe('object');
    expect(customer.id).toBe(customerIdToTest);
    expect(customer.first_name).toBe('John');
    expect(customer.last_name).toBe('Doe');
    expect(customer instanceof RestCustomer).toBe(true);
  });

  it('should delete customer profile by ID and return boolean', async () => {
    const customerIdToTest = 1;
    const customer = await service.removeCustomerProfile(customerIdToTest);

    expect(typeof customer).toBe('boolean');
    expect(customer).toBe(true);
  });
});
