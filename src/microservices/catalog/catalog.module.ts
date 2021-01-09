import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { CatalogControllers } from './rest/controllers';
import { CatalogServices } from './services';
import { CatalogMutations } from './graphql/mutations';
import { CatalogQueries } from './graphql/queries';
import { MicroserviceConnectionService } from '../../utils/microservice-connection/microservice-connection.service';
import { createClientAsyncOptions } from '../../utils/client';

@Module({
  imports: [ClientsModule.registerAsync([createClientAsyncOptions('catalog')])],
  controllers: [...CatalogControllers],
  providers: [
    ...CatalogServices,
    ...CatalogMutations,
    ...CatalogQueries,
    MicroserviceConnectionService,
  ],
})
export class CatalogModule {}
