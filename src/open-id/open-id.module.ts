import { Module } from '@nestjs/common';

import { OpenIdController } from './controllers';
import { OpenIdService } from './services';

@Module({
  controllers: [OpenIdController],
  providers: [OpenIdService],
})
export class OpenIdModule {}
