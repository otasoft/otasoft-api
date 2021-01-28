import { HttpModuleAsyncOptions } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const axiosAsyncConfig: HttpModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    timeout: configService.get<number>('AXIOS_TIMEOUT'),
    maxRedirects: configService.get<number>('AXIOS_MAX_REDIRECTS'),
  }),
};
