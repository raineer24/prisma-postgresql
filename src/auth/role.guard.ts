import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../users/users.service';

import { ROLES_KEY } from '../core/decorators/roles.decorator';

import { UserRole } from '../core/entities/user.entity';

/**
 * This guards avoid users not having specified roles from accessing routes
 */
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // If no role is provided
    if (!requiredRoles) {
      return true;
    }
    return requiredRoles.map((r) => r.toString()).includes(request.user.role);
  }
}
