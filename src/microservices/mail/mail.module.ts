import { Module } from '@nestjs/common';

import { UtilsModule } from '@utils/utils.module';
import { SendgridModule } from './sendgrid/sendgrid.module';

@Module({
  imports: [SendgridModule, UtilsModule],
  exports: [SendgridModule],
})
export class MailModule {}
