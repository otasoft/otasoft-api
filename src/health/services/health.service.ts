import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  DiskHealthIndicator,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus';

@Injectable()
export class HealthService {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly httpHealthIndicator: HttpHealthIndicator,
    private readonly diskHealthIndicator: DiskHealthIndicator,
    private readonly memoryHealthIndicator: MemoryHealthIndicator,
    private readonly microserviceHealthIndicator: MicroserviceHealthIndicator,
    private readonly configService: ConfigService,
  ) {}

  checkHealth(): string {
    return 'API Gateway is working correctly';
  }

  checkPing() {
    return this.healthCheckService.check([
      () =>
        this.httpHealthIndicator.pingCheck(
          'otasoft-api',
          this.configService.get<string>('CORE_URL'),
          { timeout: 3000, proxy: { host: '127.0.0.1', port: 443 } },
        ),
    ]);
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  checkDisk() {
    return this.healthCheckService.check([
      () =>
        this.diskHealthIndicator.checkStorage('otasoft-api', {
          thresholdPercent: 0.9,
          path: '/',
        }),
    ]);
  }

  checkMemory() {
    return this.healthCheckService.check([
      () =>
        this.memoryHealthIndicator.checkHeap('memory_heap', 150 * 1024 * 1024),
      () =>
        this.memoryHealthIndicator.checkRSS('memory_rss', 150 * 1024 * 1024),
    ]);
  }

  checkMicroservice(microserviceName: string) {
    return this.healthCheckService.check([
      () =>
        this.microserviceHealthIndicator.pingCheck(
          `rabbitmq-${microserviceName}`,
          {
            transport: Transport.RMQ,
            options: {
              urls: [
                `amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@${process.env.RABBITMQ_NODENAME}:${process.env.RABBITMQ_FIRST_HOST_PORT}/${process.env.RABBITMQ_DEFAULT_VHOST}`,
              ],
              queue: `${microserviceName}_queue`,
              queueOptions: {
                durable: false,
              },
            },
          },
        ),
    ]);
  }
}
