import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { ActivityController } from './rest/controllers';
import { ActivityService } from './services';
import { ActivityMutationResolver } from './graphql/mutations';
import { ActivityQueryResolver } from './graphql/queries';
import { createClientAsyncOptions } from '../../utils/client';

@Module({
  imports: [ClientsModule.registerAsync([createClientAsyncOptions('catalog')])],
  controllers: [ActivityController],
  providers: [ActivityService, ActivityMutationResolver, ActivityQueryResolver],
})
export class CatalogModule {}
