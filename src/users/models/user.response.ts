import type { User } from '@prisma/client';
import { UserRole } from 'src/core/entities/user.entity';

export class UserResponse {
  id: number;

  firstName: string;

  email: string;

  lastName: string;

  // image: string | null;

  username: string;

  createdAt: Date | null; // ISO Date

  updatedAt: Date; // ISO Date

  role: string;

  static fromUserEntity(entity: User): UserResponse {
    const response = new UserResponse();
    response.id = entity.id;

    response.email = entity.email;
    response.username = entity.username;
    // response.image = entity.image;
    response.createdAt = entity.createdAt;
    response.lastName = entity.lastName;
    response.role = entity.role;
    return response;
  }
}

export interface IUser {
  id?: number;
  firstName?: string;
  lastName?: string;
  email: string;
  role: string;
  image_id?: string;
  image_url?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
