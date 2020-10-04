import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
// import { IMailObject } from 'src/mail/sendgrid/interfaces/mail-object.interface';
import { GqlAuthUser } from './graphql/models/auth-user-gql.model';
import { GqlAuthUserId } from './graphql/models/auth-user-id-gql.model';
import { GqlAuthUserToken } from './graphql/models/auth-user-token-gql.model';
import { AuthCredentialsDto } from './rest/dto/auth-credentials.dto';
import { RestAuthUserId } from './rest/models/auth-user-id-rest.model';
import { RestAuthUser } from './rest/models/auth-user-rest.model';
import { RestAuthUserToken } from './rest/models/auth-user-token-rest.model';

@Injectable()
export class AuthService {
    constructor(
        @Inject('AUTH_MICROSERVICE')
        private readonly authClient: ClientProxy,
        // @Inject('MAIL_MICROSERVICE')
        // private readonly mailClient: ClientProxy
    ) { }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<GqlAuthUser | RestAuthUser> {
        return await this.authClient.send({ role: 'auth', cmd: 'register' }, authCredentialsDto).toPromise();

        // Create microservice event emiter for `auth-user-created` event and react for it in customer module/microservice.

        // const authObject: GqlAuthUser | RestAuthUser = await this.authClient.send({ role: '-auth', cmd: 'register' }, AuthCredentialsDto).toPromise();
        // const { auth_id, token } = authObject;
        // if (!auth_id) throw new BadRequestException() // Change to more appropriate exception
        
        // const { email } = AuthCredentialsDto;
        // const mailObject: IMailObject = { customer_email: email, email_type: 'confirmation', confirmation_token: token }
        // await this.mailClient.send({ role: 'mail', cmd: 'send', type: 'confirmation' }, mailObject).toPromise();
    }

    async confirmAccountCreation(token: string): Promise<boolean> {
        return this.authClient.send({ role: 'auth', cmd: 'confirm' }, token).toPromise();
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<GqlAuthUserToken | RestAuthUserToken> {
        return this.authClient.send({ role: 'auth', cmd: 'login' }, authCredentialsDto).toPromise();
    }

    async getUserId(authCredentialsDto: AuthCredentialsDto): Promise<GqlAuthUserId | RestAuthUserId> {
        return this.authClient.send({ role: 'auth', cmd: 'getId' }, authCredentialsDto).toPromise();
    }
}