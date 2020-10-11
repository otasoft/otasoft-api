import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DiskHealthIndicator, DNSHealthIndicator, HealthCheckService, MemoryHealthIndicator, MicroserviceHealthIndicator } from '@nestjs/terminus';

@Injectable()
export class HealthService {
    constructor(
        private readonly healthCheckService: HealthCheckService,
        private readonly dnsHealthIndicator: DNSHealthIndicator,
        private readonly diskHealthIndicator: DiskHealthIndicator,
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
}
