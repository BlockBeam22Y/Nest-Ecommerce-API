import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import Order from './entities/orders.entity';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import User from '../users/users.entity';
import Product from '../products/products.entity';
import OrderDetail from './entities/orderDetails.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  async getOrder(id: string) {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: {
        orderDetail: {
          products: true,
        },
      },
    });

    if (order) {
      return order;
    } else {
      throw new NotFoundException(`Couldn't find order with id '${id}'`);
    }
  }

  async addOrder(userId: string, productIds: string[]) {
    return this.entityManager.transaction(
      async (transactionalEntityManager) => {
        const user = await transactionalEntityManager.findOneBy(User, {
          id: userId,
        });

        if (!user) {
          throw new BadRequestException(
            `Couldn't find user with id '${userId}'`,
          );
        }

        const orderDetail = transactionalEntityManager.create(OrderDetail, {
          price: 0,
        });
        orderDetail.products = [];

        for await (const productId of productIds) {
          const product = await transactionalEntityManager.findOneBy(Product, {
            id: productId,
          });

          if (!product) {
            throw new BadRequestException(
              `Couldn't find product with id '${productId}'`,
            );
          }

          if (product.stock === 0) {
            throw new BadRequestException(
              `Product with id '${productId}' is out of stock`,
            );
          }

          product.stock--;
          await transactionalEntityManager.save(product);

          orderDetail.products.push(product);
          orderDetail.price += +product.price;
        }

        await transactionalEntityManager.save(orderDetail);

        const order = transactionalEntityManager.create(Order, {
          user,
          date: new Date(),
          orderDetail,
        });
        await transactionalEntityManager.save(order);

        return order;
      },
    );
  }
}
