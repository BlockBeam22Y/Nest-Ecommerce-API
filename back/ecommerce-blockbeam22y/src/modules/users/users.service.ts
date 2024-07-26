import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './users.entity';
import Order from '../orders/entities/orders.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
  ) {}

  async getUsers(page: number, limit: number) {
    return this.usersRepository.find({
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  async getUserById(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: {
        orders: true,
      },
    });

    if (user) {
      return user;
    } else {
      throw new NotFoundException(`Couldn't find user with id '${id}'`);
    }
  }

  async updateUser(id: string, userData: Partial<User>) {
    const user = await this.usersRepository.findOneBy({ id });

    if (user) {
      await this.usersRepository.update(id, userData);

      return user.id;
    } else {
      throw new NotFoundException(`Couldn't find user with id '${id}'`);
    }
  }

  async deleteUser(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: {
        orders: true,
      },
    });

    if (user) {
      for await (const order of user.orders) {
        await this.ordersRepository.delete(order);
      }

      await this.usersRepository.delete(id);
      return user.id;
    } else {
      throw new NotFoundException(`Couldn't find user with id '${id}'`);
    }
  }
}
