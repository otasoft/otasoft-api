import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { RestAuthChangeResponse, RestAuthUserId } from '../../rest/models';
import { GqlAuthChangeResponse, GqlAuthUserId } from '../../graphql/models';
import { AuthEmailDto, ChangePasswordDto } from '../../rest/dto';
import { AuthEmailInput, ChangePasswordInput } from '../../graphql/input';
import { MicroserviceConnectionService } from '../../../../microservices/microservice-connection/microservice-connection.service';
import { GetRefreshUserIdDto } from '../../rest/dto/ger-refresh-user-id.dto';

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
      { role: 'user', cmd: 'getId' },
      authEmailData,
    );
  }

  async getUserIfRefreshTokenMatches(
    getRefreshUserIdData: GetRefreshUserIdDto,
  ): Promise<GqlAuthUserId | RestAuthUserId> {
    return this.microserviceConnectionService.sendRequestToClient(
      this.authClient,
      { role: 'user', cmd: 'getRefreshUserId' },
      getRefreshUserIdData,
    );
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
      { role: 'user', cmd: 'changePassword' },
      { id, changePasswordData },
    );
  }

  async deleteUserAccount(
    id: number,
  ): Promise<GqlAuthChangeResponse | RestAuthChangeResponse> {
    return this.microserviceConnectionService.sendRequestToClient(
      this.authClient,
      { role: 'user', cmd: 'deleteAccount' },
      id,
    );
  }

  async confirmAccountCreation(token: string): Promise<boolean> {
    return this.microserviceConnectionService.sendRequestToClient(
      this.authClient,
      { role: 'user', cmd: 'confirmAccount' },
      token,
    );
  }

  async removeRefreshToken(userId: number): Promise<boolean> {
    return this.microserviceConnectionService.sendRequestToClient(
      this.authClient,
      { role: 'user', cmd: 'removeRefreshToken' },
      userId,
    );
  }
}
