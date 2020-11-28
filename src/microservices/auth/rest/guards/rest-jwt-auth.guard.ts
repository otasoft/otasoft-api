import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RestJwtAuthGuard extends AuthGuard('jwt') {}
