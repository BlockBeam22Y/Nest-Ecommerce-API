import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Product from './products.entity';
import Category from '../categories/categories.entity';
import { Repository } from 'typeorm';
import { PreloadProduct } from 'src/utils/preloadData';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
    @Inject('preload') private readonly preloadData: PreloadProduct[],
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
    return this.productsRepository.findOne({
      where: { id },
      relations: {
        category: true,
      },
    });
  }

  async createProduct({ categoryId, ...productData }) {
    const product = this.productsRepository.create({
      ...productData,
      category: { id: categoryId },
    });
    await this.productsRepository.save(product);

    return product.id;
  }

  async updateProduct(id: string, productData: Partial<Product>) {
    await this.productsRepository.update(id, productData);

    return id;
  }

  async deleteProduct(id: string) {
    await this.productsRepository.delete(id);

    return id;
  }
}
