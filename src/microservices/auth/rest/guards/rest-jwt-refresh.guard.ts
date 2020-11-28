import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RestJwtRefreshGuard extends AuthGuard('jwt-refresh-token') {}
