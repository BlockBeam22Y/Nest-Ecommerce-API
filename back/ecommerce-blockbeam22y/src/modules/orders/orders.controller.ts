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

@Controller('orders')
@UseGuards(AuthGuard, RolesGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get(':id')
  @SetPermissions(PermissionFlagsBits.ViewOrders)
  async get(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.getOrder(id);
  }

  @Post()
  @SetPermissions(PermissionFlagsBits.CreateOrders)
  async create(@Body() body: CreateOrderDto) {
    const { userId, products } = body;

    return this.ordersService.addOrder(userId, products);
  }
}
