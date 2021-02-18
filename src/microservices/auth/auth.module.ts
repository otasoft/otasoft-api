import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { createClientAsyncOptions } from '@utils/client';
import { MailModule } from '@mail/mail.module';
import { AuthServices } from './services';
import { AuthControllers } from './rest/controllers';
import { AuthMutations } from './graphql/mutations';
import { AuthQueries } from './graphql/queries';
import { JwtRefreshTokenStrategy, JwtStrategy } from './strategies';
import { SessionSerializer } from '@security/serializers';

@Module({
  imports: [
    ClientsModule.registerAsync([createClientAsyncOptions('auth')]),
    PassportModule,
    JwtModule.register({}),
    MailModule,
  ],
  controllers: [...AuthControllers],
  providers: [
    SessionSerializer,
    JwtStrategy,
    JwtRefreshTokenStrategy,
    ...AuthServices,
    ...AuthMutations,
    ...AuthQueries,
  ],
})
export class AuthModule {}
