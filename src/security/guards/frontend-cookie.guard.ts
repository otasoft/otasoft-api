import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class FrontendCookieGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    let req: Request;
    req = context.getArgs()[context.getArgs().length - 2].req;
    if (!req) {
      req = context.switchToHttp().getRequest();
    }

    if (req.cookies.frontend_cookie !== process.env.FRONTEND_COOKIE)
      throw new UnauthorizedException('You cannot access this resource');

    return true;
  }
}
