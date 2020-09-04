import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
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
    }]),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
