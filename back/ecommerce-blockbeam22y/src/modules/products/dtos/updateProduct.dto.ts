import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
  IsInt,
  IsPositive,
  IsUrl,
  IsOptional,
} from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiPropertyOptional({
    description: 'The name of the product',
    minLength: 3,
    maxLength: 50,
    example: 'Gaming Mouse Pro',
  })
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  @ApiPropertyOptional({
    description: 'The description of the product',
    minLength: 3,
    maxLength: 80,
    example: 'High-precision gaming mouse with customizable DPI settings',
  })
  description?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @ApiPropertyOptional({
    description: 'The price of the product',
    format: 'float',
    example: 89.99,
  })
  price?: number;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @IsPositive()
  @ApiPropertyOptional({
    description: 'The available stock of the product',
    type: 'integer',
    minimum: 1,
    example: 20,
  })
  stock?: number;

  @IsOptional()
  @IsString()
  @IsUrl()
  @ApiPropertyOptional({
    description: 'The URL of the product image',
    format: 'url',
    example:
      'https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg',
  })
  imgUrl?: string;
}
