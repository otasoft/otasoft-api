import { Transport, ClientsProviderAsyncOptions } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

/**
 * Method that creates a microservice option object used for connecting to another client microservice.
 *
 * @param {string} microserviceName - name of a microservice to connect to
 *
 * @return {*}  {ClientsProviderAsyncOptions} - connection options for a microservice client
 */
export const createClientAsyncOptions = (
  microserviceName: string,
): ClientsProviderAsyncOptions => {
  const upperCaseMicroserviceName = microserviceName.toUpperCase();

  const clientAsyncOptions: ClientsProviderAsyncOptions = {
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

  return clientAsyncOptions;
};
