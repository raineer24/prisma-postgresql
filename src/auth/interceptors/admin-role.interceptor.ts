import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { UserType } from '@prisma/client';
import { Observable } from 'rxjs';

@Injectable()
export class AdminRoleInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();

    const role = req?.user?.role;

    if (role !== UserType.ADMIN) {
      throw new UnauthorizedException('Unauthorized to access this route');
    }

    return next.handle();
  }
}
