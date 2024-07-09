import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import Order from './orders.entity';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import User from '../users/users.entity';
import Product from '../products/products.entity';
import OrderDetail from './orderDetails.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  async getOrder(id: string) {
    return this.ordersRepository.findOne({
      where: { id },
      relations: {
        orderDetail: {
          products: true,
        },
      },
    });
  }

  async addOrder(userId: string, productIds: string[]) {
    return this.entityManager.transaction(
      async (transactionalEntityManager) => {
        const user = await transactionalEntityManager.findOne(User, {
          where: { id: userId },
          relations: {
            orders: true,
          },
        });

        const orderDetail = transactionalEntityManager.create(OrderDetail, {
          price: 0,
        });
        orderDetail.products = [];

        for await (const productId of productIds) {
          const product = await transactionalEntityManager.findOneBy(Product, {
            id: productId,
          });

          if (product.stock !== 0) {
            product.stock--;
            await transactionalEntityManager.save(product);
            console.log(product);

            orderDetail.products.push(product);
            orderDetail.price += +product.price;
          }
        }

        await transactionalEntityManager.save(orderDetail);

        const order = transactionalEntityManager.create(Order, {
          user,
          date: new Date().toISOString().slice(0, 10),
          orderDetail,
        });
        await transactionalEntityManager.save(order);

        user.orders.push(order);
        await transactionalEntityManager.save(user);

        return order;
      },
    );
  }
}
