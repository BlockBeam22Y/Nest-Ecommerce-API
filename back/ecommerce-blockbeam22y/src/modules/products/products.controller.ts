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
  ParseUUIDPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { CreateProductDto } from './dtos/createProduct.dto';
import { UpdateProductDto } from './dtos/updateProduct.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async get(@Query('page') page: number, @Query('limit') limit: number) {
    return this.productsService.getProducts(page || 1, limit || 5);
  }

  @Get(':id')
  async getById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProductById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() body: CreateProductDto) {
    const { name, description, price, stock, imgUrl, categoryId } = body;

    const productId = await this.productsService.createProduct({
      name,
      description,
      price,
      stock,
      imgUrl,
      categoryId,
    });

    return {
      message: 'Product created successfully',
      id: productId,
    };
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateProductDto,
  ) {
    const { name, description, price, stock, imgUrl } = body;

    const productId = await this.productsService.updateProduct(id, {
      name,
      description,
      price,
      stock,
      imgUrl,
    });

    return {
      message: 'Product updated successfully',
      id: productId,
    };
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const productId = await this.productsService.deleteProduct(id);

    return {
      message: 'Product deleted successfully',
      id: productId,
    };
  }
}
