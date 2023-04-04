import {
  Injectable,
  CanActivate,
  Inject,
  forwardRef,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../users/users.service';
import { map } from 'rxjs/operators';
import { PrismaService } from '../prisma/prisma.service';
import { UserResponse } from '../users/models/user.response';
import { UserRole } from '../core/entities/user.entity';
@Injectable()
export class UserIsUserGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
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
    // throw new ForbiddenException();
    // const params = request.params;
    //  const user: UserResponse = request.user.id;
    //const user = request['user'];
    // console.log('user', user);

    // return this.prisma.user.findUnique({
    //   where: { id: request.user.id },
    // });

    //return this.userService.findOne(request.params.id);

    //console.log('user!', user);

    // return this.userService.find0ne(user.id).pipe(
    //   map((user: User) => {
    //     let hasPermission = false;

    //     if (user.id === Number(params.id)) {
    //       hasPermission = true;
    //     }

    //     return user && hasPermission;
    //   }),
    // );
  }
}
