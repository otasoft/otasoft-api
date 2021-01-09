import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { SessionSerializer, OidcStrategyFactory } from './oidc';
import { AuthServices } from './services';
import { AuthControllers } from './rest/controllers';
import { AuthMutations } from './graphql/mutations';
import { AuthQueries } from './graphql/queries';
import { JwtRefreshTokenStrategy, JwtStrategy } from './strategies';
import { createClientAsyncOptions } from '../../utils/client';

@Module({
  imports: [
    ClientsModule.registerAsync([
      createClientAsyncOptions('auth'),
      createClientAsyncOptions('customer'),
      createClientAsyncOptions('mail'),
    ]),
    PassportModule,
    JwtModule.register({}),
  ],
  controllers: [...AuthControllers],
  providers: [
    OidcStrategyFactory,
    SessionSerializer,
    JwtStrategy,
    JwtRefreshTokenStrategy,
    ...AuthServices,
    ...AuthMutations,
    ...AuthQueries,
  ],
})
export class AuthModule {}
