import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
  ValidationArguments,
} from 'class-validator';
import { PostI } from 'src/blog/models/post';
const messages: any = {
  minPassword:
    'Password is shorter than 8 characters, please set a minimum 8 characters password.',
  maxPassword:
    'Password is lpnger than 8 characters, please set a maximum 8 characters password.',
};
export class User {
  id?: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  username: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  token?: string;

  @IsOptional()
  @IsDate()
  registerDate?: Date;

  @IsOptional()
  @IsBoolean()
  isNotifyActive?: boolean;

  @IsOptional()
  @IsString()
  theFirstDayOfWeek?: string;

  @IsOptional()
  @IsNumber()
  trainingDays?: number;

  @IsOptional()
  @IsString()
  profilePhoto?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => PostI)
  post?: PostI;
}
