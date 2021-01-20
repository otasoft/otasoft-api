import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { join } from 'path';

import { MicroservicesModules } from '../../microservices';

export class GqlConfigService implements GqlOptionsFactory {
  createGqlOptions(): GqlModuleOptions {
    return {
      include: [...MicroservicesModules],
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      context: ({ req, res }) => ({ req, res }),
    };
  }
}
