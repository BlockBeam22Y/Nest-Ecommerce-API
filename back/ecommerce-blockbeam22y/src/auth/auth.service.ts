import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async signIn(email: string, password: string) {
    if (await this.usersRepository.loginUser(email, password)) {
      return 'Logged in successfully';
    } else {
      return 'Invalid email or password';
    }
  }
}
