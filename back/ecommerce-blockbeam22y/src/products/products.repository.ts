import { Injectable } from '@nestjs/common';

const products = [
  {
    id: 1,
    name: 'Classic Burger',
    description: 'A delicious classic burger with cheese, lettuce, and tomato.',
    price: 8.99,
    stock: true,
    imgUrl: 'https://example.com/images/classic-burger.jpg',
  },
  {
    id: 2,
    name: 'Vegan Burger',
    description:
      'A tasty vegan burger made with a plant-based patty, lettuce, and tomato.',
    price: 9.99,
    stock: true,
    imgUrl: 'https://example.com/images/vegan-burger.jpg',
  },
  {
    id: 3,
    name: 'Chicken Sandwich',
    description: 'A crispy chicken sandwich with lettuce, tomato, and mayo.',
    price: 7.99,
    stock: false,
    imgUrl: 'https://example.com/images/chicken-sandwich.jpg',
  },
  {
    id: 4,
    name: 'Caesar Salad',
    description:
      'A fresh Caesar salad with romaine lettuce, croutons, and Caesar dressing.',
    price: 6.99,
    stock: true,
    imgUrl: 'https://example.com/images/caesar-salad.jpg',
  },
  {
    id: 5,
    name: 'Grilled Cheese',
    description:
      'A classic grilled cheese sandwich with melted cheddar cheese.',
    price: 4.99,
    stock: true,
    imgUrl: 'https://example.com/images/grilled-cheese.jpg',
  },
  {
    id: 6,
    name: 'French Fries',
    description: 'Crispy golden French fries.',
    price: 2.99,
    stock: true,
    imgUrl: 'https://example.com/images/french-fries.jpg',
  },
  {
    id: 7,
    name: 'Chocolate Milkshake',
    description: 'A rich and creamy chocolate milkshake.',
    price: 3.99,
    stock: false,
    imgUrl: 'https://example.com/images/chocolate-milkshake.jpg',
  },
  {
    id: 8,
    name: 'Chicken Caesar Wrap',
    description:
      'A delicious wrap with grilled chicken, romaine lettuce, and Caesar dressing.',
    price: 7.99,
    stock: true,
    imgUrl: 'https://example.com/images/chicken-caesar-wrap.jpg',
  },
  {
    id: 9,
    name: 'BBQ Ribs',
    description: 'Tender and juicy BBQ ribs with a smoky flavor.',
    price: 14.99,
    stock: true,
    imgUrl: 'https://example.com/images/bbq-ribs.jpg',
  },
  {
    id: 10,
    name: 'Apple Pie',
    description:
      'A classic apple pie with a flaky crust and sweet apple filling.',
    price: 5.99,
    stock: true,
    imgUrl: 'https://example.com/images/apple-pie.jpg',
  },
];

@Injectable()
export class ProductsRepository {
  async getProducts() {
    return products;
  }
}
