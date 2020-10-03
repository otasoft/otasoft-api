import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { LocalAuthController } from './rest/local-auth.controller';
import { LocalAuthService } from './local-auth.service';
import { connectMicroservice } from '../../microservice-connection/microservice-connection'
import { LocalAuthQueryResolver } from './graphql/local-auth-query.resolver';
import { LocalAuthMutationResolver } from './graphql/local-auth-mutation.resolver';

@Module({
  imports: [
    ClientsModule.registerAsync([
      connectMicroservice('auth'),
      connectMicroservice('customer'),
      connectMicroservice('mail')
    ]),
  ],
  controllers: [LocalAuthController],
  providers: [
    LocalAuthService,
    LocalAuthQueryResolver,
    LocalAuthMutationResolver,
  ]
})
export class LocalAuthModule {}
