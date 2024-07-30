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
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { CreateProductDto } from './dtos/createProduct.dto';
import { UpdateProductDto } from './dtos/updateProduct.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { SetPermissions } from 'src/decorators/permissions.decorator';
import PermissionFlagsBits from 'src/utils/PermissionFlagsBits';
import { SetPublic } from 'src/decorators/public.decorator';

@Controller('products')
@UseGuards(AuthGuard, RolesGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @SetPublic()
  @SetPermissions(PermissionFlagsBits.ViewProducts)
  @UsePipes(new ValidationPipe({ transform: true }))
  async get(@Query('page') page: number, @Query('limit') limit: number) {
    return this.productsService.getProducts(page || 1, limit || 5);
  }

  @Get(':id')
  @SetPublic()
  @SetPermissions(PermissionFlagsBits.ViewProducts)
  async getById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProductById(id);
  }

  @Post()
  @SetPermissions(PermissionFlagsBits.ManageProducts)
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
  @SetPermissions(PermissionFlagsBits.ManageProducts)
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
  @SetPermissions(PermissionFlagsBits.ManageProducts)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const productId = await this.productsService.deleteProduct(id);

    return {
      message: 'Product deleted successfully',
      id: productId,
    };
  }
}
