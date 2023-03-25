import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { User as PrismaUser } from '@prisma/client';

export enum UserRole {
  ADMIN = 'admin',
  CHIEFEDITOR = 'chiefeditor',
  EDITOR = 'editor',
  USER = 'user',
}
export default class User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ enum: UserRole })
  role: UserRole;

  @Exclude()
  password: string;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public static from(
    prismaUser: PrismaUser,
    options?: { withPassword: boolean },
  ) {
    if (!prismaUser) {
      return null;
    }
    const user = new User();
    Object.assign(user, { ...prismaUser });
    if (options) {
      if (!options.withPassword) {
        delete user.password;
      }
    } else {
      delete user.password;
    }
    return user;
  }
}
