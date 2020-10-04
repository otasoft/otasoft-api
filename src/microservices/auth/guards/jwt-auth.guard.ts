import { CanActivate, Inject, ExecutionContext } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

export class JwtAuthGuard implements CanActivate {
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
          { role: 'auth', cmd: 'checkJwt' },
          { jwt: req.headers['authorization']?.split(' ')[1]})
          .pipe()
          .toPromise<boolean>();
  
          return res;
      } catch(err) {
        return false;
      }
    }
  }