import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import Product from './products.interface';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async get(page: number, limit: number) {
    return this.productsRepository.getProducts(page, limit);
  }

  async getById(id: number) {
    return this.productsRepository.getProductById(id);
  }

  async create(productData: Omit<Product, 'id'>) {
    return this.productsRepository.createProduct(productData);
  }

  async update(id: number, productData: Partial<Product>) {
    return this.productsRepository.updateProduct(id, productData);
  }

  async delete(id: number) {
    return this.productsRepository.deleteProduct(id);
  }
}
