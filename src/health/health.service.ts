import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DNSHealthIndicator, HealthCheckService } from '@nestjs/terminus';

@Injectable()
export class HealthService {
    constructor(
        private readonly healthCheckService: HealthCheckService,
        private readonly dnsHealthIndicator: DNSHealthIndicator,
        private readonly configService: ConfigService,
    ) {}

    checkDns() {
        return this.healthCheckService.check([
            () => this.dnsHealthIndicator.pingCheck(
                'otasoft-api',
                this.configService.get<string>('CORE_URL'),
                { timeout: 1000 }
            )
        ])
    }
}
