import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCategoriesDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  @MinLength(5, { each: true })
  @MaxLength(20, { each: true })
  @ApiProperty({
    description: 'The names of the categories to be created',
    minLength: 5,
    maxLength: 20,
    example: ['tablet', 'headphones'],
  })
  categoryNames: string[];
}
