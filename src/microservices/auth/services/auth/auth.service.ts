import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { MicroserviceConnectionService } from '../../../../microservices/microservice-connection/microservice-connection.service';
import { AuthCredentialsInput } from '../../graphql/input';
import { GqlAuthUser } from '../../graphql/models';
import { UserModel } from '../../models';
import { AuthCredentialsDto } from '../../rest/dto/auth-credentials.dto';
import { RestAuthUser } from '../../rest/models';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_MICROSERVICE')
    private readonly authClient: ClientProxy,
    private readonly microserviceConnectionService: MicroserviceConnectionService,
  ) {}

  async signUp(
    authCredentialsData: AuthCredentialsDto | AuthCredentialsInput,
  ): Promise<GqlAuthUser | RestAuthUser> {
    return this.microserviceConnectionService.sendRequestToClient(
      this.authClient,
      { role: 'auth', cmd: 'register' },
      authCredentialsData,
    );
  }

  async signIn(
    authCredentialsData: AuthCredentialsDto | AuthCredentialsInput,
  ) {
    return this.microserviceConnectionService.sendRequestToClient(
      this.authClient,
      { role: 'auth', cmd: 'login' },
      authCredentialsData,
    );
  }

  async signOut(id: number): Promise<string[]> {
    return this.microserviceConnectionService.sendRequestToClient(
      this.authClient,
      { role: 'auth', cmd: 'logout' },
      id,
    );
  }

  async getCookieWithJwtAccessToken(id: number) {
    return this.microserviceConnectionService.sendRequestToClient(
      this.authClient,
      { role: 'authorization', cmd: 'getCookieWithJwtAccessToken' },
      id,
    );
  }

  async getAuthenticatedUser(email: string, password: string) {
    return this.microserviceConnectionService.sendRequestToClient(
      this.authClient,
      { role: 'authorization', cmd: 'getAuthenticatedUser' },
      { email, password },
    );
  }
}
