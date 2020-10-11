import { Controller, Get, Param } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('/check-dns')
  @HealthCheck()
  checkDns() {
    return this.healthService.checkDns();
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
