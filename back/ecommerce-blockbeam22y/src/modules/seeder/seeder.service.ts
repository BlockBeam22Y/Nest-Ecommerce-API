import {
  ConflictException,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { PreloadProduct } from 'src/utils/preloadData';
import Category from '../categories/categories.entity';
import Product from '../products/products.entity';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
    @Inject('preload') private readonly preloadData: PreloadProduct[],
  ) {}

  async onModuleInit() {
    const [categoriesCount, productsCount] = await this.seedDatabase();

    console.log(
      `Successfully loaded ${categoriesCount} categories and ${productsCount} products`,
    );
  }

  async seedDatabase(resetData?: boolean) {
    return this.entityManager.transaction(
      async (transactionalEntityManager) => {
        if (resetData) {
          const categories = await transactionalEntityManager.find(Category, {
            relations: {
              products: {
                orderDetails: true,
              },
            },
          });

          for await (const category of categories) {
            for await (const product of category.products) {
              if (product.orderDetails.length) {
                throw new ConflictException(
                  `Product with id '${product.id}' is already included in an order`,
                );
              }

              await transactionalEntityManager.delete(Product, product.id);
            }

            await transactionalEntityManager.delete(Category, category.id);
          }
        }

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

        return [categoriesCount, productsCount];
      },
    );
  }
}
