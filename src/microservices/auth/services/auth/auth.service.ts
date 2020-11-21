import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { MicroserviceConnectionService } from '../../../../microservices/microservice-connection/microservice-connection.service';
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
