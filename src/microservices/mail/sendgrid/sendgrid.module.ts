import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { createClientAsyncOptions } from '@utils/client';
import { SendgridService } from './services/sendgrid.service';

@Module({
  imports: [ClientsModule.registerAsync([createClientAsyncOptions('mail')])],
  providers: [SendgridService],
  exports: [SendgridService],
})
export class SendgridModule {}
