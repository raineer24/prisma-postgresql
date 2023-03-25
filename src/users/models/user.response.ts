import type { User } from '@prisma/client';

export class UserResponse {
  id: number;

  firstName: string;

  email: string;

  lastName: string;

  image: string | null;

  createdAt: Date | null; // ISO Date

  updatedAt: Date; // ISO Date

  role: string;

  static fromUserEntity(entity: User): UserResponse {
    const response = new UserResponse();
    response.id = entity.id;

    response.email = entity.email;

    response.image = entity.image;
    response.createdAt = entity.createdAt;
    response.lastName = entity.lastName;
    response.role = entity.role;
    return response;
  }
}
