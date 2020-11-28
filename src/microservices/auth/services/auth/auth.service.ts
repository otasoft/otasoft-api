import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { MicroserviceConnectionService } from '../../../../microservices/microservice-connection/microservice-connection.service';
import { AuthCredentialsInput } from '../../graphql/input';
import { GqlAuthUser, GqlAuthUserToken } from '../../graphql/models';
import { AuthCredentialsDto } from '../../rest/dto/auth-credentials.dto';
import { RestAuthUser, RestAuthUserToken } from '../../rest/models';

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
    )
  }

  async signIn(
    authCredentialsData: AuthCredentialsDto | AuthCredentialsInput,
  ): Promise<GqlAuthUserToken | RestAuthUserToken> {
    return this.microserviceConnectionService.sendRequestToClient(
      this.authClient,
      { role: 'auth', cmd: 'login' },
      authCredentialsData,
    )
  }
}
