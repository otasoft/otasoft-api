import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SignUpCredentialsDto } from './dto/sign-up-credentials.dto';
import { SignInCredentialsDto } from './dto/sign-in-credentials.dto';
import { IMailObject } from 'src/mail/sendgrid/interfaces/mail-object.interface';
import { IAuthObject } from './interfaces/auth-object.interface';

@Injectable()
export class LocalAuthService {
    constructor(
        @Inject('AUTH_MICROSERVICE')
        private readonly authClient: ClientProxy,
        @Inject('MAIL_MICROSERVICE')
        private readonly mailClient: ClientProxy
    ) { }

    // For now, sign up and sign in dto is the same, but in the future it will change
    async signUp(signUpCredentialsDto: SignUpCredentialsDto): Promise<void> {
        const authObject: IAuthObject = await this.authClient.send({ role: 'local-auth', cmd: 'register' }, signUpCredentialsDto).toPromise();
        const { auth_id, token } = authObject;
        if (!auth_id) throw new BadRequestException() // Change to more appropriate exception
        
        const { email } = signUpCredentialsDto;
        const mailObject: IMailObject = { customer_email: email, email_type: 'confirmation', confirmation_token: token }
        await this.mailClient.send({ role: 'mail', cmd: 'send', type: 'confirmation' }, mailObject).toPromise();
    }

    async confirmAccountCreation(token: string) {
        return this.authClient.send({ role: 'local-auth', cmd: 'confirm' }, token)
    }

    async signIn(signInCredentialsDto: SignInCredentialsDto) {
        return this.authClient.send({ role: 'local-auth', cmd: 'login' }, signInCredentialsDto);
    }

    async getUserId(signInCredentialsDto: SignInCredentialsDto) {
        return this.authClient.send({ role: 'local-auth', cmd: 'getId' }, signInCredentialsDto);
    }
}