import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CustomerService {
    constructor(
        @Inject('CUSTOMER_MICROSERVICE')
        public readonly customerClient: ClientProxy
    ) {}

    async getCustomerProfile(id: number) {
        return this.customerClient.send({ role: 'customer', cmd: 'get' }, id);
    }
}
