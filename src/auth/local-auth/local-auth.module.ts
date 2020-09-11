import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { LocalAuthController } from './local-auth.controller';
import { LocalAuthService } from './local-auth.service';
import { connectMicroservice } from '../../microservice-connection/microservice-connection'

@Module({
  imports: [
    ClientsModule.registerAsync([
      connectMicroservice('auth'),
      // connectMicroservice('customer')
    ]),
  ],
  controllers: [LocalAuthController],
  providers: [LocalAuthService]
})
export class LocalAuthModule {}
