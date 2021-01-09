import { ClientsModule } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';

import { ActivityService } from '../../../services/activity/activity.service';
import { ActivityController } from './activity.controller';
import { RedisCacheModule } from '../../../../../cache/redis-cache.module';
import { MicroserviceConnectionService } from '../../../../../utils/microservice-connection/microservice-connection.service';
import { createClientAsyncOptions } from '../../../../../utils/client';

describe('ActivityController', () => {
  let controller: ActivityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.registerAsync([createClientAsyncOptions('catalog')]),
        RedisCacheModule,
      ],
      controllers: [ActivityController],
      providers: [ActivityService, MicroserviceConnectionService],
    }).compile();

    controller = module.get<ActivityController>(ActivityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
