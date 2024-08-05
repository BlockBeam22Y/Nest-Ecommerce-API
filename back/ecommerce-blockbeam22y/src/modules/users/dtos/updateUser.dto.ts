import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiPropertyOptional({
    description: 'The name of the user',
    minLength: 3,
    maxLength: 50,
    example: 'Marco Rizzi',
  })
  name?: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  @MaxLength(50)
  @ApiPropertyOptional({
    description: 'The email of the user',
    maxLength: 50,
    format: 'email',
    example: 'marco.rizzi@example.com',
  })
  email?: string;

  @IsOptional()
  @IsString()
  @IsStrongPassword({
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @MinLength(8)
  @MaxLength(15)
  @ApiPropertyOptional({
    description: 'The password of the user',
    minLength: 8,
    maxLength: 15,
    format: 'password',
    example: 'Jk4l8Mn7*',
  })
  password?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  @ApiPropertyOptional({
    description: 'The address of the user',
    minLength: 3,
    maxLength: 80,
    example: 'Oak Avenue, House 789',
  })
  address?: string;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @ApiPropertyOptional({
    description: 'The phone number of the user',
    type: 'integer',
    example: 937564123,
  })
  phone?: number;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @ApiPropertyOptional({
    description: 'The country of the user',
    minLength: 5,
    maxLength: 20,
    example: 'France',
  })
  country?: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @ApiPropertyOptional({
    description: 'The city of the user',
    minLength: 5,
    maxLength: 20,
    example: 'Paris',
  })
  city?: string;
}
