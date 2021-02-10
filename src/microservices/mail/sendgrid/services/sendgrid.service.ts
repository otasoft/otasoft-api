import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { ClientService } from '@utils/client';
import { SendEmailDto } from '../dto';
import { SuccessResponseModel } from '../models';

@Injectable()
export class SendgridService {
  constructor(
    @Inject('MAIL_MICROSERVICE')
    private readonly mailClient: ClientProxy,
    private readonly clientService: ClientService,
  ) {}

  async sendConfirmCreateAccountEmail(
    sendEmailDto: SendEmailDto,
  ): Promise<SuccessResponseModel> {
    return this.clientService.sendMessageWithPayload(
      this.mailClient,
      { role: 'mail', cmd: 'send', type: 'confirmation' },
      sendEmailDto,
    );
  }

  async sendForgotPasswordEmail(
    sendEmailDto: SendEmailDto,
  ): Promise<SuccessResponseModel> {
    return this.clientService.sendMessageWithPayload(
      this.mailClient,
      { role: 'mail', cmd: 'send', type: 'forgot-password' },
      sendEmailDto,
    );
  }

  async sendSetNewPasswordEmail(
    sendEmailDto: SendEmailDto,
  ): Promise<SuccessResponseModel> {
    return this.clientService.sendMessageWithPayload(
      this.mailClient,
      { role: 'mail', cmd: 'send', type: 'set-new-password' },
      sendEmailDto,
    );
  }

  async sendConfirmBookingEmail(
    sendEmailDto: SendEmailDto,
  ): Promise<SuccessResponseModel> {
    return this.clientService.sendMessageWithPayload(
      this.mailClient,
      { role: 'mail', cmd: 'send', type: 'confirm-booking' },
      sendEmailDto,
    );
  }

  async sendDeleteAccountMail(
    sendEmailDto: SendEmailDto,
  ): Promise<SuccessResponseModel> {
    return this.clientService.sendMessageWithPayload(
      this.mailClient,
      { role: 'mail', cmd: 'send', type: 'delete-account' },
      sendEmailDto,
    );
  }
}
