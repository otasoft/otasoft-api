import { Module } from '@nestjs/common';
import { CustomerController } from './rest/customer.controller';
import { ClientsModule } from '@nestjs/microservices';

import { createClientAsyncOptions } from '@utils/client';
import { CustomerService } from './services';
import { CustomerQueryResolver } from './graphql/customer-query.resolver';
import { CustomerMutationResolver } from './graphql/customer-mutation.resolver';

@Module({
  imports: [
    ClientsModule.registerAsync([
      createClientAsyncOptions('auth'),
      createClientAsyncOptions('customer'),
    ]),
  ],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerQueryResolver, CustomerMutationResolver],
})
export class CustomerModule {}
