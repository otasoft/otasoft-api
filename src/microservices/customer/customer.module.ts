import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { createClientAsyncOptions } from '@utils/client';
import { CustomerController } from './rest/controllers';
import { CustomerService } from './services';
import { CustomerQueryResolver } from './graphql/queries';
import { CustomerMutationResolver } from './graphql/mutations';

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
