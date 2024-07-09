import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async getUsers(page: number, limit: number) {
    const users = await this.usersRepository.find({
      take: limit,
      skip: (page - 1) * limit,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return users.map(({ password, ...user }) => user);
  }

  async getUserById(id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, orders, ...user } = await this.usersRepository.findOne({
      where: { id },
      relations: {
        orders: true,
      },
    });

    return {
      ...user,
      orders: orders.map(({ id, date }) => ({ id, date })),
    };
  }

  async createUser(userData: Omit<User, 'id' | 'orders'>) {
    const user = this.usersRepository.create(userData);
    await this.usersRepository.save(user);

    return user.id;
  }

  async updateUser(id: string, userData: Partial<User>) {
    await this.usersRepository.update(id, userData);

    return id;
  }

  async deleteUser(id: string) {
    await this.usersRepository.delete(id);

    return id;
  }
}
