import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';

import { ClientService } from '@utils/client';
import { IAccessControl } from '../interfaces';

export class AccessControlGuard implements CanActivate {
  constructor(
    @Inject('AUTH_MICROSERVICE')
    private readonly authClient: ClientProxy,
    private readonly clientService: ClientService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let req: Request;
    req = context.getArgs()[context.getArgs().length - 2].req;
    if (!req) {
      req = context.switchToHttp().getRequest();
    }

    const jwt: string = req.cookies['Authentication'];

    if (!jwt) throw new UnauthorizedException('User not authenticated');

    const id: number =
      parseInt(req.params.id, 10) || parseInt(context.getArgs()[1].id, 10);

    if (!id) throw new BadRequestException('Missing user ID');

    const accessControlObject: IAccessControl = {
      jwt,
      id,
    };

    return this.clientService.sendMessageWithPayload(
      this.authClient,
      { role: 'authorization', cmd: 'checkAccess' },
      accessControlObject,
    );
  }
}
