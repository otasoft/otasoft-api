import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { connectMicroservice } from '../microservice-connection/microservice-connection';
import { SessionSerializer, OidcStrategyFactory } from './oidc';
import { MicroserviceConnectionService } from '../microservice-connection/microservice-connection.service';
import { AuthServices } from './services';
import { AuthControllers } from './rest/controllers';
import { AuthMutations } from './graphql/mutations';
import { AuthQueries } from './graphql/queries';
import {
  JwtRefreshTokenStrategy,
  JwtStrategy,
  LocalStrategy,
} from './strategies';

@Module({
  imports: [
    ClientsModule.registerAsync([
      connectMicroservice('auth'),
      connectMicroservice('customer'),
      connectMicroservice('mail'),
    ]),
    PassportModule,
    JwtModule.register({}),
  ],
  controllers: [...AuthControllers],
  providers: [
    OidcStrategyFactory,
    SessionSerializer,
    MicroserviceConnectionService,
    ...AuthServices,
    ...AuthMutations,
    ...AuthQueries,
    JwtStrategy,
    JwtRefreshTokenStrategy,
    LocalStrategy,
  ],
})
export class AuthModule {}
