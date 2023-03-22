import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getMyUser(id: string, req: Request) {
    console.log('test', req.params);
    const decodedUserInfo = req.user as { userId: string; email: string };

    console.log('decoded', decodedUserInfo);
    const foundUser = await this.prisma.user.findUnique({ where: { id } });

    console.log('foundUser', foundUser);

    if (!foundUser) {
      throw new NotFoundException();
    }

    if (foundUser.id !== decodedUserInfo.userId) {
      throw new ForbiddenException();
    }

    delete foundUser.hashedPassword;

    return { user: foundUser };
  }

  async getUsers() {
    return await this.prisma.user.findMany({
      select: { id: true, email: true },
    });
  }
}
