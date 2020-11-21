import {
  BadRequestException,
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
import { MicroserviceConnectionService } from '../../../../microservices/microservice-connection/microservice-connection.service';
import { ChangePasswordInput } from '../../graphql/input/change-password.input';

@Injectable()
export class UserService {
  constructor(
    @Inject('AUTH_MICROSERVICE')
    private readonly authClient: ClientProxy,
    private readonly microserviceConnectionService: MicroserviceConnectionService,
  ) {}

  async getUserId(
    authEmailData: AuthEmailDto | AuthEmailInput,
  ): Promise<GqlAuthUserId | RestAuthUserId> {
    return this.microserviceConnectionService.sendRequestToClient(
      this.authClient,
      { role: 'auth', cmd: 'getId' },
      authEmailData,
    )
  }

  async changeUserPassword(
    id: number,
    changePasswordData: ChangePasswordDto | ChangePasswordInput,
  ): Promise<GqlAuthChangeResponse | RestAuthChangeResponse> {
    if (changePasswordData.old_password === changePasswordData.new_password)
      throw new BadRequestException(
        'New password cannot be the same as the old password',
      );
    return this.microserviceConnectionService.sendRequestToClient(
      this.authClient,
      { role: 'auth', cmd: 'changePassword' },
      { id, changePasswordData },
    )
  }

  async deleteUserAccount(
    id: number,
  ): Promise<GqlAuthChangeResponse | RestAuthChangeResponse> {
    return this.microserviceConnectionService.sendRequestToClient(
      this.authClient,
      { role: 'auth', cmd: 'deleteAccount' },
      id,
    )
  }

  async confirmAccountCreation(token: string): Promise<boolean> {
    return this.microserviceConnectionService.sendRequestToClient(
      this.authClient,
      { role: 'auth', cmd: 'confirm' },
      token,
    )
  }
}
