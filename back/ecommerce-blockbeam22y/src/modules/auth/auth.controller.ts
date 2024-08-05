import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/loginUser.dto';
import { CreateUserDto } from '../users/dtos/createUser.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiCreatedResponse({
    description: 'The user is created successfully',
  })
  @ApiBadRequestResponse({
    description:
      'The data provided is invalid, the passwords do not match or the email is already in use',
  })
  async signUp(@Body() body: CreateUserDto) {
    const {
      name,
      email,
      phone,
      country,
      address,
      city,
      password,
      passwordConfirm,
    } = body;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: pw, ...userData } = await this.authService.signUp({
      name,
      email,
      phone,
      country,
      address,
      city,
      password,
      passwordConfirm,
    });

    return userData;
  }

  @Post('signin')
  @ApiCreatedResponse({
    description: 'The user is successfully logged in',
  })
  @ApiBadRequestResponse({
    description: 'The user does not exist or the password is invalid',
  })
  async signIn(@Body() body: LoginUserDto) {
    const { email, password } = body;

    const token = await this.authService.signIn(email, password);
    return {
      message: 'Logged in successfully',
      token,
    };
  }
}
