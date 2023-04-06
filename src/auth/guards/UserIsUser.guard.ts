import {
  Injectable,
  CanActivate,
  Inject,
  forwardRef,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PrismaService } from '../../prisma/prisma.service';
import { UserResponse } from '../../users/models/user.response';
import { UserRole } from '../../core/entities/user.entity';
import { UserService } from '../user/user.service';
@Injectable()
export class UserIsUserGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private prisma: PrismaService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    console.log('request', typeof request.user.id);
    console.log('request params', parseInt(request.params.id));

    if (request.user.id === parseInt(request.params.id)) {
      return true;
    }
  }
}
