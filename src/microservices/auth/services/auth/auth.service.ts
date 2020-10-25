import { Injectable, Inject, HttpException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthCredentialsInput } from '../../graphql/input/auth-credentials.input';
import { GqlAuthUser } from '../../graphql/models/auth-user-gql.model';
import { GqlAuthUserToken } from '../../graphql/models/auth-user-token-gql.model';
import { AuthCredentialsDto } from '../../rest/dto/auth-credentials.dto';
import { RestAuthUser } from '../../rest/models/auth-user-rest.model';
import { RestAuthUserToken } from '../../rest/models/auth-user-token-rest.model';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_MICROSERVICE')
    private readonly authClient: ClientProxy,
  ) {}

  async signUp(
    authCredentialsData: AuthCredentialsDto | AuthCredentialsInput,
  ): Promise<GqlAuthUser | RestAuthUser> {
    return await this.authClient
      .send({ role: 'auth', cmd: 'register' }, authCredentialsData)
      .toPromise();
  }

  async signIn(
    authCredentialsData: AuthCredentialsDto | AuthCredentialsInput,
  ): Promise<GqlAuthUserToken | RestAuthUserToken> {
    try {
      return await this.authClient
        .send({ role: 'auth', cmd: 'login' }, authCredentialsData)
        .toPromise();
    } catch (error) {
      throw new HttpException(error.errorStatus, error.statusCode);
    }
  }
}
