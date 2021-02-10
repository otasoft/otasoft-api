import { ClientsModule } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';

import { RedisCacheModule } from '../../../cache/redis-cache.module';
import { OfferService } from './offer.service';
import { createClientAsyncOptions } from '../../../utils/client';
import { UtilsModule } from '../../../utils/utils.module';

describe('OfferService', () => {
  let service: OfferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.registerAsync([createClientAsyncOptions('catalog')]),
        RedisCacheModule,
        UtilsModule,
      ],
      providers: [OfferService],
    }).compile();

    service = module.get<OfferService>(OfferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
