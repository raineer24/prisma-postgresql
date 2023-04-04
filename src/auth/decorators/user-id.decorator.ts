import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ITokenPayloadWithRole } from '../../auth/interfaces/tokens.interface';

export const GetUserId = createParamDecorator(
  (_: undefined, ctx: ExecutionContext): number => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user as ITokenPayloadWithRole;
    console.log('user', req);

    if (!user) return null;

    return user.sub;
  },
);
