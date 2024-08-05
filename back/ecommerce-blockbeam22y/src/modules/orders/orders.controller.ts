import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateOrderDto } from './dtos/createOrder.dto';
import { SetPermissions } from 'src/decorators/permissions.decorator';
import PermissionFlagsBits from 'src/utils/PermissionFlagsBits';
import { RolesGuard } from '../auth/guards/roles.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'The token provided is invalid or has expired',
})
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get(':id')
  @SetPermissions(PermissionFlagsBits.ViewOrders)
  @ApiParam({
    name: 'id',
    description: 'The ID of the order',
  })
  @ApiOkResponse({
    description: 'The order is found and retrieved successfully',
  })
  @ApiBadRequestResponse({
    description: 'An invalid ID was given',
  })
  @ApiForbiddenResponse({
    description: 'ViewOrders permission is required to access this resource',
  })
  @ApiNotFoundResponse({
    description: 'The order with the given ID could not be found',
  })
  async get(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.getOrder(id);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The order is created successfully',
  })
  @ApiBadRequestResponse({
    description:
      'The data provided is invalid or some of the products are out of stock',
  })
  @ApiForbiddenResponse({
    description: 'CreateOrders permission is required to access this resource',
  })
  @SetPermissions(PermissionFlagsBits.CreateOrders)
  async create(@Body() body: CreateOrderDto) {
    const { userId, products } = body;

    return this.ordersService.addOrder(userId, products);
  }
}
