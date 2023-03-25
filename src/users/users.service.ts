import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from '../prisma.service';
import { AuthUser } from '../auth/auth-user';
import { Usr } from './user.decorator';
import { UserResponse } from './models/user.response';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getMyUser(id: string, req: Request) {
    // console.log('test', req);
    // const decodedUserInfo = req.user as { userId: string; email: string };
    // console.log('decoded', decodedUserInfo);
    // const foundUser = await this.prisma.user.findUnique({ where: { id } });
    // console.log('foundUser', foundUser);
    // if (!foundUser) {
    //   throw new NotFoundException();
    // }
    // if (foundUser.id !== decodedUserInfo.userId) {
    //   throw new ForbiddenException();
    // }
    // delete foundUser.hashedPassword;
    // return { user: foundUser };
  }

  public async getUserEntityById(id: number): Promise<UserResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });
    console.log('users service', user);
    return UserResponse.fromUserEntity(user);
  }

  async getUsers() {
    return await this.prisma.user.findMany({
      select: { id: true, email: true },
    });
  }
}
