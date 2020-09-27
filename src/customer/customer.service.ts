import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Customer } from './customer.model';
import { CreateCustomerProfileDto } from './dto/create-customer-profile.dto';
import { CreateCustomerProfileInput } from './dto/create-customer-profile.input';

@Injectable()
export class CustomerService {
    constructor(
        @Inject('CUSTOMER_MICROSERVICE')
        public readonly customerClient: ClientProxy
    ) {}

    async getCustomerProfile(id: number): Promise<Customer> {
        return this.customerClient.send({ role: 'customer', cmd: 'get' }, id).toPromise();
    }

    async createCustomerProfile(createCustomerProfileInput: CreateCustomerProfileInput) {
        const newCustomerProfile = await this.customerClient.send({ role: 'customer', cmd: 'create' }, createCustomerProfileInput).toPromise();
        if (!newCustomerProfile) throw new BadRequestException() // Change to more appropriate exception
        return newCustomerProfile;
    }
}
