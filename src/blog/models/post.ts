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

export class PostI {
  id?: number;

  @IsNotEmpty()
  authorId: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(300)
  content: string;
}
