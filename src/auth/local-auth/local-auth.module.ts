import { Module } from '@nestjs/common';
import { LocalAuthController } from './local-auth.controller';
import { LocalAuthService } from './local-auth.service';
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
  controllers: [LocalAuthController],
  providers: [LocalAuthService]
})
export class LocalAuthModule {}
