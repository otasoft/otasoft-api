import { Transport, ClientsProviderAsyncOptions } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const connectMicroservice = (
  microserviceName: string,
): ClientsProviderAsyncOptions => {
  const upperCaseMicroserviceName = microserviceName.toUpperCase();

  const microserviceOptions: ClientsProviderAsyncOptions = {
    name: `${upperCaseMicroserviceName}_MICROSERVICE`,
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${configService.get(
            'RABBITMQ_DEFAULT_USER',
          )}:${configService.get('RABBITMQ_DEFAULT_PASS')}@${configService.get(
            'RABBITMQ_NODENAME',
          )}:${configService.get(
            'RABBITMQ_FIRST_HOST_PORT',
          )}/${configService.get('RABBITMQ_DEFAULT_VHOST')}`,
        ],
        queue: `${microserviceName}_queue`,
        queueOptions: {
          durable: false,
        },
      },
    }),
  };

  return microserviceOptions;
};
