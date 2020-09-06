import { Module } from '@nestjs/common';
import { FacebookAuthController } from './facebook-auth.controller';
import { FacebookAuthService } from './facebook-auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([{
      name: 'AUTH_MICROSERVICE',
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 64321
      }
    }])
  ],
  controllers: [FacebookAuthController],
  providers: [FacebookAuthService]
})
export class FacebookAuthModule {}
