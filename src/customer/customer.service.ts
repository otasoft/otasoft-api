import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GqlCustomer } from './graphql/models/customer-gql.model';
import { CreateCustomerProfileDto } from './rest/dto/create-customer-profile.dto';
import { CreateCustomerProfileInput } from './graphql/input/create-customer-profile.input';
import { RestCustomer } from './rest/models/customer-rest.model';

@Injectable()
export class CustomerService {
    constructor(
        @Inject('CUSTOMER_MICROSERVICE')
        public readonly customerClient: ClientProxy
    ) {}

    async getCustomerProfile(
        id: number
    ): Promise<GqlCustomer | RestCustomer> {
        return this.customerClient.send({ role: 'customer', cmd: 'get' }, id).toPromise();
    }

    async createCustomerProfile(
        createCustomerProfileInput: CreateCustomerProfileInput
    ): Promise<GqlCustomer | RestCustomer> {
        const newCustomerProfile = await this.customerClient.send({ role: 'customer', cmd: 'create' }, createCustomerProfileInput).toPromise();
        if (!newCustomerProfile) throw new BadRequestException() // Change to more appropriate exception
        return newCustomerProfile;
    }
}
