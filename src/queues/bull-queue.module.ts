import { BullModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';

import { bullAsyncConfig } from './bull-async-config';

@Global()
@Module({
  imports: [BullModule.forRootAsync(bullAsyncConfig)],
})
export class BullQueueModule {}
