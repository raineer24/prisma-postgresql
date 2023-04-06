import { UserType } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
} from 'class-validator';

export class UpdateUserRequest {
  @IsOptional()
  @IsNotEmpty()
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ]+$'))
  @MaxLength(20)
  firstName?: string;

  @IsOptional()
  @IsNotEmpty()
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ ]+$'))
  @MaxLength(40)
  lastName?: string;

  @IsOptional()
  @IsEnum(UserType)
  role?: UserType;

  @IsOptional()
  @IsUrl()
  image?: string;

  @IsOptional()
  @IsNotEmpty()
  username?: string;

  // Reference with cloudinary: public_id
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  image_id?: string;

  // Reference with cloudinary: secure_url
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  image_url?: string;
}
