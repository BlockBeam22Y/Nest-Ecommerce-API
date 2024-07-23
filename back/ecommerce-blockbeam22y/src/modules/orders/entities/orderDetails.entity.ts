import Order from 'src/modules/orders/entities/orders.entity';
import Product from 'src/modules/products/products.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({
  name: 'order_details',
})
export default class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    default: 0,
  })
  price: number;

  @OneToOne(() => Order, (order) => order.orderDetail)
  order: Order;

  @ManyToMany(() => Product, (product) => product.orderDetails)
  @JoinTable()
  products: Product[];
}
