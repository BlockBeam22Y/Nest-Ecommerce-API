import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from '../users/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp({ password, passwordConfirm, ...userData }) {
    const foundUser = await this.usersRepository.findOneBy({
      email: userData.email,
    });

    if (foundUser) {
      throw new BadRequestException(
        `Email '${userData.email}' is already in use`,
      );
    } else if (password !== passwordConfirm) {
      throw new BadRequestException('Passwords do not match');
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = this.usersRepository.create({
        ...userData,
        password: hashedPassword,
      });

      await this.usersRepository.save(user);
      return user;
    }
  }

  async signIn(email: string, password: string) {
    const user = await this.usersRepository.findOneBy({ email });

    if (user) {
      const isValid = await bcrypt.compare(password, user.password);

      if (isValid) {
        const token = await this.jwtService.signAsync({
          sub: user.id,
          id: user.id,
          email: user.email,
        });

        return token;
      }
    }

    throw new BadRequestException('Email or password invalid');
  }
}
