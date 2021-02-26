import { ClientsModule } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';

import { createClientAsyncOptions } from '@utils/client';
import { CustomerService } from '../../services';
import { CreateCustomerProfileDto, UpdateCustomerProfileDto } from '../dto';
import { RestCustomer } from '../models';
import { CustomerController } from './customer.controller';

describe('CustomerController', () => {
  let controller: CustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.registerAsync([
          createClientAsyncOptions('auth'),
          createClientAsyncOptions('customer'),
        ]),
      ],
      controllers: [CustomerController],
      providers: [
        {
          provide: CustomerService,
          useFactory: () => ({
            getCustomerProfile: jest.fn(
              (id: number) => new RestCustomer(1, 'Test', 'Description'),
            ),
            createCustomerProfile: jest.fn(
              (createCustomerProfileDto: CreateCustomerProfileDto) =>
                new RestCustomer(
                  1,
                  createCustomerProfileDto.first_name,
                  createCustomerProfileDto.last_name,
                ),
            ),
            updateCustomerProfile: jest.fn(
              (
                id: number,
                updateCustomerProfileDto: UpdateCustomerProfileDto,
              ) =>
                new RestCustomer(
                  id,
                  updateCustomerProfileDto.first_name,
                  updateCustomerProfileDto.last_name,
                ),
            ),
            removeCustomerProfile: jest.fn((id: number) => true),
          }),
        },
      ],
    }).compile();

    controller = module.get<CustomerController>(CustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get customer profile by ID and return Customer model', async () => {
    const customerIdToTest = 1;
    const customer = await controller.getCustomerProfile(customerIdToTest);

    expect(typeof customer).toBe('object');
    expect(customer.id).toBe(customerIdToTest);
    expect(customer instanceof RestCustomer).toBe(true);
  });

  it('should create new customer profile and return Customer model', async () => {
    const createCustomerProfileDto: CreateCustomerProfileDto = {
      auth_id: 1,
      first_name: 'John',
      last_name: 'Doe',
    };
    const customer = await controller.createCustomerProfile(
      createCustomerProfileDto,
    );

    expect(typeof customer).toBe('object');
    expect(customer.id).toBe(1);
    expect(customer.first_name).toBe(createCustomerProfileDto.first_name);
    expect(customer.last_name).toBe(createCustomerProfileDto.last_name);
    expect(customer instanceof RestCustomer).toBe(true);
  });

  it('should update customer profile and return Customer model', async () => {
    const customerIdIdToTest = 1;
    const updateCustomerProfileDto: UpdateCustomerProfileDto = {
      first_name: 'John',
      last_name: 'Doe',
    };
    const customer = await controller.updateCustomerProfile(
      customerIdIdToTest,
      updateCustomerProfileDto,
    );

    expect(typeof customer).toBe('object');
    expect(customer.id).toBe(customerIdIdToTest);
    expect(customer.first_name).toBe(updateCustomerProfileDto.first_name);
    expect(customer.last_name).toBe(updateCustomerProfileDto.last_name);
    expect(customer instanceof RestCustomer).toBe(true);
  });

  it('should delete customer profile by ID and return boolean', async () => {
    const customerIdToTest = 1;
    const status = await controller.removeCustomerProfile(customerIdToTest);

    expect(typeof status).toBe('boolean');
    expect(status).toBe(true);
  });
});
