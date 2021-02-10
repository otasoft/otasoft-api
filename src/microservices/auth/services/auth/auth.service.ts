import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { AuthCredentialsInput } from '../../graphql/input';
import { GqlAuthUser } from '../../graphql/models';
import { AuthCredentialsDto } from '../../rest/dto';
import { RestAuthUser } from '../../rest/models';
import { ClientService } from '@utils/client';
import { SendgridService } from '@mail/sendgrid/services/sendgrid.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_MICROSERVICE')
    private readonly authClient: ClientProxy,
    private readonly clientService: ClientService,
    private readonly sendgridService: SendgridService,
  ) {}

  async signUp(
    authCredentialsData: AuthCredentialsDto | AuthCredentialsInput,
  ): Promise<GqlAuthUser | RestAuthUser> {
    const authUser: Promise<
      GqlAuthUser | RestAuthUser
    > = this.clientService.sendMessageWithPayload(
      this.authClient,
      { role: 'auth', cmd: 'register' },
      authCredentialsData,
    );

    this.sendgridService.sendConfirmCreateAccountEmail({
      customer_email: authCredentialsData.email,
      token: (await authUser).token,
    });

    return authUser;
  }

  async signIn(authCredentialsData: AuthCredentialsDto | AuthCredentialsInput) {
    return this.clientService.sendMessageWithPayload(
      this.authClient,
      { role: 'auth', cmd: 'login' },
      authCredentialsData,
    );
  }

  async signOut(id: number): Promise<string[]> {
    return this.clientService.sendMessageWithPayload(
      this.authClient,
      { role: 'auth', cmd: 'logout' },
      id,
    );
  }

  async getCookieWithJwtAccessToken(id: number) {
    return this.clientService.sendMessageWithPayload(
      this.authClient,
      { role: 'authorization', cmd: 'getCookieWithJwtAccessToken' },
      id,
    );
  }
}
