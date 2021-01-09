import { Module } from '@nestjs/common';
import { CustomerController } from './rest/customer.controller';
import { ClientsModule } from '@nestjs/microservices';
import { connectMicroservice } from 'src/utils/microservice-connection/microservice-connection';
import { CustomerService } from './customer.service';
import { CustomerQueryResolver } from './graphql/customer-query.resolver';
import { CustomerMutationResolver } from './graphql/customer-mutation.resolver';
import { MicroserviceConnectionService } from '../../utils/microservice-connection/microservice-connection.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      connectMicroservice('auth'),
      connectMicroservice('customer'),
    ]),
  ],
  controllers: [CustomerController],
  providers: [
    CustomerService,
    CustomerQueryResolver,
    CustomerMutationResolver,
    MicroserviceConnectionService,
  ],
})
export class CustomerModule {}
