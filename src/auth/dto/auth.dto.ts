import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from '../decorators';

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /******************************
      Min 1 uppercase letter.
      Min 1 lowercase letter.
      Min 1 special character.
      Min 1 number.
      Min 6 characters.
      Max 30 characters.
   */
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  @Matches(
    /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{5,}$/,
    {
      message:
        'Password to week and must be at least 1 uppercase, 1 lowercase, 1 number and 1 special character',
    },
  )
  password: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(30)
  @Match('password')
  confirmPassword?: string;
}
