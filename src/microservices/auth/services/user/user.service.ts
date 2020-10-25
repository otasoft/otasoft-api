import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RestAuthChangeResponse } from '../../rest/models/auth-change-response-rest.model';
import { GqlAuthChangeResponse } from '../../graphql/models/auth-change-response-gql.model';
import { AuthEmailDto } from '../../rest/dto/auth-email.dto';
import { ChangePasswordDto } from '../../rest/dto/change-password.dto';
import { RestAuthUserId } from '../../rest/models/auth-user-id-rest.model';
import { GqlAuthUserId } from '../../graphql/models/auth-user-id-gql.model';
import { AuthEmailInput } from '../../graphql/input/auth-email.input';

@Injectable()
export class UserService {
  constructor(
    @Inject('AUTH_MICROSERVICE')
    private readonly authClient: ClientProxy,
  ) {}

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

  async confirmAccountCreation(token: string): Promise<boolean> {
    return this.authClient
      .send({ role: 'auth', cmd: 'confirm' }, token)
      .toPromise();
  }
}
