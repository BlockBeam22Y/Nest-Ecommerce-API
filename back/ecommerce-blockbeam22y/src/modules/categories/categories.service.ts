import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Category from './categories.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async getCategories(showProducts: boolean) {
    return this.categoriesRepository.find({
      relations: {
        products: showProducts,
      },
    });
  }

  async addCategories(categoryNames: string[]) {
    const categories: Category[] = [];

    for await (const categoryName of categoryNames) {
      const foundCategory = await this.categoriesRepository.findOneBy({
        name: categoryName,
      });
      if (foundCategory) continue;

      const category = this.categoriesRepository.create({
        name: categoryName,
      });
      categories.push(category);
    }

    await this.categoriesRepository.save(categories);

    return categories.length;
  }
}
