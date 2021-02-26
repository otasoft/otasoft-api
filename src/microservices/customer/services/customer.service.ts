import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import {
  CreateCustomerProfileDto,
  UpdateCustomerProfileDto,
} from '../rest/dto';
import {
  CreateCustomerProfileInput,
  UpdateCustomerProfileInput,
} from '../graphql/input';
import { RestCustomer } from '../rest/models';
import { GqlCustomer } from '../graphql/models';
import { IUpdateCustomerObject } from '../interfaces';
import { ClientService } from '@utils/client';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('CUSTOMER_MICROSERVICE')
    public readonly customerClient: ClientProxy,
    public readonly clientService: ClientService,
  ) {}

  async getCustomerProfile(id: number): Promise<GqlCustomer | RestCustomer> {
    return this.clientService.sendMessageWithPayload(
      this.customerClient,
      { role: 'customer', cmd: 'get' },
      id,
    );
  }

  async createCustomerProfile(
    createCustomerProfileData:
      | CreateCustomerProfileInput
      | CreateCustomerProfileDto,
  ): Promise<GqlCustomer | RestCustomer> {
    return this.clientService.sendMessageWithPayload(
      this.customerClient,
      { role: 'customer', cmd: 'create' },
      createCustomerProfileData,
    );
  }

  async removeCustomerProfile(id: number): Promise<Boolean> {
    return this.clientService.sendMessageWithPayload(
      this.customerClient,
      { role: 'customer', cmd: 'remove' },
      id,
    );
  }

  async updateCustomerProfile(
    id: number,
    updateCustomerProfileData:
      | UpdateCustomerProfileDto
      | UpdateCustomerProfileInput,
  ): Promise<RestCustomer | GqlCustomer> {
    const updateProfileObject: IUpdateCustomerObject = {
      id,
      updateCustomerProfileData,
    };

    return this.clientService.sendMessageWithPayload(
      this.customerClient,
      { role: 'customer', cmd: 'update' },
      updateProfileObject,
    );
  }
}
