import { Module } from '@nestjs/common';
import { SendgridController } from './sendgrid.controller';
import { SendgridService } from './sendgrid.service';

@Module({
  controllers: [SendgridController],
  providers: [SendgridService]
})
export class SendgridModule {}
