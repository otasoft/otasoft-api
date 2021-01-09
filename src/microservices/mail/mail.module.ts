import { Module } from '@nestjs/common';

import { UtilsModule } from '../../utils/utils.module';
import { SendgridModule } from './sendgrid/sendgrid.module';

@Module({
  imports: [
    SendgridModule,
    UtilsModule
  ],
})
export class MailModule {}
