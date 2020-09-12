import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SignUpCredentialsDto } from './dto/sign-up-credentials.dto';
import { SignInCredentialsDto } from './dto/sign-in-credentials.dto';
import { IMailObject } from 'src/mail/sendgrid/interfaces/mail-object.interface';
import { ICustomerObject } from 'src/customer/interfaces/customer-object.interface';
import { IAuthObject } from './interfaces/auth-object.interface';

@Injectable()
export class LocalAuthService {
    constructor(
        @Inject('AUTH_MICROSERVICE')
        private readonly authClient: ClientProxy,
        @Inject('CUSTOMER_MICROSERVICE')
        private readonly customerClient: ClientProxy,
        @Inject('MAIL_MICROSERVICE')
        private readonly mailClient: ClientProxy
    ) { }

    // Move the logic of each particular microservice to separate methods to increase readability
    async signUp(signUpCredentialsDto: SignUpCredentialsDto): Promise<void> {
        const { first_name, last_name, ...credentials } = signUpCredentialsDto;
        const authObject: IAuthObject = await this.authClient.send({ role: 'local-auth', cmd: 'register' }, credentials).toPromise();
        const { auth_id, token } = authObject;
        if (!auth_id) throw new BadRequestException() // Change to more appropriate exception

        // Refactor -> Move this logic to customer module
        const { email } = credentials;
        const customerObject: ICustomerObject = {
            auth_id,
            first_name,
            last_name
        }
        const isCustomerCreated: Promise<boolean> = await this.customerClient.send({ role: 'customer', cmd: 'create' }, customerObject).toPromise();
        if (!isCustomerCreated) throw new BadRequestException() // Change to more appropriate exception

        const mailObject: IMailObject = { customer_email: email, email_type: 'confirmation', confirmation_token: token }
        await this.mailClient.send({ role: 'mail', cmd: 'send', type: 'confirmation' }, mailObject).toPromise();
    }

    async signIn(signInCredentialsDto: SignInCredentialsDto) {
        return this.authClient.send({ role: 'local-auth', cmd: 'login' }, signInCredentialsDto);
    }

    async getUserId(signInCredentialsDto: SignInCredentialsDto) {
        return this.authClient.send({ role: 'local-auth', cmd: 'getId' }, signInCredentialsDto);
    }

    async confirmAccountCreation(token: string) {
        return this.authClient.send({ role: 'local-auth', cmd: 'confirm' }, token)
    }
}