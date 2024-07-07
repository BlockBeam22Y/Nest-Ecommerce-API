import { Injectable } from '@nestjs/common';
import User from './users.interface';

let users: User[] = [
  {
    id: 1,
    email: 'Sincere@april.biz',
    name: 'Leanne Graham',
    password: 'password123',
    address: 'Kulas Light, Apt. 556',
    phone: '1-770-736-8031 x56442',
    city: 'Gwenborough',
  },
  {
    id: 2,
    email: 'Shanna@melissa.tv',
    name: 'Ervin Howell',
    password: 'password123',
    address: 'Victor Plains, Suite 879',
    phone: '010-692-6593 x09125',
    city: 'Wisokyburgh',
  },
  {
    id: 3,
    email: 'Nathan@yesenia.net',
    name: 'Clementine Bauch',
    password: 'password123',
    address: 'Douglas Extension, Suite 847',
    phone: '1-463-123-4447',
    city: 'McKenziehaven',
  },
  {
    id: 4,
    email: 'Julianne.OConner@kory.org',
    name: 'Patricia Lebsack',
    password: 'password123',
    address: 'Hoeger Mall, Apt. 692',
    phone: '493-170-9623 x156',
    city: 'South Elvis',
  },
  {
    id: 5,
    email: 'Lucio_Hettinger@annie.ca',
    name: 'Chelsey Dietrich',
    password: 'password123',
    address: 'Skiles Walks, Suite 351',
    phone: '(254)954-1289',
    city: 'Roscoeview',
  },
  {
    id: 6,
    email: 'Karley_Dach@jasper.info',
    name: 'Mrs. Dennis Schulist',
    password: 'password123',
    address: 'Norberto Crossing, Apt. 950',
    phone: '1-477-935-8478 x6430',
    city: 'South Christy',
  },
  {
    id: 7,
    email: 'Telly.Hoeger@billy.biz',
    name: 'Kurtis Weissnat',
    password: 'password123',
    address: 'Rex Trail, Suite 280',
    phone: '210.067.6132',
    city: 'Howemouth',
  },
  {
    id: 8,
    email: 'Sherwood@rosamond.me',
    name: 'Nicholas Runolfsdottir V',
    password: 'password123',
    address: 'Ellsworth Summit, Suite 729',
    phone: '586.493.6943 x140',
    city: 'Aliyaview',
  },
  {
    id: 9,
    email: 'Chaim_McDermott@dana.io',
    name: 'Glenna Reichert',
    password: 'password123',
    address: 'Dayna Park, Suite 449',
    phone: '(775)976-6794 x41206',
    city: 'Bartholomebury',
  },
  {
    id: 10,
    email: 'Rey.Padberg@karina.biz',
    name: 'Clementina DuBuque',
    password: 'password123',
    address: 'Kattie Turnpike, Suite 198',
    phone: '024-648-3804',
    city: 'Lebsackbury',
  },
];

let id = 11;

@Injectable()
export class UsersRepository {
  async getUsers(page: number, limit: number) {
    const offset = (page - 1) * limit;

    return users.slice(offset, offset + limit);
  }

  async getUserById(id: number) {
    const user = users.find((user) => user.id === id);

    return user;
  }

  async createUser(userData: Omit<User, 'id'>) {
    const user = {
      id: id++,
      ...userData,
    };

    users = [...users, user];
    return user.id;
  }

  async updateUser(id: number, userData: Partial<User>) {
    users = users.map((user) => {
      if (user.id === id) {
        return {
          id,
          email: userData.email ?? user.email,
          name: userData.name ?? user.name,
          password: userData.password ?? user.password,
          address: userData.address ?? user.address,
          phone: userData.phone ?? user.phone,
          city: userData.city ?? user.city,
        };
      } else {
        return user;
      }
    });

    return id;
  }

  async deleteUser(id: number) {
    users = users.filter((user) => user.id !== id);

    return id;
  }

  async loginUser(email: string, password: string) {
    const user = users.find(
      (user) => user.email === email && user.password === password,
    );

    return !!user;
  }
}
