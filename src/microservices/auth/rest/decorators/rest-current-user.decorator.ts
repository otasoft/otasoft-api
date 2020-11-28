import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RestCurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
