import { Injectable } from '@nestjs/common';

import { ClientService } from '../../../utils/client';
import { SendEmailDto } from './dto';
import { SuccessResponseModel } from './models';

@Injectable()
export class SendgridService {
    constructor(private readonly clientService: ClientService) {}

    async sendConfirmCreateAccountEmail(
        sendEmailDto: SendEmailDto
    ): Promise<SuccessResponseModel> {

    }
}
