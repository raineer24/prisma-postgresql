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

import { Request } from 'express';
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
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    //const request: Request = context.switchToHttp().getRequest();
    console.log('roles', roles);

    const request = context.switchToHttp().getRequest();
    console.log('request', request);

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
