import {
  Injectable,
  Inject,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthCredentialsInput } from './graphql/input/auth-credentials.input';
import { AuthEmailInput } from './graphql/input/auth-email.input';
import { GqlAuthUser } from './graphql/models/auth-user-gql.model';
import { GqlAuthUserId } from './graphql/models/auth-user-id-gql.model';
import { GqlAuthUserToken } from './graphql/models/auth-user-token-gql.model';
import { AuthCredentialsDto } from './rest/dto/auth-credentials.dto';
import { AuthEmailDto } from './rest/dto/auth-email.dto';
import { ChangePasswordDto } from './rest/dto/change-password.dto';
import { RestAuthUserId } from './rest/models/auth-user-id-rest.model';
import { RestAuthUser } from './rest/models/auth-user-rest.model';
import { RestAuthUserToken } from './rest/models/auth-user-token-rest.model';
import { RestAuthChangeResponse } from './rest/models/auth-change-response-rest.model';
import { GqlAuthChangeResponse } from './graphql/models/auth-change-response-gql.model';

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

  async confirmAccountCreation(token: string): Promise<boolean> {
    return this.authClient
      .send({ role: 'auth', cmd: 'confirm' }, token)
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

  async getUserId(
    authEmailData: AuthEmailDto | AuthEmailInput,
  ): Promise<GqlAuthUserId | RestAuthUserId> {
    return this.authClient
      .send({ role: 'auth', cmd: 'getId' }, authEmailData)
      .toPromise();
  }

  async changeUserPassword(
    id: number,
    changePasswordDto: ChangePasswordDto,
  ): Promise<GqlAuthChangeResponse | RestAuthChangeResponse> {
    if (changePasswordDto.old_password === changePasswordDto.new_password)
      throw new BadRequestException(
        'New password cannot be the same as the old password',
      );
    try {
      return await this.authClient
        .send(
          { role: 'auth', cmd: 'changePassword' },
          { id, changePasswordDto },
        )
        .toPromise();
    } catch (error) {
      throw new HttpException(error.errorStatus, error.statusCode);
    }
  }

  async deleteUserAccount(
    id: number,
  ): Promise<GqlAuthChangeResponse | RestAuthChangeResponse> {
    return this.authClient
      .send({ role: 'auth', cmd: 'deleteAccount' }, id)
      .toPromise();
  }
}
