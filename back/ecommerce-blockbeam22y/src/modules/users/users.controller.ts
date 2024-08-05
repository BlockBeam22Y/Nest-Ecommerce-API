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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
@SetPermissions(PermissionFlagsBits.ManageUsers)
@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'The token provided is invalid or has expired',
})
@ApiForbiddenResponse({
  description: 'ManageUsers permission is required to access this resource',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiQuery({
    name: 'page',
    description: 'The page number, defaults to 1',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    description: 'The number of users per page, defaults to 5',
    required: false,
  })
  @ApiOkResponse({
    description: 'The users are retrieved successfully',
  })
  async get(@Query('page') page?: number, @Query('limit') limit?: number) {
    const users = await this.usersService.getUsers(page || 1, limit || 5);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return users.map(({ password, isAdmin, ...userData }) => userData);
  }

  @ApiParam({
    name: 'id',
    description: 'The ID of the user',
  })
  @Get(':id')
  @ApiOkResponse({
    description: 'The user is found and retrieved successfully',
  })
  @ApiBadRequestResponse({
    description: 'An invalid ID was given',
  })
  @ApiNotFoundResponse({
    description: 'The user with the given ID could not be found',
  })
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
  @ApiParam({
    name: 'id',
    description: 'The ID of the user to be updated',
  })
  @ApiOkResponse({
    description: 'The user is found and updated successfully',
  })
  @ApiBadRequestResponse({
    description: 'The data provided is invalid or an invalid ID was provided',
  })
  @ApiNotFoundResponse({
    description: 'The user with the given ID could not be found',
  })
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
  @ApiParam({
    name: 'id',
    description: 'The ID of the user to be deleted',
  })
  @ApiOkResponse({
    description: 'The user is found and deleted successfully',
  })
  @ApiBadRequestResponse({
    description: 'An invalid ID was given',
  })
  @ApiNotFoundResponse({
    description: 'The user with the given ID could not be found',
  })
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const userId = await this.usersService.deleteUser(id);

    return {
      message: 'User deleted successfully',
      id: userId,
    };
  }
}
