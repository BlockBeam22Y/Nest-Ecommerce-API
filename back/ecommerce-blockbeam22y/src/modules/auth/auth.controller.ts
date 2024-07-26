import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/loginUser.dto';
import { CreateUserDto } from '../users/dtos/createUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
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
  async signIn(@Body() body: LoginUserDto) {
    const { email, password } = body;

    const token = await this.authService.signIn(email, password);
    return {
      message: 'Logged in successfully',
      token,
    };
  }
}
