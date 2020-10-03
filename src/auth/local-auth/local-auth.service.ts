import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IMailObject } from 'src/mail/sendgrid/interfaces/mail-object.interface';
import { GqlLocalAuthUser } from './graphql/models/local-auth-user-gql.model';
import { GqlLocalAuthUserId } from './graphql/models/local-auth-user-id-gql.model';
import { GqlLocalAuthUserToken } from './graphql/models/local-auth-user-token-gql.model';
import { LocalAuthCredentialsDto } from './rest/dto/local-auth-credentials.dto';
import { RestLocalAuthUserId } from './rest/models/local-auth-user-id-rest.model';
import { RestLocalAuthUser } from './rest/models/local-auth-user-rest.model';
import { RestLocalAuthUserToken } from './rest/models/local-auth-user-token-rest.model';

@Injectable()
export class LocalAuthService {
    constructor(
        @Inject('AUTH_MICROSERVICE')
        private readonly authClient: ClientProxy,
        @Inject('MAIL_MICROSERVICE')
        private readonly mailClient: ClientProxy
    ) { }

    async signUp(localAuthCredentialsDto: LocalAuthCredentialsDto): Promise<void> {
        const authObject: GqlLocalAuthUser | RestLocalAuthUser = await this.authClient.send({ role: 'local-auth', cmd: 'register' }, localAuthCredentialsDto).toPromise();
        const { auth_id, token } = authObject;
        if (!auth_id) throw new BadRequestException() // Change to more appropriate exception
        
        const { email } = localAuthCredentialsDto;
        const mailObject: IMailObject = { customer_email: email, email_type: 'confirmation', confirmation_token: token }
        await this.mailClient.send({ role: 'mail', cmd: 'send', type: 'confirmation' }, mailObject).toPromise();
    }

    async confirmAccountCreation(token: string): Promise<boolean> {
        return this.authClient.send({ role: 'local-auth', cmd: 'confirm' }, token).toPromise();
    }

    async signIn(localAuthCredentialsDto: LocalAuthCredentialsDto): Promise<GqlLocalAuthUserToken | RestLocalAuthUserToken> {
        return this.authClient.send({ role: 'local-auth', cmd: 'login' }, localAuthCredentialsDto).toPromise();
    }

    async getUserId(localAuthCredentialsDto: LocalAuthCredentialsDto): Promise<GqlLocalAuthUserId | RestLocalAuthUserId> {
        return this.authClient.send({ role: 'local-auth', cmd: 'getId' }, localAuthCredentialsDto).toPromise();
    }
}