import type { User, UserType } from '@prisma/client';

export class UserResponse {
  id: number;

  firstName: string;

  email: string;

  lastName: string;

  // image: string | null;

  username: string;

  createdAt: Date | null; // ISO Date

  updatedAt: Date; // ISO Date

  role?: UserType;

  image_id?: string;

  static fromUserEntity(entity: User): UserResponse {
    const response = new UserResponse();
    response.id = entity.id;

    response.email = entity.email;
    response.username = entity.username;
    // response.image = entity.image;
    response.createdAt = entity.createdAt;
    response.lastName = entity.lastName;
    response.role = entity.role;
    response.image_id = entity.image_id;
    response.firstName = entity.firstName;
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
