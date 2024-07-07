import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import User from './users.interface';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async get(page: number, limit: number) {
    const users = await this.usersRepository.getUsers(page, limit);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return users.map(({ password, ...user }) => user);
  }

  async getById(id: number) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.usersRepository.getUserById(id);

    return user;
  }

  async create(userData: Omit<User, 'id'>) {
    return this.usersRepository.createUser(userData);
  }

  async update(id: number, userData: Partial<User>) {
    return this.usersRepository.updateUser(id, userData);
  }

  async delete(id: number) {
    return this.usersRepository.deleteUser(id);
  }
}
