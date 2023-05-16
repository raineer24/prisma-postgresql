import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { User } from 'src/auth/models/user';

export class PostI {
  id?: number;

  @IsNotEmpty()
  authorId: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(300)
  content: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => User)
  user?: User;
}
