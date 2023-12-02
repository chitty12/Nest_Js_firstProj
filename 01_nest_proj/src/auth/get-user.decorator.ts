import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Auth } from 'src/entity/auth.entity';

// 커스텀 데코레이션 만들기
export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): Auth => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
