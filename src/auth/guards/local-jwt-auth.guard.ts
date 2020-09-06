import { CanActivate, Inject, ExecutionContext, Logger } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

export class LocalJwtAuthGuard implements CanActivate {
    constructor(
      @Inject('AUTH_MICROSERVICE')
      private readonly client: ClientProxy
    ) {}
  
    async canActivate(
      context: ExecutionContext,
    ): Promise<boolean> {
      const req = context.switchToHttp().getRequest();
  
      try{
        const res = await this.client.send(
          { role: 'auth', cmd: 'check' },
          { jwt: req.headers['authorization']?.split(' ')[1]})
          .pipe()
          .toPromise<boolean>();
  
          return res;
      } catch(err) {
        Logger.error(err);
        return false;
      }
    }
  }