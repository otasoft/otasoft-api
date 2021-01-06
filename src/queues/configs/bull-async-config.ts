import { SharedBullAsyncConfiguration } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const bullAsyncConfig: SharedBullAsyncConfiguration = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    redis: {
      host: configService.get<string>('REDIS_HOST'),
      port: configService.get<number>('REDIS_PORT'),
    },
    prefix: configService.get<string>('BULL_PREFIX'),
    limiter: {
      max: configService.get<number>('BULL_MAX_JOBS'),
      duration: configService.get<number>(
        'BULL_MAX_DURATION_FOR_JOB_IN_MILISECONDS',
      ),
    },
  }),
};
