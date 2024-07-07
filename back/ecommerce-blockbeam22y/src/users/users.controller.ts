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
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getUsers(@Query('page') page: string, @Query('limit') limit: string) {
    return this.usersService.get(+page || 1, +limit || 5);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getUserById(@Param('id') id: string) {
    return this.usersService.getById(+id);
  }

  @Post()
  async createUser(@Body() body) {
    const { email, name, password, address, phone, city } = body;

    return this.usersService.create({
      email,
      name,
      password,
      address,
      phone,
      city,
    });
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updateUser(@Param('id') id: string, @Body() body) {
    const { email, name, password, address, phone, city } = body;

    return this.usersService.update(+id, {
      email,
      name,
      password,
      address,
      phone,
      city,
    });
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteUser(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }
}
