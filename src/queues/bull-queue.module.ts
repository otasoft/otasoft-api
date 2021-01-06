import { BullModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';

import { bullAsyncConfig, queueAsyncConfig } from './configs';

@Global()
@Module({
  imports: [
    BullModule.forRootAsync(bullAsyncConfig),
    BullModule.registerQueueAsync(queueAsyncConfig),
  ],
})
export class BullQueueModule {}
