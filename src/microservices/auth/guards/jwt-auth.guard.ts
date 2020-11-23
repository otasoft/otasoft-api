import {
  CanActivate,
  Inject,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';

import { MicroserviceConnectionService } from '../../microservice-connection/microservice-connection.service';

export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject('AUTH_MICROSERVICE')
    private readonly authClient: ClientProxy,
    private readonly microserviceConnectionService: MicroserviceConnectionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let req: Request;
    req = context.getArgs()[context.getArgs().length - 2].req;
    if (!req) {
      req = context.switchToHttp().getRequest();
    }

    if (!req.cookies['Authentication']) throw new UnauthorizedException();

    return this.microserviceConnectionService.sendRequestToClient(
      this.authClient,
      { role: 'auth', cmd: 'checkJwt' },
      { jwt: req.cookies['Authentication'] }
    );
  }
}
