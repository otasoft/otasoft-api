import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalAuthController } from './local-auth.controller';
import { LocalAuthService } from './local-auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.registerAsync([{
      name: 'AUTH_MICROSERVICE',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: Transport.RMQ,
        options: {
          urls: [
            `amqp://${configService.get('RABBITMQ_DEFAULT_USER')}:${configService.get('RABBITMQ_DEFAULT_PASS')}@localhost:${configService.get('RABBITMQ_FIRST_HOST_PORT')}/${configService.get('RABBITMQ_DEFAULT_VHOST')}` 
          ],
          queue: 'auth_queue',
          queueOptions: {
            durable: false,
          }
        }
      })
    }])
  ],
  controllers: [LocalAuthController],
  providers: [LocalAuthService]
})
export class LocalAuthModule {}
