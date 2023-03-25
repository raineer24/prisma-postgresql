import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  Logger,
  ConflictException,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from '../prisma.service';
import { AuthUser } from '../auth/auth-user';
import { Usr } from './user.decorator';
import { UserResponse } from './models/user.response';
import { UpdateUserRequest } from './models/request/update-user-request.model';
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

  async updateUser(
    userId: number,
    updateRequest: UpdateUserRequest,
  ): Promise<UserResponse> {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data: {
          ...updateRequest,
        },
      });
      console.log('request', updateRequest);
      console.log('updateUser', updatedUser);
      return UserResponse.fromUserEntity(updatedUser);
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new ConflictException();
    }
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
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    });
  }
}
