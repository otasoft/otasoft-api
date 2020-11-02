import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { connectMicroservice } from '../microservice-connection/microservice-connection';
import { CatalogControllers } from './rest/controllers';
import { CatalogServices } from './services';
import { CatalogMutations } from './graphql/mutations';
import { CatalogQueries } from './graphql/queries';
import { MicroserviceConnectionService } from '../microservice-connection/microservice-connection.service';

@Module({
  imports: [ClientsModule.registerAsync([connectMicroservice('catalog')])],
  controllers: [...CatalogControllers],
  providers: [...CatalogServices, ...CatalogMutations, ...CatalogQueries, MicroserviceConnectionService],
})
export class CatalogModule {}
