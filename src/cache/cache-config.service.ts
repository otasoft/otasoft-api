import { CacheModuleAsyncOptions, CacheOptionsFactory } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

export class CacheConfigService implements CacheOptionsFactory {
  createCacheOptions(): CacheModuleAsyncOptions {
    return {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get<string>('REDIS_HOST'),
        port: configService.get<number>('REDIS_PORT'),
        ttl: configService.get<number>('CACHE_TTL_IN_SECONDS'),
        max: configService.get<number>('CACHE_MAX_ITEMS_IN_CACHE'),
      }),
    };
  }
}
