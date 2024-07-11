import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/modules/auth/auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async get(@Query('page') page: string, @Query('limit') limit: string) {
    return this.productsService.getProducts(+page || 1, +limit || 5);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() body) {
    const { name, description, price, stock, imgUrl, categoryId } = body;

    return this.productsService.createProduct({
      name,
      description,
      price,
      stock,
      imgUrl,
      categoryId,
    });
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() body) {
    const { name, description, price, stock, imgUrl } = body;

    return this.productsService.updateProduct(id, {
      name,
      description,
      price,
      stock,
      imgUrl,
    });
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
