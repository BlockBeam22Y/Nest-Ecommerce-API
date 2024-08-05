import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({
    description: 'The name of the user',
    minLength: 3,
    maxLength: 50,
    example: 'John Doe',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(50)
  @ApiProperty({
    description: 'The email of the user',
    maxLength: 50,
    format: 'email',
    example: 'john.doe@example.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @MinLength(8)
  @MaxLength(15)
  @ApiProperty({
    description: 'The password of the user',
    minLength: 8,
    maxLength: 15,
    format: 'password',
    example: 'Defc8Cs9*',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The confirmation of the password',
    format: 'password',
    example: 'Defc8Cs9*',
  })
  passwordConfirm: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  @ApiProperty({
    description: 'The address of the user',
    minLength: 3,
    maxLength: 80,
    example: 'Elm Street, Apt 456',
  })
  address: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @ApiProperty({
    description: 'The phone number of the user',
    type: 'integer',
    example: 912345678,
  })
  phone: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @ApiProperty({
    description: 'The country of the user',
    minLength: 5,
    maxLength: 20,
    example: 'Italy',
  })
  country: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @ApiProperty({
    description: 'The city of the user',
    minLength: 5,
    maxLength: 20,
    example: 'Florence',
  })
  city: string;
}
