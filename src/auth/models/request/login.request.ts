import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginRequest {
  @IsNotEmpty()
  // username or email
  email: string;

  @IsNotEmpty()
  password: string;
}
