import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RestCsrfToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.cookies._csrf;
  },
);
