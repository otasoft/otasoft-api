import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { createClientAsyncOptions } from 'src/utils/client';
import { UtilsModule } from '../../utils/utils.module';
import { SendgridModule } from './sendgrid/sendgrid.module';

@Module({
  imports: [
    ClientsModule.registerAsync([createClientAsyncOptions('mail')]),
    SendgridModule,
    UtilsModule
  ],
})
export class MailModule {}
