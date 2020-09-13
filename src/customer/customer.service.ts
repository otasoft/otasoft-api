import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCustomerProfileDto } from './dto/create-customer-profile.dto';

@Injectable()
export class CustomerService {
    constructor(
        @Inject('CUSTOMER_MICROSERVICE')
        public readonly customerClient: ClientProxy
    ) {}

    async getCustomerProfile(id: number) {
        return this.customerClient.send({ role: 'customer', cmd: 'get' }, id);
    }

    async createCustomerProfile(createCustomerProfileDto: CreateCustomerProfileDto) {
        const isCustomerCreated: Promise<boolean> = await this.customerClient.send({ role: 'customer', cmd: 'create' }, createCustomerProfileDto).toPromise();
        if (!isCustomerCreated) throw new BadRequestException() // Change to more appropriate exception
    }
}
