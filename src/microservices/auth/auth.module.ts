import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './rest/controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { connectMicroservice } from '../microservice-connection/microservice-connection';
import { AuthQueryResolver } from './graphql/auth-query.resolver';
import { AuthMutationResolver } from './graphql/auth-mutation.resolver';
import { OidcController } from './rest/controllers/oidc/oidc.controller';
import { OidcService } from './services/oidc/oidc.service';
import { SessionSerializer } from './oidc/session.serializer';
import { UserController } from './rest/controllers/user/user.controller';
import { UserService } from './services/user/user.service';
import { OidcStrategyFactory } from './oidc/oidc-strategy-factory';
import { UserMutationResolver } from './graphql/user-mutation.resolver';

@Module({
  imports: [
    ClientsModule.registerAsync([
      connectMicroservice('auth'),
      connectMicroservice('customer'),
      connectMicroservice('mail'),
    ]),
    PassportModule.register({ session: true, defaultStrategy: 'oidc' }),
  ],
  controllers: [AuthController, OidcController, UserController],
  providers: [
    AuthService,
    AuthQueryResolver,
    AuthMutationResolver,
    UserMutationResolver,
    OidcService,
    OidcStrategyFactory,
    SessionSerializer,
    UserService,
  ],
})
export class AuthModule {}
