import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { PreloadProduct } from './utils/preloadData';
import Category from './modules/categories/categories.entity';
import Product from './modules/products/products.entity';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
    @Inject('preload') private readonly preloadData: PreloadProduct[],
  ) {}

  async onModuleInit() {
    await this.seedDatabase();
  }

  private async seedDatabase() {
    await this.entityManager.transaction(async (transactionalEntityManager) => {
      const categories: Record<string, Category> = {};
      let categoriesCount = 0;

      for await (const preloadProduct of this.preloadData) {
        if (categories[preloadProduct.category]) continue;

        const foundCategory = await transactionalEntityManager.findOneBy(
          Category,
          {
            name: preloadProduct.category,
          },
        );

        if (foundCategory) {
          categories[preloadProduct.category] = foundCategory;
        } else {
          const category = transactionalEntityManager.create(Category, {
            name: preloadProduct.category,
          });

          await transactionalEntityManager.save(category);

          categories[preloadProduct.category] = category;
          categoriesCount++;
        }
      }

      let productsCount = 0;

      for await (const preloadProduct of this.preloadData) {
        const foundProduct = await transactionalEntityManager.findOneBy(
          Product,
          {
            name: preloadProduct.name,
          },
        );

        if (foundProduct) continue;

        const product = transactionalEntityManager.create(Product, {
          ...preloadProduct,
          category: categories[preloadProduct.category],
        });

        await transactionalEntityManager.save(product);
        productsCount++;
      }

      console.log(
        `Successfully loaded ${categoriesCount} categories and ${productsCount} products`,
      );
    });
  }
}
