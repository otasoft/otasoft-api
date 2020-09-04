import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
    constructor(
        @Inject('AUTH_MICROSERVICE')
        private readonly client: ClientProxy
    ) { }

    async signUp(authCredentialsDto: AuthCredentialsDto){
        return this.client.send({ role: 'user', cmd: 'register' }, authCredentialsDto)
    }

    async signIn(authCredentialsDto: AuthCredentialsDto) {
        return this.client.send({ role: 'user', cmd: 'login' }, authCredentialsDto)
    }
}
