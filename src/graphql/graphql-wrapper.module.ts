import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { GqlConfigService } from './config';

@Module({
  imports: [GraphQLModule.forRootAsync({ useClass: GqlConfigService })],
})
export class GraphqlWrapperModule {}
