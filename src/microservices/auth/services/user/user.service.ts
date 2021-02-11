import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import {
  RestAuthChangeResponse,
  RestAuthUser,
  RestAuthUserId,
} from '../../rest/models';
import {
  GqlAuthChangeResponse,
  GqlAuthUser,
  GqlAuthUserId,
} from '../../graphql/models';
import {
  AuthCredentialsDto,
  AuthEmailDto,
  ChangePasswordDto,
  SetNewPasswordDto,
  GetRefreshUserDto,
} from '../../rest/dto';
import {
  AuthCredentialsInput,
  AuthEmailInput,
  ChangePasswordInput,
  SetNewPasswordInput,
} from '../../graphql/input';
import { ClientService } from '@utils/client';
import { SendgridService } from '@mail/sendgrid/services/sendgrid.service';

@Injectable()
export class UserService {
  constructor(
    @Inject('AUTH_MICROSERVICE')
    private readonly authClient: ClientProxy,
    private readonly clientService: ClientService,
    private readonly sendgridService: SendgridService,
  ) {}

  async getUserId(
    authEmailData: AuthEmailDto | AuthEmailInput,
  ): Promise<GqlAuthUserId | RestAuthUserId> {
    return this.clientService.sendMessageWithPayload(
      this.authClient,
      { role: 'user', cmd: 'getId' },
      authEmailData,
    );
  }

  async getUserById(id: number) {
    return this.clientService.sendMessageWithPayload(
      this.authClient,
      { role: 'user', cmd: 'getUserById' },
      id,
    );
  }

  async getUserIfRefreshTokenMatches(
    getRefreshUserData: GetRefreshUserDto,
  ): Promise<GqlAuthUserId | RestAuthUserId> {
    return this.clientService.sendMessageWithPayload(
      this.authClient,
      { role: 'user', cmd: 'getUserIfRefreshTokenMatches' },
      getRefreshUserData,
    );
  }

  async getAuthenticatedUser(
    authCredentialsData: AuthCredentialsDto | AuthCredentialsInput,
  ): Promise<RestAuthUser | GqlAuthUser> {
    return this.clientService.sendMessageWithPayload(
      this.authClient,
      { role: 'user', cmd: 'getAuthenticatedUser' },
      authCredentialsData,
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
    return this.clientService.sendMessageWithPayload(
      this.authClient,
      { role: 'user', cmd: 'changePassword' },
      { id, changePasswordData },
    );
  }

  async deleteUserAccount(
    id: number,
  ): Promise<GqlAuthChangeResponse | RestAuthChangeResponse> {
    return this.clientService.sendMessageWithPayload(
      this.authClient,
      { role: 'user', cmd: 'deleteAccount' },
      id,
    );
  }

  async confirmAccountCreation(token: string): Promise<boolean> {
    return this.clientService.sendMessageWithPayload(
      this.authClient,
      { role: 'user', cmd: 'confirmAccount' },
      token,
    );
  }

  async removeRefreshToken(userId: number): Promise<boolean> {
    return this.clientService.sendMessageWithPayload(
      this.authClient,
      { role: 'user', cmd: 'removeRefreshToken' },
      userId,
    );
  }

  async forgotPassword(
    authEmailData: AuthEmailDto | AuthEmailInput,
  ): Promise<GqlAuthChangeResponse | RestAuthChangeResponse> {
    const forgotPasswordToken: Promise<string> = this.clientService.sendMessageWithPayload(
      this.authClient,
      { role: 'user', cmd: 'forgot-password' },
      authEmailData,
    );

    const response = this.sendgridService.sendForgotPasswordEmail({
      customer_email: authEmailData.email,
      token: await forgotPasswordToken,
    });

    return response;
  }

  async setNewPassword(
    token: string,
    setNewPasswordData: SetNewPasswordDto | SetNewPasswordInput,
  ): Promise<GqlAuthChangeResponse | RestAuthChangeResponse> {
    const user_email = this.clientService.sendMessageWithPayload(
      this.authClient,
      { role: 'user', cmd: 'set-new-password' },
      {
        forgotPasswordToken: token,
        newPassword: setNewPasswordData.new_password,
      },
    );

    const response = this.sendgridService.sendSetNewPasswordEmail({
      customer_email: await user_email,
    });

    return response;
  }
}
