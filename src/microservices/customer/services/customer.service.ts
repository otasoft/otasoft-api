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
import { RestCustomer, RestMessageModel } from '../rest/models';
import { GqlCustomer, GqlMessageModel } from '../graphql/models';
import { IUpdateCustomerObject } from '../interfaces';
import { ClientService } from '@utils/client';
import { RestTextResponseModel } from '@catalog/rest/models';
import { GqlTextResponseModel } from '@catalog/graphql/models';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('CUSTOMER_MICROSERVICE')
    public readonly customerClient: ClientProxy,
    private readonly clientService: ClientService
  ) {}

  async getCustomerProfile(id: number): Promise<GqlCustomer | RestCustomer> {
    const customerProfile = await this.customerClient
      .send({ role: 'customer', cmd: 'get' }, id)
      .toPromise();
    return customerProfile;
  }

  async getCustomerMessages(id: number): Promise<RestMessageModel[] | GqlMessageModel[]> {
    return this.clientService.sendMessageWithPayload(
      this.customerClient,
      { role: 'customer', cmd: 'getCustomerMessages' },
      id,
    )
  }

  async deleteMessage(id: number): Promise<RestTextResponseModel | GqlTextResponseModel> {
    return this.clientService.sendMessageWithPayload(
      this.customerClient,
      { role: 'customer', cmd: 'deleteMessage' },
      id,
    )
  }

  async createCustomerProfile(
    createCustomerProfileData:
      | CreateCustomerProfileInput
      | CreateCustomerProfileDto,
  ): Promise<GqlCustomer | RestCustomer> {
    const newCustomerProfile = await this.customerClient
      .send({ role: 'customer', cmd: 'create' }, createCustomerProfileData)
      .toPromise();
    if (!newCustomerProfile) throw new BadRequestException(); // Change to more appropriate exception
    return newCustomerProfile;
  }

  async removeCustomerProfile(id: number): Promise<Boolean> {
    const customerRemoved = await this.customerClient
      .send({ role: 'customer', cmd: 'remove' }, id)
      .toPromise();
    return customerRemoved;
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
    const updatedProfile = await this.customerClient
      .send({ role: 'customer', cmd: 'update' }, updateProfileObject)
      .toPromise();
    return updatedProfile;
  }
}
