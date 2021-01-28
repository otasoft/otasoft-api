import { Global, Module } from '@nestjs/common';

import { AxiosWrapperModule } from './axios/axios-wrapper.module';
import { ClientService } from './client';

@Global()
@Module({
  imports: [AxiosWrapperModule],
  providers: [ClientService],
  exports: [ClientService],
})
export class UtilsModule {}
