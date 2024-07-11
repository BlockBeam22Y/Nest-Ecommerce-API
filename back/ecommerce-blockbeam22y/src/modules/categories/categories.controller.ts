import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async get() {
    return this.categoriesService.getCategories();
  }

  @Post()
  @UseGuards(AuthGuard)
  async add(@Body() body) {
    const { categoryNames } = body;

    const count = await this.categoriesService.addCategories(categoryNames);
    return `Succesfully added ${count} new categories`;
  }
}
