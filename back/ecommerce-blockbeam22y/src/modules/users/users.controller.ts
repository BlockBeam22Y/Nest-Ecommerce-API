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
  ParseUUIDPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async get(@Query('page') page: number, @Query('limit') limit: number) {
    const users = await this.usersService.getUsers(page || 1, limit || 5);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return users.map(({ password, ...userData }) => userData);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getById(@Param('id', ParseUUIDPipe) id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userData } = await this.usersService.getUserById(id);

    return userData;
  }

  @Post()
  async create(@Body() body: CreateUserDto) {
    const { name, email, password, phone, country, address, city } = body;

    const userId = await this.usersService.createUser({
      name,
      email,
      password,
      phone,
      country,
      address,
      city,
    });

    return {
      message: 'User created successfully',
      id: userId,
    };
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateUserDto,
  ) {
    const { name, email, password, phone, country, address, city } = body;

    const userId = await this.usersService.updateUser(id, {
      name,
      email,
      password,
      phone,
      country,
      address,
      city,
    });

    return {
      message: 'User updated successfully',
      id: userId,
    };
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const userId = await this.usersService.deleteUser(id);

    return {
      message: 'User deleted successfully',
      id: userId,
    };
  }
}
