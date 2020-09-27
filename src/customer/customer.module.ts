import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { ClientsModule } from '@nestjs/microservices';
import { connectMicroservice } from 'src/microservice-connection/microservice-connection';
import { CustomerService } from './customer.service';
import { CustomerQueryResolver } from './customer-query.resolver';
import { CustomerMutationResolver } from './customer-mutation.resolver';

@Module({
  imports: [
    ClientsModule.registerAsync([
      connectMicroservice('auth'),
      connectMicroservice('customer')
    ]),
  ],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerQueryResolver, CustomerMutationResolver]
})
export class CustomerModule {}
