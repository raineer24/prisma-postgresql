import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginRequest {
  @IsNotEmpty()
  // username or email
  identifier: string;

  @IsNotEmpty()
  password: string;
}
