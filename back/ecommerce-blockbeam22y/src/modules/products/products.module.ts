import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Product from './products.entity';
import preloadData from 'src/utils/preloadData';
import Category from '../categories/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    {
      provide: 'preload',
      useValue: preloadData,
    },
  ],
})
export class ProductsModule {}
