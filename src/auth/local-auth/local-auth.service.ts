import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { SignUpCredentialsDto } from './dto/sign-up-credentials.dto';
import { SignInCredentialsDto } from './dto/sign-in-credentials.dto';
import { Observable } from 'rxjs';
import { IMailObject } from 'src/mail/sendgrid/interfaces/mail-object.interface';
import { ICustomerObject } from 'src/customer/interfaces/customer-object.interface';

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

    async signUp(signUpCredentialsDto: SignUpCredentialsDto) {
        const { first_name, last_name, ...credentials } = signUpCredentialsDto;
        let auth_id: number;

        try {
            auth_id = await this.authClient.send({ role: 'local-auth', cmd: 'register' }, credentials).toPromise();
        } catch (error) {
            throw new RpcException(error);
        }

        const { email } = credentials;
        const customerObject: ICustomerObject = {
            auth_id,
            first_name,
            last_name
        }
        let customerCreated: Observable<any>;
        try {
            if (auth_id) {
                customerCreated = this.customerClient.send({ role: 'customer', cmd: 'create' }, customerObject);
            }
        } catch (error) {
            throw new RpcException(error);
        }

        try {
            if (auth_id && customerCreated) {
                const mailObject: IMailObject = { emailTo: email, emailType: 'confirmation' }
                this.mailClient.send({ role: 'mail', cmd: 'send' }, mailObject)
                return 'User created';
            }
        } catch (error) {
            throw new RpcException(error);
        }
    }

    async signIn(signInCredentialsDto: SignInCredentialsDto) {
        return this.authClient.send({ role: 'local-auth', cmd: 'login' }, signInCredentialsDto);
    }

    async getUserId(signInCredentialsDto: SignInCredentialsDto) {
        return this.authClient.send({ role: 'local-auth', cmd: 'getId' }, signInCredentialsDto);
    }
}