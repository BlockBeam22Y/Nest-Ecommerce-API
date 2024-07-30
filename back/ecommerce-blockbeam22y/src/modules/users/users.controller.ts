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
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { SetPermissions } from 'src/decorators/permissions.decorator';
import PermissionFlagsBits from 'src/utils/PermissionFlagsBits';
import { RolesGuard } from '../auth/guards/roles.guard';
import PermissionsBitField from 'src/utils/PermissionsBitField';

@Controller('users')
@SetPermissions(PermissionFlagsBits.ManageUsers)
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async get(@Query('page') page: number, @Query('limit') limit: number) {
    const users = await this.usersService.getUsers(page || 1, limit || 5);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return users.map(({ password, isAdmin, ...userData }) => userData);
  }

  @Get(':id')
  async getById(@Param('id', ParseUUIDPipe) id: string, @Req() request) {
    const userRole: PermissionsBitField = request.user.role;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, isAdmin, ...userData } =
      await this.usersService.getUserById(
        id,
        userRole.has(PermissionsBitField.Flags.ViewOrders),
      );

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
