import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ITokenPayloadWithRole } from '../interfaces/tokens.interface';

export const GetUserId = createParamDecorator(
  (_: undefined, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const request = ctx.switchToHttp().getRequest();
    const user = req.user as ITokenPayloadWithRole;
    console.log('user', user);
    const id = typeof parseFloat(user.sub);
    console.log('ud', id);

    if (!user) return null;

    return user.sub;
  },
);
