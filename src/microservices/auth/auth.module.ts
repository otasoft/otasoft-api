import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AuthController } from './rest/auth.controller';
import { AuthService } from './auth.service';
import { connectMicroservice } from '../microservice-connection/microservice-connection';
import { AuthQueryResolver } from './graphql/auth-query.resolver';
import { AuthMutationResolver } from './graphql/auth-mutation.resolver';

@Module({
  imports: [
    ClientsModule.registerAsync([
      connectMicroservice('auth'),
      connectMicroservice('customer'),
      connectMicroservice('mail'),
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthQueryResolver, AuthMutationResolver],
})
export class AuthModule {}
