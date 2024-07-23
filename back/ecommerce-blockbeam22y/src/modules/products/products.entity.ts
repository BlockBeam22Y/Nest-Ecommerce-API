import Category from 'src/modules/categories/categories.entity';
import OrderDetail from 'src/modules/orders/entities/orderDetails.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({
  name: 'products',
})
export default class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({
    length: 50,
  })
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
  })
  price: number;

  @Column('integer')
  stock: number;

  @Column({
    default:
      'https://res.cloudinary.com/dil8imipm/image/upload/v1721694666/bmnqbnt7zbb1vft9iceu.png',
  })
  imgUrl: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
  orderDetails: OrderDetail[];
}
