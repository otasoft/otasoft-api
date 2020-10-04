import { Module } from '@nestjs/common';
import { SendgridModule } from './sendgrid/sendgrid.module';

@Module({

  imports: [SendgridModule]
})
export class MailModule {}
