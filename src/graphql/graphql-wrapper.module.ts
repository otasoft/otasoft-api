import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GqlConfigService } from './gql-config.service';

@Module({
  imports: [GraphQLModule.forRootAsync({ useClass: GqlConfigService })],
})
export class GraphqlWrapperModule {}
