import { Module } from '@nestjs/common';
import { GoogleAuthController } from './google-auth.controller';
import { GoogleAuthService } from './google-auth.service';
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
  controllers: [GoogleAuthController],
  providers: [GoogleAuthService]
})
export class GoogleAuthModule {}
