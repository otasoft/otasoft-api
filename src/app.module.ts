import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { GraphqlWrapperModule } from './graphql/graphql-wrapper.module';
import { RedisCacheModule } from './cache/redis-cache.module';
import { HealthModule } from './health/health.module';
import { MicroservicesModules } from './microservices';
import { BullQueueModule } from './queues/bull-queue.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    GraphqlWrapperModule,
    RedisCacheModule,
    BullQueueModule,
    HealthModule,
    ...MicroservicesModules,
  ],
})
export class AppModule {}
