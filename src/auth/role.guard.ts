import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

import { ROLES_KEY } from '../core/decorators/roles.decorator';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { UserRole } from '../core/entities/user.entity';

/**
 * This guards avoid users not having specified roles from accessing routes
 */
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    console.log('request', request.user);

    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    // If no role is provided
    if (!requiredRoles) {
      return true;
    }
    //return requiredRoles.map((r) => r.toString()).includes(request.user.);
  }
}
