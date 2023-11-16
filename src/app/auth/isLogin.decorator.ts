import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Users } from 'src/entities/users.entity';

export const IsLogin = createParamDecorator(
  (_data, ctx: ExecutionContext): Users => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
