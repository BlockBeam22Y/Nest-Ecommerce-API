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
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  description: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  price: number;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @IsPositive()
  stock: number;

  @IsOptional()
  @IsString()
  @IsUrl()
  imgUrl: string;
}
