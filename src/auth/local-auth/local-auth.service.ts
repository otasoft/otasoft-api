import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SignUpCredentialsDto } from './dto/sign-up-credentials.dto';
import { SignInCredentialsDto } from './dto/sign-in-credentials.dto';

@Injectable()
export class LocalAuthService {
    constructor(
        @Inject('AUTH_MICROSERVICE')
        private readonly authClient: ClientProxy,
        @Inject('CUSTOMER_MICROSERVICE')
        private readonly customerClient: ClientProxy
    ) { }

    async signUp(signUpCredentialsDto: SignUpCredentialsDto) {
        const { first_name, last_name, ...credentials } = signUpCredentialsDto;
        const auth_id = await this.authClient.send({ role: 'local-auth', cmd: 'register' }, credentials).toPromise();
        const customerObject = {
            auth_id,
            first_name,
            last_name
        }
        return this.customerClient.send({ role: 'customer', cmd: 'create' }, customerObject);
    }

    async signIn(signInCredentialsDto: SignInCredentialsDto) {
        return this.authClient.send({ role: 'local-auth', cmd: 'login' }, signInCredentialsDto);
    }

    async getUserId(signInCredentialsDto: SignInCredentialsDto) {
        return this.authClient.send({ role: 'local-auth', cmd: 'getId' }, signInCredentialsDto);
    }
}