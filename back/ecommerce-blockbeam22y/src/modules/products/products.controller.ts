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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
@UseGuards(AuthGuard, RolesGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @SetPublic()
  @SetPermissions(PermissionFlagsBits.ViewProducts)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiQuery({
    name: 'page',
    description: 'The page number, defaults to 1',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    description: 'The number of products per page, defaults to 5',
    required: false,
  })
  @ApiOkResponse({
    description: 'The products are retrieved successfully',
  })
  @ApiForbiddenResponse({
    description: 'ViewProducts permission is required to access this resource',
  })
  async get(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.productsService.getProducts(page || 1, limit || 5);
  }

  @Get(':id')
  @SetPublic()
  @SetPermissions(PermissionFlagsBits.ViewProducts)
  @ApiParam({
    name: 'id',
    description: 'The ID of the product',
  })
  @ApiOkResponse({
    description: 'The product is found and retrieved successfully',
  })
  @ApiBadRequestResponse({
    description: 'An invalid ID was given',
  })
  @ApiForbiddenResponse({
    description: 'ViewProducts permission is required to access this resource',
  })
  @ApiNotFoundResponse({
    description: 'The product with the given ID could not be found',
  })
  async getById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProductById(id);
  }

  @Post()
  @SetPermissions(PermissionFlagsBits.ManageProducts)
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'The product is created successfully',
  })
  @ApiBadRequestResponse({
    description: 'The data provided is invalid',
  })
  @ApiUnauthorizedResponse({
    description: 'The token provided is invalid or has expired',
  })
  @ApiForbiddenResponse({
    description:
      'ManageProducts permission is required to access this resource',
  })
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
  @ApiParam({
    name: 'id',
    description: 'The ID of the product to be updated',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'The product is found and updated successfully',
  })
  @ApiBadRequestResponse({
    description: 'The data provided is invalid or an invalid ID was provided',
  })
  @ApiUnauthorizedResponse({
    description: 'The token provided is invalid or has expired',
  })
  @ApiForbiddenResponse({
    description:
      'ManageProducts permission is required to access this resource',
  })
  @ApiNotFoundResponse({
    description: 'The product with the given ID could not be found',
  })
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
  @ApiParam({
    name: 'id',
    description: 'The ID of the product to be deleted',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'The product is found and deleted successfully',
  })
  @ApiBadRequestResponse({
    description: 'An invalid ID was given',
  })
  @ApiUnauthorizedResponse({
    description: 'The token provided is invalid or has expired',
  })
  @ApiForbiddenResponse({
    description:
      'ManageProducts permission is required to access this resource',
  })
  @ApiNotFoundResponse({
    description: 'The product with the given ID could not be found',
  })
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const productId = await this.productsService.deleteProduct(id);

    return {
      message: 'Product deleted successfully',
      id: productId,
    };
  }
}
