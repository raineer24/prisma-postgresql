import type { User } from '@prisma/client';
export class LoginResponse {
  token: string;
  email: string;

  constructor(token: string) {
    this.token = token;
  }

  // static fromUserEntity(entity: User): LoginResponse {
  //   const response = new LoginResponse();
  //   response.id = entity.id;

  //   response.email = entity.email;

  //   response.image = entity.image;
  //   response.createdAt = entity.createdAt;
  //   response.lastName = entity.lastName;
  //   response.role = entity.role;
  //   return response;
  // }
}
