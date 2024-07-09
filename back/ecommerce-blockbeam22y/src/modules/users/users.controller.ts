import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/modules/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  async get(@Query('page') page: string, @Query('limit') limit: string) {
    return this.usersService.getUsers(+page || 1, +limit || 5);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Post()
  async create(@Body() body) {
    const { name, email, password, phone, country, address, city } = body;

    return this.usersService.createUser({
      name,
      email,
      password,
      phone,
      country,
      address,
      city,
    });
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() body) {
    const { name, email, password, phone, country, address, city } = body;

    return this.usersService.updateUser(id, {
      name,
      email,
      password,
      phone,
      country,
      address,
      city,
    });
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
