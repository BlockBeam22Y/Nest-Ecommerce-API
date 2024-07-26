import {
  Controller,
  Get,
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
import { UpdateUserDto } from './dtos/updateUser.dto';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async get(@Query('page') page: number, @Query('limit') limit: number) {
    const users = await this.usersService.getUsers(page || 1, limit || 5);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return users.map(({ password, ...userData }) => userData);
  }

  @Get(':id')
  async getById(@Param('id', ParseUUIDPipe) id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userData } = await this.usersService.getUserById(id);

    return userData;
  }

  @Put(':id')
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
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const userId = await this.usersService.deleteUser(id);

    return {
      message: 'User deleted successfully',
      id: userId,
    };
  }
}
