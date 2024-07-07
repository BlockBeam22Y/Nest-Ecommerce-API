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
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    return this.productsService.get(+page || 1, +limit || 5);
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return this.productsService.getById(+id);
  }

  @Post()
  @UseGuards(AuthGuard)
  async createProduct(@Body() body) {
    const { name, description, price, stock, imgUrl } = body;

    return this.productsService.create({
      name,
      description,
      price,
      stock,
      imgUrl,
    });
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updateProduct(@Param('id') id: string, @Body() body) {
    const { name, description, price, stock, imgUrl } = body;

    return this.productsService.update(+id, {
      name,
      description,
      price,
      stock,
      imgUrl,
    });
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteProduct(@Param('id') id: string) {
    return this.productsService.delete(+id);
  }
}
