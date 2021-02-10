import { Controller, Get, Param } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';

import { HealthService } from '../services';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  checkHealth(): string {
    return this.healthService.checkHealth();
  }

  @Get('/check-ping')
  @HealthCheck()
  checkPing() {
    return this.healthService.checkPing();
  }

  @Get('/check-disk')
  @HealthCheck()
  checkDisk() {
    return this.healthService.checkDisk();
  }

  @Get('/check-memory')
  @HealthCheck()
  checkMemory() {
    return this.healthService.checkMemory();
  }

  @Get('/check-microservice/:name')
  @HealthCheck()
  checkMicroservice(@Param('name') microserviceName: string) {
    return this.healthService.checkMicroservice(microserviceName);
  }
}
