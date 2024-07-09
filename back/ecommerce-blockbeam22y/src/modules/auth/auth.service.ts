import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from '../users/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.usersRepository.findOneBy({ email, password });

    if (user) {
      return 'Logged in successfully';
    } else {
      return 'Invalid email or password';
    }
  }
}
