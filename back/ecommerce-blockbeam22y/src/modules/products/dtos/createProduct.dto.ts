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
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  stock: number;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  imgUrl: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  categoryId: string;
}
