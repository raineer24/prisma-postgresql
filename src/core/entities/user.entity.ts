import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { User as PrismaUser } from '@prisma/client';

export enum UserRole {
  ADMIN = 'admin',
  CHIEFEDITOR = 'chiefeditor',
  EDITOR = 'editor',
  USER = 'user',
}
