import Order from 'src/modules/orders/entities/orders.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({
  name: 'users',
})
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({
    length: 50,
  })
  name: string;

  @Column({
    length: 50,
    unique: true,
  })
  email: string;

  @Column({
    length: 20,
  })
  password: string;

  @Column('integer')
  phone: number;

  @Column({
    length: 50,
  })
  country: string;

  @Column()
  address: string;

  @Column({
    length: 50,
  })
  city: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
