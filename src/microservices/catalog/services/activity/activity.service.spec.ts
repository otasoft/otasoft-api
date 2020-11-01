import { ClientsModule } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { RedisCacheModule } from '../../../../cache/redis-cache.module';
import { connectMicroservice } from '../../../microservice-connection/microservice-connection';
import { ActivityService } from './activity.service';

describe('ActivityService', () => {
  let service: ActivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.registerAsync([connectMicroservice('catalog')]),
        RedisCacheModule,
      ],
      providers: [ActivityService],
    }).compile();

    service = module.get<ActivityService>(ActivityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
