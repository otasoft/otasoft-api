import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { OfferController } from './rest/controllers';
import { OfferService } from './services';
import { OfferMutationResolver } from './graphql/mutations';
import { OfferQueryResolver } from './graphql/queries';
import { createClientAsyncOptions } from '@utils/client';

@Module({
  imports: [ClientsModule.registerAsync([createClientAsyncOptions('catalog')])],
  controllers: [OfferController],
  providers: [OfferService, OfferMutationResolver, OfferQueryResolver],
})
export class CatalogModule {}
