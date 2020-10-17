import {
  CanActivate,
  Inject,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject('AUTH_MICROSERVICE')
    private readonly client: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let req: Request;
    req = context.getArgs()[context.getArgs().length - 2].req;
    if (!req) {
      req = context.switchToHttp().getRequest();
    }

    if (!req.headers['authorization']) throw new UnauthorizedException();

    try {
      const res = await this.client
        .send(
          { role: 'auth', cmd: 'checkJwt' },
          { jwt: req.headers['authorization']?.split(' ')[1] },
        )
        .pipe()
        .toPromise<boolean>();

      return res;
    } catch (err) {
      return false;
    }
  }
}
