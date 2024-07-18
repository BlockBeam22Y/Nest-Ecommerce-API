import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/loginUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() body: LoginUserDto) {
    const { email, password } = body;

    await this.authService.signIn(email, password);
    return {
      message: 'Logged in successfully',
      login: true,
    };
  }
}
