import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { DiskHealthIndicator, DNSHealthIndicator, HealthCheckService, MemoryHealthIndicator, MicroserviceHealthIndicator } from '@nestjs/terminus';

@Injectable()
export class HealthService {
    constructor(
        private readonly healthCheckService: HealthCheckService,
        private readonly dnsHealthIndicator: DNSHealthIndicator,
        private readonly diskHealthIndicator: DiskHealthIndicator,
        private readonly memoryHealthIndicator: MemoryHealthIndicator,
        private readonly microserviceHealthIndicator: MicroserviceHealthIndicator,
        private readonly configService: ConfigService,
    ) {}

    checkDns() {
        return this.healthCheckService.check([
            () => this.dnsHealthIndicator.pingCheck(
                'otasoft-api',
                this.configService.get<string>('CORE_URL'),
                { timeout: 1000 }
            )
        ]);
    }

    checkDisk() {
        return this.healthCheckService.check([
            () => this.diskHealthIndicator.checkStorage(
                'otasoft-api',
                { thresholdPercent: 0.9, path: '/' }
            )
        ]);
    }

    checkMemory() {
        return this.healthCheckService.check([
            () => this.memoryHealthIndicator.checkHeap(
                'memory_heap',
                150 * 1024 * 1024
            ),
            () => this.memoryHealthIndicator.checkRSS(
                'memory_rss',
                150 * 1024 * 1024
            )
        ]);
    }

    checkMicroservice(microserviceName: string) {
        return this.healthCheckService.check([
            () => this.microserviceHealthIndicator.pingCheck(
                `rabbitmq-${microserviceName}`, {
                    transport: Transport.RMQ,
                    options: {
                        urls: [
                            `amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@${process.env.RABBITMQ_NODENAME}:${process.env.RABBITMQ_FIRST_HOST_PORT}/${process.env.RABBITMQ_DEFAULT_VHOST}` 
                        ],
                        queue: `${microserviceName}_queue`,
                        queueOptions: {
                            durable: false,
                        }
                    }
                }
            )
        ]);
    }
}
