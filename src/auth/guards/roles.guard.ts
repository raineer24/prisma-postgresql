import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '../user/user.service';

//import { ROLES_KEY } from '../utils/keys.const';
import { ROLES_KEY } from '../../core/decorators/roles.decorator';
//import { UserRole } from '../core/entities/user.entity';
import { UserType } from '@prisma/client';
/**
 * This guards avoid users not having specified roles from accessing routes
 */
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // If no role is provided
    if (!requiredRoles) {
      return true;
    }
    console.log('req.user.role', request.user.role);
    return requiredRoles.map((r) => r.toString()).includes(request.user.role);
  }
}
