import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Category from './categories.entity';
import { Repository } from 'typeorm';
import { PreloadProduct } from 'src/utils/preloadData';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
    @Inject('preload') private readonly preloadData: PreloadProduct[],
  ) {}

  async getCategories() {
    return this.categoriesRepository.find({
      relations: {
        products: true,
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

  async preloadCategories() {
    const categoryNames: string[] = this.preloadData.map(
      (product) => product.category,
    );

    return this.addCategories([...new Set(categoryNames)]);
  }
}
