import { ClientsModule } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';

import { RedisCacheModule } from '../../../../cache/redis-cache.module';
import { ActivityService } from './activity.service';
import { MicroserviceConnectionService } from '../../../../utils/microservice-connection/microservice-connection.service';
import { createClientAsyncOptions } from '../../../../utils/client';

describe('ActivityService', () => {
  let service: ActivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.registerAsync([createClientAsyncOptions('catalog')]),
        RedisCacheModule,
      ],
      providers: [ActivityService, MicroserviceConnectionService],
    }).compile();

    service = module.get<ActivityService>(ActivityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
