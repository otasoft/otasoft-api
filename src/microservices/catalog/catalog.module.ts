import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { connectMicroservice } from '../microservice-connection/microservice-connection';
import { CatalogControllers } from './rest/controllers';
import { CatalogServices } from './services';
import { CatalogMutations } from './graphql/mutations';
import { CatalogQueries } from './graphql/queries';

@Module({
  imports: [ClientsModule.registerAsync([connectMicroservice('catalog')])],
  controllers: [...CatalogControllers],
  providers: [...CatalogServices, ...CatalogMutations, ...CatalogQueries],
})
export class CatalogModule {}
