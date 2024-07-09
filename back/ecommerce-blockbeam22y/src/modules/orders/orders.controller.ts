import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('orders')
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get(':id')
  async get(@Param() id: string) {
    return this.ordersService.getOrder(id);
  }

  @Post()
  async create(@Body() body) {
    const { userId, products } = body;

    return this.ordersService.addOrder(
      userId,
      products.map((product) => product.id),
    );
  }
}
