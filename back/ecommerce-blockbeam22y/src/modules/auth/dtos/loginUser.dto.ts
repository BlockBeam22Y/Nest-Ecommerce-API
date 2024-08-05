import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The email of the user',
    format: 'email',
    example: 'john.doe@example.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The password of the user',
    format: 'password',
    example: 'Defc8Cs9*',
  })
  password: string;
}
