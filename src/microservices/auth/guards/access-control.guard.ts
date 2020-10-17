import { BadRequestException, CanActivate, ExecutionContext, HttpException, Inject, UnauthorizedException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Request } from "express";
import { IAccessControl } from "../interfaces/access-control.interface";

export class AccessControlGuard implements CanActivate {
    constructor(
        @Inject('AUTH_MICROSERVICE')
        private readonly authClient: ClientProxy,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        let req: Request;
        req = context.getArgs()[context.getArgs().length - 2].req;
        if (!req) {
            req = context.switchToHttp().getRequest();
        }

        const jwt: string = req.headers['authorization']?.split(' ')[1];
        const id: number = parseInt(req.params.id, 10);

        const accessControlObject: IAccessControl = {
            jwt,
            id
        }

        if (!jwt) throw new UnauthorizedException('User not authenticated');
        if (!id) throw new BadRequestException('Missing user ID')

        try {
            const res = await this.authClient.send({ role: 'auth', cmd: 'checkAccess' }, accessControlObject).pipe().toPromise<boolean>();

            return res;
        } catch (error) {
            throw new HttpException(error.errorStatus, error.statusCode);
        }
    }
}