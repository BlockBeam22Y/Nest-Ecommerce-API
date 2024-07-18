import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Product from './products.entity';
import Category from '../categories/categories.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async getProducts(page: number, limit: number) {
    return this.productsRepository.find({
      relations: {
        category: true,
      },
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  async getProductById(id: string) {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: {
        category: true,
      },
    });

    if (product) {
      return product;
    } else {
      throw new NotFoundException(`Couldn't find product with id '${id}'`);
    }
  }

  async createProduct({ categoryId, ...productData }) {
    const category = await this.categoriesRepository.findOneBy({
      id: categoryId,
    });

    if (!category) {
      throw new BadRequestException(
        `Couldn't find category with id '${categoryId}'`,
      );
    }

    const product = this.productsRepository.create({
      ...productData,
      category,
    });
    await this.productsRepository.save(product);

    return product.id;
  }

  async updateProduct(id: string, productData: Partial<Product>) {
    const product = await this.productsRepository.findOneBy({ id });

    if (product) {
      await this.productsRepository.update(id, productData);

      return product.id;
    } else {
      throw new NotFoundException(`Couldn't find product with id '${id}'`);
    }
  }

  async deleteProduct(id: string) {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: {
        orderDetails: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Couldn't find product with id '${id}'`);
    } else if (product.orderDetails.length) {
      throw new ConflictException(
        `Product with id '${id}' is already included in an order`,
      );
    } else {
      await this.productsRepository.delete(id);

      return product.id;
    }
  }
}
