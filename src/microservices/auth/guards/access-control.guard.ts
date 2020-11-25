import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  HttpException,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';

import { MicroserviceConnectionService } from '../../microservice-connection/microservice-connection.service';
import { IAccessControl } from '../interfaces/access-control.interface';

export class AccessControlGuard implements CanActivate {
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

    const jwt: string = req.cookies['Authentication']

    if (!jwt) throw new UnauthorizedException('User not authenticated');

    const id: number =
      parseInt(req.params.id, 10) || parseInt(context.getArgs()[1].id, 10);

    if (!id) throw new BadRequestException('Missing user ID');

    const accessControlObject: IAccessControl = {
      jwt,
      id,
    };

    return this.microserviceConnectionService.sendRequestToClient(
      this.authClient,
      { role: 'authorization', cmd: 'checkAccess' },
      accessControlObject
    );
  }
}
