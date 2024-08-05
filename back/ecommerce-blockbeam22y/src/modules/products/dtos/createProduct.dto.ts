import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsUUID,
  IsNumber,
  IsInt,
  IsPositive,
  IsUrl,
  IsOptional,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({
    description: 'The name of the product',
    minLength: 3,
    maxLength: 50,
    example: 'Mechanical Keyboard RGB',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  @ApiProperty({
    description: 'The description of the product',
    minLength: 3,
    maxLength: 80,
    example: 'Mechanical keyboard with RGB lighting and programmable keys',
  })
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'The price of the product',
    format: 'float',
    example: 129.99,
  })
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  @ApiProperty({
    description: 'The available stock of the product',
    type: 'integer',
    minimum: 1,
    example: 15,
  })
  stock: number;

  @IsOptional()
  @IsString()
  @IsUrl()
  @ApiProperty({
    description: 'The URL of the product image',
    format: 'url',
    required: false,
    example:
      'https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg',
  })
  imgUrl?: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  @ApiProperty({
    description: 'The ID of the product category',
    format: 'uuid',
  })
  categoryId: string;
}
